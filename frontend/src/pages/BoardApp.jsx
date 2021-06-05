import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { utilService } from '../services/utilService'
import { socketService } from '../services/socketService'
import { userService } from '../services/userService'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { SidebarApp } from '../cmps/SidebarApp.jsx'
import { BoardHeader } from '../cmps/BoardHeader'

import { BoardCtrlPanel } from '../cmps/BoardCtrlPanel'
import { loadBoard, updateBoard, addBoard } from '../store/actions/boardActions'
import { GroupList } from '../cmps/groups/GroupList'
import { ActivityModal } from '../cmps/ActivitySideBar/ActivityModal';
// import { MenuListComposition } from '../cmps/MenuCmp'
// import { ChipCmp } from '../cmps/ChipCmp';

class _BoardApp extends Component {
    state = {
        currUser: null,
        filteredBoard: this.props.currBoard
    }

    componentDidMount() {
        const boardId = '60b7e87419a5e8e764d835fe'
        // const boardId = 'b101'
        this.props.loadBoard(boardId)
        userService.getUsers()
        const user = userService.getLoggedinUser()
        socketService.setup()
        socketService.on('board loaded', () => {
            this.props.loadBoard(boardId)
        })
        socketService.emit('join board', boardId)
        this.setState({ ...this.state, currUser: user })
    }
    componentWillUnmount() {
        // socketService.off('chat addMsg', this.addMsg)
        // socketService.off('chat onUserTyping')
        socketService.terminate()
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(`file: BoardApp.jsx || line 44 || prevProps`, prevProps)
        // const id = this.props.match.params.boardId
        const prevId = prevProps.match.params.boardId
        const currId = this.props.match.params.boardId
        if (!prevId) return
        console.log(`file: BoardApp.jsx || line 47 || currId`, currId)
        console.log(`file: BoardApp.jsx || line 47 || prevId`, prevId)
        // console.log(`file: BoardApp.jsx || line 45 || id`, id)
        if (prevId !== currId) {
            console.log('different ids')
            this.props.loadBoard(currId)
        }
        // if (prevProps.match.params.boardId !== this.props.match.params.boardId) {
        //     this.props.loadBoard(boardId)
        // }
        // if (prevProps.id !== id) {
        // console.log(`file: BoardApp.jsx || line 51 || prevProps.id`, prevProps.id)
        // console.log('currID =', id)
        // console.log('id different will load board =')
        // this.props.loadBoard(id)
    }

    onAddNewBoard = () => {
        console.log('Adding new board =')
        this.props.addBoard()
    }

    addNewGroup = async () => {
        const newBoard = { ...this.props.currBoard }
        const newGroup = {
            id: utilService.makeId(),
            style: { bgColor: '#26de81' },
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
    }

    onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return
        if (type === 'task') {
            const sourceGroup = this.state.filteredBoard.groups.find(group => group.id === source.droppableId);
            const destinationGroup = this.state.filteredBoard.groups.find(group => group.id === destination.droppableId);
            const task = sourceGroup.tasks.find(task => task.id === draggableId)
            sourceGroup.tasks.splice(source.index, 1);
            destinationGroup.tasks.splice(destination.index, 0, task);
        }
        if (type === 'group') {
            const currBoard  = this.state.filteredBoard;
            const sourceGroup = this.state.filteredBoard.groups.find(group => group.id === draggableId);
            currBoard.groups.splice(source.index, 1);
            currBoard.groups.splice(destination.index, 0, sourceGroup)
        }
        const copyGroup = { ...this.state.filteredBoard };
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
        this.setState({ ...this.state, filteredBoard: filteredBoard })
        return filteredBoard

    }

    render() {
        const { currBoard } = this.props
        const { currUser, filteredBoard } = this.state
        if (!currBoard) return <div>loading</div>
        return (
            <div className="board-app-container flex">
                <SidebarApp />
                <SidebarNav onAddNewBoard={this.onAddNewBoard} />
                <div className="container board-container">
                    <BoardHeader board={this.props.currBoard} updateBoard={this.props.updateBoard} />
                    <BoardCtrlPanel board={this.props.currBoard} addNewGroup={this.addNewGroup} setFilter={this.setFilter} loadBoard={this.props.loadBoard} />
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="all-groups" type="group">
                            {provided => (

                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} >
                                       
                                    <GroupList
                                        board={filteredBoard} groups={filteredBoard.groups} key={currBoard._id}
                                        updateBoard={this.props.updateBoard} currUser={currUser} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <Route path={`${this.props.match.path}/:groupId/:taskId`} render={(props) => {
                        return <ActivityModal {...props} />
                    }} />
                    <Route path={`${this.props.match.path}/activity_log`} render={(props) => {
                        return <ActivityModal {...props} />
                    }} />
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
    updateBoard,
    addBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)