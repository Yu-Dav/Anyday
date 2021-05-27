import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { SidebarApp } from '../cmps/SidebarApp.jsx'
import { BoardHeader } from '../cmps/BoardHeader'

import { loadBoard } from '../store/actions/boardActions'

class _BoardApp extends Component {
    
    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }

    render() {
        return (
            <div className="board-app-container flex">
                {/* GroupList -> map all groups -> GroupPreview -> map all tasks -> TaskPreview*/}
                <SidebarApp/> 
                <SidebarNav/>
                <BoardHeader />
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