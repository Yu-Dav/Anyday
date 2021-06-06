import React, { Component } from 'react'
import ReactDOM from 'react-dom';
// import { Route } from 'react-router-dom'
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
import { loadBoard, updateBoard, addBoard, loadBoards } from '../store/actions/boardActions'
import {loadUsers} from '../store/actions/userActions'
import { GroupList } from '../cmps/groups/GroupList'
import { ActivityModal } from '../cmps/ActivitySideBar/ActivityModal';
import { GoogleMap } from '../cmps/Map.jsx'
// import { LocationSearchInput } from '../cmps/tasks/CellLocation'
// import { MenuListComposition } from '../cmps/MenuCmp'
// import { ChipCmp } from '../cmps/ChipCmp';

class _BoardApp extends Component {
    state = {
        currUser: null,
        filteredBoard: this.props.currBoard,
        isMap: false,
    }

    async componentDidMount() {
        socketService.setup()
        console.log('hello')
        const boardId = this.props.match.params.boardId
        this.props.loadUsers()
        // userService.getUsers()
        console.log('board id did mount', boardId);
        userService.getUsers()
        const user = userService.getLoggedinUser()
        if(!boardId) await this.props.loadBoards()
        else {
            console.log(`file: BoardApp.jsx || line 33 || boardId`, boardId)
            socketService.emit('join board', boardId)
            await this.props.loadBoard(boardId)
            socketService.on('board loaded', () => {
                this.props.loadBoard(boardId)
                console.log('boardId =', boardId)
            })
        }
        this.setState({ ...this.state, currUser: user, filteredBoard: this.props.board })
    }
    componentWillUnmount() {

        socketService.terminate()
        socketService.off('board loaded')
    }
    async componentDidUpdate(prevProps) {
        const prevId = prevProps.match.params.boardId
        console.log(`file: BoardApp.jsx || line 46 || prevId`, prevId)
        const currId = this.props.match.params.boardId
        console.log(`BoardApp.jsx || line 47 || currId`, currId)
        // if (!prevId) return
        if (prevId !== currId) {
            console.log('different id loading new board =')
            const board = await this.props.loadBoard(currId)
            // socketService.emit('join board', currId)

            // console.log('board in cdu in boardApp', board._id, board.title)
            // this.setState({ ...this.state, filteredBoard: board })
        }
    }

