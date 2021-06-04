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
        currUser: null
    }

    componentDidMount() {
        const boardId = this.props.match.params.boardId
        // const boardId = '60b7e87419a5e8e764d835fe'
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
        // console.log(`file: BoardApp.jsx || line 44 || prevProps`, prevProps)
        // const id = this.props.match.params.boardId
        const prevId = prevProps.match.params.boardId
        const currId = this.props.match.params.boardId
        if (!prevId) return
        // console.log(`file: BoardApp.jsx || line 47 || currId`, currId)
        // console.log(`file: BoardApp.jsx || line 47 || prevId`, prevId)
        // console.log(`file: BoardApp.jsx || line 45 || id`, id)
        if (prevId !== currId) {
            // console.log('different ids')
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
            const { currBoard } = this.props;
            const sourceGroup = this.props.currBoard.groups.find(group => group.id === draggableId);
            currBoard.groups.splice(source.index, 1);
            currBoard.groups.splice(destination.index, 0, sourceGroup)
        }
        const copyGroup = { ...this.props.currBoard };
        await this.props.updateBoard(copyGroup);
        socketService.emit('board updated', copyGroup._id);
    }
    onSetFilter = (filterBy) => {
        const { currBoard } = this.props;
        console.log('filterBy', filterBy)
            let filteredBoard = { ...currBoard }
            if (filterBy.status){
                filterdBoard= filteredBoard.filter((group)=>{
                    return group.tasks.filter((task)=>{
                        return task.status.title === filterBy.status
                    })
                })
            }
            return filteredBoard
    
        // this.props.loadBoard(filterBy)
    }
    onAddNewBoard = () => {
        console.log('Adding new board =')
        this.props.addBoard()

    }
    render() {
        const { currBoard, filterBy } = this.props
        const { currUser } = this.state
        if (!currBoard) return <div>loading</div>
        return (
            <div className="board-app-container flex">
                <SidebarApp />
                <SidebarNav onAddNewBoard={this.onAddNewBoard} />
                <div className="container board-container">
                    <BoardHeader board={this.props.currBoard} updateBoard={this.props.updateBoard} />
                    <BoardCtrlPanel board={this.props.currBoard} addNewGroup={this.addNewGroup} onSetFilter={this.onSetFilter} loadBoard={this.props.loadBoard} />

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="all-groups" type="group">
                            {provided => (

                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} >
                                    <GroupList
                                        board={currBoard} groups={currBoard.groups} key={currBoard._id}
                                        filterBy={filterBy}
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
    addBoard,
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)