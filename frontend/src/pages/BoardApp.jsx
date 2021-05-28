import React, { Component } from 'react'

import { utilService } from '../services/utilService'

import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { SidebarApp } from '../cmps/SidebarApp.jsx'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardCtrlPanel } from '../cmps/BoardCtrlPanel'
import { loadBoard, updateBoard } from '../store/actions/boardActions'
import { GroupList } from '../cmps/groups/GroupList'

class _BoardApp extends Component {

    componentDidMount() {
        const boardId = 'b101'  //later from params
        this.props.loadBoard(boardId)
    }

    addNewGroup = () => {
        console.log ('hello')
        const newBoard = {...this.props.currBoard} 
        const newGroup = {
            id: utilService.makeId(),
            style: { bgColor: '#26de81' },
            title: 'New Group',
            tasks: [
                {
                    id: utilService.makeId(),
                    labelIds: ['101'],
                    createdAt: 1590999730348,
                    dueDate: 16156215211,
                    title: 'New Task',
                    tags: ['initialize'],
                    status: '',
                    priority: '',
                    members: [],
                    comments: [],
                    byMember: {
                        _id: 'u101',
                        username: 'Tal',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                },
            ],
        }
        newBoard.groups.unshift(newGroup)
        console.log("🚀 ~ file: BoardApp.jsx ~ line 49 ~ _BoardApp ~ currBoard", newBoard)
        this.props.updateBoard(newBoard)
    }

    render() {
        const { currBoard } = this.props
        return (
            <div className="board-app-container flex">
                {/* GroupList -> map all groups -> GroupPreview -> map all tasks -> TaskPreview*/}
                <SidebarApp />
                <SidebarNav />
                <div className="container board-container">
                    <BoardHeader />
                    <BoardCtrlPanel addNewGroup={this.addNewGroup} />
                    <GroupList board={currBoard} groups={currBoard.groups} key={currBoard._id} />
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
    updateBoard,

}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)