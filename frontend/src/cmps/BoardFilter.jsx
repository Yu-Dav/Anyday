import React, { Component } from 'react'
import { BoardFilterList } from './BoardFilterList.jsx'

export class BoardFilter extends Component {
    state = {
        filterBy: {
            member: [],
            priority: [],
            status: [],
            tag: []
        }
    }
    onSetFilter = (newFilterCriteria, filterType) => {
        // need to check if new criti already present in the curr filterBy filterType. if so no need to add again. 
        const newState = {
            ...this.state,
            filterBy: {
                ...this.state.filterBy,
                [filterType]: [...this.state.filterBy[filterType], newFilterCriteria]
            }
        }
        this.setState(newState,
            // this.props.loadBoard() with new filterBy obj
        )
    }
    render() {
        const { board } = this.props
        return (
            <div className="board-filter fade-in">
                {/* <h1>Filter by:</h1> */}
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



                {/* {groups.map(group => {
                    return group.tasks.map(task => {
                        // console.log('task =', task)
                        return < FilterList task={task} />
                    })
                })} */}

            </div>
        )
    }
}


