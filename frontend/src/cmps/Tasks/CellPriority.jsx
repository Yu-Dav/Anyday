import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'

export class CellPriority extends Component {
    state = {
        isExpanded: false
    }
    handleUpdate = async ({ target }) => {
        const selectedPriority = this.getPriorityById(target.dataset.label)
        this.props.task.priority = selectedPriority
        const newBoard = { ...this.props.board }
        // newBoard.priority = selectedPriority
        const newActivity = {
            id: utilService.makeId(),
            type: 'Priority changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: this.props.task.id,
                title: this.props.task.title,
                changedItem: selectedPriority.title
            },
            group: {
                id: this.props.group.id,
                title: this.props.group.title
            }
        }
        newBoard.activities.unshift(newActivity)
        await this.props.updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
    }
    getPriorityById = (labelId) => {
        const { priorityLabels } = this.props.board
        return priorityLabels.find(label => label.id === labelId)
    }
    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }
    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false })
    }
    render() {
        const { priority } = this.props.task
        const { priorityLabels } = this.props.board
        const { isExpanded } = this.state
        const classNameDot = priority.title === '.' ? 'no-title': ''
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className="cell label" style={{ backgroundColor: priority.color }} onClick={this.onOpenSelector}>

                    <div className={`status-priority-dog-ear ${classNameDot}`}>
                        {priority.title}
                    </div>

                    {isExpanded && <div>
                        <div className=" fade-in modal-container relative">
                            <div className=" triangle-with-shadow relative"></div>
                            <div className=" floating-label-select">
                                {priorityLabels.map((label) => {
                                    return <div className="label-option" onClick={this.handleUpdate} key={label.id}
                                        data-label={label.id} style={{ backgroundColor: label.color }}>
                                        {label.title}
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    }
                </div>

            </ClickAwayListener>
        )
    }
}

