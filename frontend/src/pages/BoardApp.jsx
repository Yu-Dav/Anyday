import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { SidebarApp } from '../cmps/SidebarApp.jsx'
import { BoardHeader } from '../cmps/BoardHeader'

import { loadBoard } from '../store/actions/boardActions'
import { GroupList } from '../cmps/groups/GroupList'
class _BoardApp extends Component {

    componentDidMount() {
        const boardId = 'b101'  //later from params
        this.props.loadBoard(boardId)
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
                    <GroupList groups={currBoard.groups} key={currBoard._id} />
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

}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)