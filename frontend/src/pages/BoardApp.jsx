import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { utilService } from '../services/utilService'
import { socketService } from '../services/socketService'
import { userService } from '../services/userService'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { SidebarApp } from '../cmps/SidebarApp.jsx'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardCtrlPanel } from '../cmps/BoardCtrlPanel'
import { loadBoard, updateBoard, addBoard, removeBoard, loadBoards, onSetFilter } from '../store/actions/boardActions'
import { loadUsers } from '../store/actions/userActions'
import { GroupList } from '../cmps/groups/GroupList'
import { ActivityModal } from '../cmps/ActivitySideBar/ActivityModal';
import { GoogleMap } from '../cmps/Map.jsx'
import { Welcome } from '../cmps/Welcome';


class _BoardApp extends Component {
    state = {
        currUser: null,
        filteredGroups: null,
        isMap: false,
        mapPos: null
    }

    async componentDidMount() {
        socketService.setup()
        this.props.loadUsers()
        const boardId = this.props.match.params.boardId
        console.log(`file: BoardApp.jsx || line 38 || boardId`, boardId)
        const user = userService.getLoggedinUser()
        if (!boardId) await this.props.loadBoards()
        else {
            const board = await this.props.loadBoard(boardId)
            socketService.emit('join new board', board._id)
            socketService.on('board was updated', async (updatedBoardId) => {
                await this.props.loadBoard(updatedBoardId)
            })
            this.setState({ ...this.state, currUser: user, isMap: false })
        }
    }
    componentWillUnmount() {
        socketService.terminate()
        socketService.off('join new board')
    }
    async componentDidUpdate(prevProps) {
        const prevId = prevProps.match.params.boardId
        const currId = this.props.match.params.boardId
        if (prevId !== currId) {
            this.setState({ ...this.state, filteredGroups: null }, async () => {
                this.props.onSetFilter({
                    txt: '',
                    membersId: [],
                    priority: [],
                    status: [],
                    tag: []
                })
                const board = await this.props.loadBoard(currId)
                socketService.emit('join new board', board._id)
            })
        }
    }

    onAddNewBoard = () => {
        this.props.addBoard()
    }

    onRemoveBoard = async (boardId) => {
        await this.props.removeBoard(boardId)
        window.location.hash = `/board/`
    }

