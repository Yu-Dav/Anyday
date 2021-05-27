import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BoardHeader} from '../cmps/BoardHeader'
import { loadBoard } from '../store/actions/boardActions'


 class _BoardApp extends Component {
    state = {

    }
    componentDidMount() {
        const { boardId } = this.props.match.params
        this.props.loadBoard(boardId)
    }

    render() {
        return (
            <div>
                Board app
                Header
                Filter
                BoardCtrlPanel
                <BoardHeader/>
                {/* GroupList -> map all groups -> GroupPreview -> map all tasks -> TaskPreview*/}
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