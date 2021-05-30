import React, { Component } from 'react'

import { utilService } from '../services/utilService'
import { DragDropContext } from 'react-beautiful-dnd';

import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { SidebarApp } from '../cmps/SidebarApp.jsx'
import { BoardHeader } from '../cmps/BoardHeader'

import { BoardCtrlPanel } from '../cmps/BoardCtrlPanel'
import { loadBoard, updateBoard } from '../store/actions/boardActions'
import { GroupList } from '../cmps/groups/GroupList'
import { MenuListComposition } from '../cmps/MenuCmp'

class _BoardApp extends Component {

    state = {
        currBoard: this.props.currBoard
    }
    componentDidMount() {
        const boardId = 'b101'  //later from params
        this.props.loadBoard(boardId)
    }

    addNewGroup = () => {
        const newBoard = { ...this.props.currBoard }
        const newGroup = {
            id: utilService.makeId(),
            style: { bgColor: '#26de81' },
            title: 'New Group',
            tasks: [
                // {
                //     id: utilService.makeId(),
                //     labelIds: ['101'],
                //     createdAt: 1590999730348,
                //     dueDate: 16156215211,
                //     title: 'New Task',
                //     tags: ['initialize'],
                //     status: '',
                //     priority: '',
                //     members: [],
                //     comments: [],
                //     byMember: {
                //         _id: 'u101',
                //         username: 'Tal',
                //         fullname: 'Tal Tarablus',
                //         imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                //     },
                // },
            ],
        }
        newBoard.groups.unshift(newGroup)
        this.props.updateBoard(newBoard)
    }
    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return
        const sourceGroup = this.props.currBoard.groups.find(group => group.id === source.droppableId);
        const destinationGroup = this.props.currBoard.groups.find(group => group.id === destination.droppableId);
        const task = sourceGroup.tasks.find(task => task.id === draggableId)
        sourceGroup.tasks.splice(source.index, 1);
        destinationGroup.tasks.splice(destination.index, 0, task);
        const copyGroup = { ...this.props.currBoard }
        this.props.updateBoard(copyGroup)
    }

    render() {
        const { currBoard } = this.props
        return (
            <div className="board-app-container flex">
                <SidebarApp />
                <SidebarNav />
                <div className="container board-container">
                    <BoardHeader board={this.props.currBoard} updateBoard={this.props.updateBoard} />
                    <BoardCtrlPanel addNewGroup={this.addNewGroup} />

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <GroupList board={currBoard} groups={currBoard.groups} key={currBoard._id} updateBoard={this.props.updateBoard} />
                    </DragDropContext>

                </div >
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        currBoard: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy
    }
}
const mapDispatchToProps = {
    loadBoard,
    updateBoard

}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)