    addNewGroup = async () => {
        const newBoard = { ...this.props.currBoard }
        const newGroup = {
            id: utilService.makeId(),
            style: { bgColor: this.getColor() },
            title: 'New Group',
            tasks: [],
            byMember: userService.getLoggedinUser(),
            createdAt: Date.now()
        }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Group added',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: null,
            group: {
                id: newGroup.id,
                title: newGroup.title
            }
        }
        newBoard.groups.unshift(newGroup)
        newBoard.activities.unshift(newActivity)
        await this.props.updateBoard(newBoard)
        socketService.emit('board updated', newBoard._id)

    }

    getColor() {
        const boardColors = this.props.currBoard.colors
        var randomColor = boardColors[Math.floor(Math.random() * boardColors.length)]
        return randomColor.value
    }

    onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        const { currBoard } = this.props;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;
        if (type === 'task') {
            const sourceGroup = currBoard.groups.find(group => group.id === source.droppableId);
            const destinationGroup = currBoard.groups.find(group => group.id === destination.droppableId);
            const task = sourceGroup.tasks.find(task => task.id === draggableId);
            sourceGroup.tasks.splice(source.index, 1);
            destinationGroup.tasks.splice(destination.index, 0, task);
        }
        if (type === 'group') {
            const sourceGroup = currBoard.groups.find(group => group.id === draggableId);
            currBoard.groups.splice(source.index, 1);
            currBoard.groups.splice(destination.index, 0, sourceGroup);
        }
        if (type === 'column') {
            const idx = draggableId.indexOf('-')
            const cellType = draggableId.slice(0, idx)
            currBoard.cellTypes.splice(source.index, 1);
            currBoard.cellTypes.splice(destination.index, 0, cellType)
        }
        const newBoard = { ...currBoard };
        await this.props.updateBoard(newBoard);
        socketService.emit('board updated', newBoard._id);
    }

    filterBoard = async (filterBy) => {
        console.log('filtering', filterBy);
        this.props.onSetFilter(filterBy)
        const filteredBoard = JSON.parse(JSON.stringify(this.props.currBoard))
        if (filterBy) {
            if (!filterBy.status?.length && !filterBy.priority?.length &&
                !filterBy.tag?.length && !filterBy.membersId?.length &&
                !filterBy.txt?.length) {
                console.log('no filter');
                // return this.setState({ ...this.state, filteredGroups: this.props.currBoard.groups }, () => console.log('filtered groups', this.state.filteredGroups))
                return this.setState({ ...this.state, filteredGroups: null }, () => console.log('filtered groups', this.state.filteredGroups))
            }

            if (filterBy.status?.length) {
                filteredBoard.groups = filteredBoard.groups.filter(group => {
                    const filteredTasks = group.tasks.filter(task => {
                        const status = filterBy.status.find(label => {
                            return task.status.title === label
                        });
                        if (!status) return false
                        return true
                    })
                    if (filteredTasks.length) {
                        group.tasks = filteredTasks
                        return true
                    }
                    return false
                })
            }
            if (filterBy.priority?.length) {
                filteredBoard.groups = filteredBoard.groups.filter(group => {
                    const filteredTasks = group.tasks.filter(task => {
                        const priority = filterBy.priority.find(label => {
                            return task.priority.title === label
                        });
                        if (!priority) return false
                        return true
                    })
                    if (filteredTasks.length) {
                        group.tasks = filteredTasks
                        return true
                    }
                    return false
                })
            }
            if (filterBy.tag?.length) {
                // console.log('filter by tag');
                filteredBoard.groups = filteredBoard.groups.filter(group => {
                    const filteredTasks = group.tasks.filter(task => {
                        const tag = filterBy.tag.find(tagfromFilter => {
                            return task.tags.find(tag => tag.title === tagfromFilter)
                        });
                        if (!tag) return false
                        return true
                    })
                    if (filteredTasks.length) {
                        group.tasks = filteredTasks
                        return true
                    }
                    return false
                })
            }
            if (filterBy.membersId?.length) {
                // console.log('filter by member');
                filteredBoard.groups = filteredBoard.groups.filter(group => {
                    const filteredTasks = group.tasks.filter(task => {
                        const member = task.members.find(member => {
                            return (filterBy.membersId.includes(member._id))
                        })
                        if (!member) return false
                        return true
                    })
                    if (filteredTasks.length) {
                        group.tasks = filteredTasks
                        return true
                    }
                    return false
                })
            }
            if (filterBy.txt?.length) {
                // console.log('filter by txt');
                const filterRegex = new RegExp(filterBy.txt, 'i');
                filteredBoard.groups = filteredBoard.groups.filter(group => {
                    const filteredTasks = group.tasks.filter(task => filterRegex.test(task.title))
                    if (filteredTasks.length) {
                        group.tasks = filteredTasks
                        return true
                    } else return false || filterRegex.test(group.title)
                })
            }
            await this.setState({ ...this.state, filteredGroups: filteredBoard.groups }, () => console.log('filtered groups', this.state.filteredGroups.length))
        }

    }

    onAddNewBoard = () => {
        this.props.addBoard()

    }
    onChangeView = (ev, isMap) => {
        console.log('ev.target', ev.target);
        this.setState({ ...this.state, isMap: isMap })
    }

    setMap = async (pos) => {
        console.log(pos);
        await this.setState({ ...this.state, mapPos: pos })
        this.setState({ isMap: true })
    }


    render() {
        const { boardId } = this.props.match.params
        const { currBoard, users } = this.props
        const { currUser, filteredGroups, mapPos, isMap } = this.state
        if (!currBoard) return <div>loading</div>
        return (
            <div className="board-app-container flex" ref="board-app-container">
                <SidebarApp />
                {boardId && <SidebarNav onAddNewBoard={this.onAddNewBoard} isExpanded={false} onRemoveBoard={this.onRemoveBoard} />}
                {!boardId && <SidebarNav onAddNewBoard={this.onAddNewBoard} isExpanded={true} onRemoveBoard={this.onRemoveBoard} />}

                {!boardId && <Welcome />}
                {boardId && <div className="container board-container">
                    <BoardHeader users={users} board={currBoard} updateBoard={this.props.updateBoard} />
                    <BoardCtrlPanel board={currBoard} onChangeView={this.onChangeView} addNewGroup={this.addNewGroup}
                        filterBy={this.props.filterBy} filterBoard={this.filterBoard} loadBoard={this.props.loadBoard} isMap={isMap} />
                    {this.state.isMap && <GoogleMap className="container" pos={mapPos} />}
                    {!this.state.isMap &&
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="all-groups" type="group">
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps} >
                                        {<GroupList
                                            board={currBoard}
                                            groups={filteredGroups || currBoard.groups}
                                            key={currBoard._id}
                                            updateBoard={this.props.updateBoard} currUser={currUser} setMap={this.setMap} />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    }
                </div>}
                <Switch>
                    <Route path={`${this.props.match.path}/:groupId/:taskId`} render={(props) => {
                        return <ActivityModal {...props} />
                    }} />
                    <Route path={`${this.props.match.path}/activity_log`} render={(props) => {
                        return <ActivityModal {...props} />
                    }} />
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        currBoard: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy,
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoard,
    loadBoards,
    updateBoard,
    addBoard,
    removeBoard,
    loadUsers,
    onSetFilter
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)

