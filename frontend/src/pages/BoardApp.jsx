import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { BoardHeader } from '../cmps/BoardHeader'

import { loadBoard } from '../store/actions/boardActions'

class _BoardApp extends Component {
    
    componentDidMount() {
        const boardId = 'b101'  //later from params
        this.props.loadBoard(boardId)
    }

    render() {
        if (!this.props.currBoard) return <p>Loading</p>
        console.log('boardtitle', this.props.currBoard);
        return (
            <div>
                Board app
                Header
                Filter
                BoardCtrlPanel
                <h1>{this.props.currBoard.title}</h1>
                <BoardHeader />
                {/* GroupList -> map all groups -> GroupPreview -> map all tasks -> TaskPreview*/}
                <SidebarNav/>
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