    onAddNewBoard = () => {
        console.log('Adding new board =')
        this.props.addBoard()
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
            // add all the rest needed in a group 
        }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Group added',
            createdAt: Date.now(),
            byMember: this.props.loggedInUser,
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
        this.setState({ ...this.state, filteredBoard: newBoard })
    }

    getColor() {
        const boardColors = this.props.currBoard.colors
        var randomColor = boardColors[Math.floor(Math.random() * boardColors.length)]
        return randomColor.value
    }

    onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return
        if (type === 'task') {
            const sourceGroup = this.props.currBoard.groups.find(group => group.id === source.droppableId);
            const destinationGroup = this.props.currBoard.groups.find(group => group.id === destination.droppableId);
            const task = sourceGroup.tasks.find(task => task.id === draggableId)
            sourceGroup.tasks.splice(source.index, 1);
            destinationGroup.tasks.splice(destination.index, 0, task);
        }
        if (type === 'group') {
            const currBoard = this.props.currBoard;
            // const currBoard = this.props.currBoard;
            const sourceGroup = this.props.currBoard.groups.find(group => group.id === draggableId);
            currBoard.groups.splice(source.index, 1);
            currBoard.groups.splice(destination.index, 0, sourceGroup)
        }
        // const copyGroup = {};
        const copyGroup = { ...this.props.currBoard };
        console.log(`file: BoardApp.jsx || line 125 || copyGroup`, copyGroup)
        await this.props.updateBoard(copyGroup);
        socketService.emit('board updated', copyGroup._id);
    }

    setFilter = (filterBy) => {
        console.log(filterBy);
        const filteredBoard = { ...this.props.currBoard }
        if (filterBy) {
            if (filterBy.status && filterBy.status.length) {
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
            if (filterBy.priority && filterBy.priority.length) {
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
            if (filterBy.tag && filterBy.tag.length) {
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
            if (filterBy.membersId && filterBy.membersId.length) {
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
            // if (filterBy.sortBy && !onDrag) {
            //     if (filterBy.sortBy === 'name') filteredBoard.groups = boardService.sortByTitle(filteredBoard.groups)
            //     else filteredBoard.groups = boardService.sortByDate(filteredBoard.groups)
            // }
            const filterRegex = new RegExp(filterBy.txt, 'i');
            filteredBoard.groups = filteredBoard.groups.filter(group => {
                const filteredTasks = group.tasks.filter(task => filterRegex.test(task.title))
                if (filteredTasks.length) {
                    group.tasks = filteredTasks
                    return true
                } else return false || filterRegex.test(group.title)
            })
        }
        /// state: isFiltered true 
        // this.setState({ ...this.state, filteredBoard: filteredBoard })
        return filteredBoard

    }

    onAddNewBoard = () => {
        this.props.addBoard()

    }
    onScroll = (ev) => {
        console.log('ev =', ev)
    }
    onChangeView = (ev) => {
        console.log('ev.target', ev.target);
        this.setState({ ...this.state, isMap: !this.state.isMap })
    }

    render() {
        const {boardId} = this.props.match.params
        const { currBoard, users } = this.props
        const { currUser, filteredBoard } = this.state
        // console.log('params', this.props.match.params)
        if (!currBoard) return <div>loading</div>
        return (
            <div className="board-app-container flex" onScroll={this.onScroll} ref="board-app-container">
                <SidebarApp />
                <SidebarNav onAddNewBoard={this.onAddNewBoard} />

                <div className="container board-container">
                    <BoardHeader users={users} board={currBoard} updateBoard={this.props.updateBoard} />
                    <BoardCtrlPanel board={currBoard} onChangeView={this.onChangeView} addNewGroup={this.addNewGroup}
                     setFilter={this.setFilter} loadBoard={this.props.loadBoard} />
                    {/* <button className="btn" onClick={() => window.location.hash = `/board/${currBoard._id}/map`}>Map</button> */}
                    {/* <LocationSearchInput /> */}
                    {/* <button className="btn-location" onClick={() => this.setState({ ...this.state, isMap: !this.state.isMap })}>Map</button> */}
                    {this.state.isMap && <GoogleMap className="container" />}
                    {!this.state.isMap &&
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="all-groups" type="group">
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps} >

                                        <GroupList
                                            board={currBoard} groups={currBoard.groups} key={currBoard._id}
                                            updateBoard={this.props.updateBoard} currUser={currUser} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    }

                    <Switch>
                        {/* <Route path={`${this.props.match.path}/map`} component={GoogleMap} /> */}
                        {/* <Route path={`${this.props.match.path}/map`} render={(props) => {
                            return <GoogleMap {...props} />
                        }} /> */}
                        <Route path={`${this.props.match.path}/:groupId/:taskId`} render={(props) => {
                            return <ActivityModal {...props} />
                        }} />
                        <Route path={`${this.props.match.path}/activity_log`} render={(props) => {
                            return <ActivityModal {...props} />
                        }} />
                    </Switch>
                </div>

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
    loadUsers
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)



// Old DnD 
// onDragEnd = async (result) => {
//     const { destination, source, draggableId, type } = result;
//     if (!destination) return;
//     if (
//         destination.droppableId === source.droppableId &&
//         destination.index === source.index
//     ) return
//     if (type === 'task') {
//         const sourceGroup = this.props.currBoard.groups.find(group => group.id === source.droppableId);
//         const destinationGroup = this.props.currBoard.groups.find(group => group.id === destination.droppableId);
//         const task = sourceGroup.tasks.find(task => task.id === draggableId)
//         sourceGroup.tasks.splice(source.index, 1);
//         destinationGroup.tasks.splice(destination.index, 0, task);
//     }
//     if (type === 'group') {
//         const { currBoard } = this.props;
//         const sourceGroup = this.props.currBoard.groups.find(group => group.id === draggableId);
//         currBoard.groups.splice(source.index, 1);
//         currBoard.groups.splice(destination.index, 0, sourceGroup)
//     }
//     const copyGroup = { ...this.props.currBoard };
//     await this.props.updateBoard(copyGroup);
//     socketService.emit('board updated', copyGroup._id);
// }