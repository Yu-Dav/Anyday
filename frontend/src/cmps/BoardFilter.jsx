import React, { Component } from 'react'
import { BoardFilterList } from './BoardFilterList.jsx'
import { connect } from 'react-redux'
import { loadBoard } from '../store/actions/boardActions'

class _BoardFilter extends Component {
    state = {
        filterBy: {
            member: [],
            priority: [],
            status: [],
            tag: []
        }
    }
    onSetFilter = (newFilterCriteria, filterType) => {
        const prevCriteria = this.state.filterBy[filterType].find(prevCriteria => prevCriteria.id === newFilterCriteria.id)
        if (prevCriteria) return // checking if the clicked new criteria already present in the state arr. is so return. later -> remove from the array, loadboard and return
        const newFilter = {
            ...this.state.filterBy,
            [filterType]: [...this.state.filterBy[filterType], newFilterCriteria]
        }
        const newState = { ...this.state, filterBy: newFilter }
        this.setState(newState, () =>
            this.props.loadBoard(this.props.currBoard._id, newFilter)
        )
        // add txt to the filterBy 
    }
    render() {
        const { board } = this.props
        return (
            <div className="board-filter fade-in">
                <div className=" filter-groups flex flex-column">
                    <div className="filter-group">
                        <h1>Status:</h1>
                        {board.statusLabels.map(status => < BoardFilterList type='status' key={status.id} field={status} onSetFilter={this.onSetFilter} />)}
                    </div>
                    <div className="filter-group">
                        <h1>Priority:</h1>
                        {board.priorityLabels.map(priority => < BoardFilterList type='priority' key={priority.id} field={priority} onSetFilter={this.onSetFilter} />)}
                    </div>
                    <div className="filter-group">
                        <h1>Tags:</h1>
                        {board.tags.map(tag => < BoardFilterList type='tag' key={tag.id} field={tag} onSetFilter={this.onSetFilter} />)}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // boards: state.boardModule.boards,
        currBoard: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoard,
    // updateBoard
}

export const BoardFilter = connect(mapStateToProps, mapDispatchToProps)(_BoardFilter)