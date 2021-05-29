import React, { Component } from 'react'

//try to combine with CellStatus?

export class CellPriority extends Component {
    state = {
        isExpanded: false
    }

    componentDidMount() {
        this.setState({ ...this.state, currPriority: this.props.priority })
    }

    handleUpdate = ({ target }) => {
        // console.log('working on updating', target.dataset.label);
        const newPriority = this.getPriorityById(target.dataset.label)
       
        const newBoard = {...this.props.board}
        newBoard.priority = newPriority
        // this.props.task.priority= newPriority
        console.log('task', this.props.task)
        


        // const labelId = this.props.
        // this.setState
    }

    getPriorityById = (labelId) => {
        // console.log(labelId)
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
            <div className="cell priority" style={{ backgroundColor: priority.color }}  onClick={this.onOpenSelector}>
                {priority.title}

                {isExpanded &&
                    <div className="floating-priority-select">
                        {priorityLabels.map((label) => {
                            return <div onClick={this.handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
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
