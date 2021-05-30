import React, { Component } from 'react'

//try to combine with CellStatus?

export class CellPriority extends Component {
    state = {
        isExpanded: false
    }

    handleUpdate = ({ target }) => {
        const selectedPriority = this.getPriorityById(target.dataset.label)
        this.props.task.priority= selectedPriority
        const newBoard = {...this.props.board}  
        // newBoard.priority = selectedPriority
        this.props.updateBoard(newBoard) //updating the entire board
    }

    getPriorityById = (labelId) => {
        const { priorityLabels } = this.props.board
        return priorityLabels.find(label => label.id === labelId)
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    render() {
        const { priority } = this.props.task
        const { priorityLabels } = this.props.board
        const { isExpanded } = this.state
        return (
            <div className="cell label" style={{ backgroundColor: priority.color }}  onClick={this.onOpenSelector}>
                {priority.title}
                {isExpanded &&
                    <div className="floating-label-select">
                        {priorityLabels.map((label) => {
                            return <div className="label-option" onClick={this.handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
                                {label.title}
                            </div>
                        })}
                    </div>
                    // TODO- support adding a customized label (change names to labels?)
                }
            </div>
        )
    }
}
