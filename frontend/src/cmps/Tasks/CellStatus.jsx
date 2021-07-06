import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { socketService } from '../../services/socketService'
import { userService } from '../../services/userService'
import { utilService } from '../../services/utilService'
import { EditableCmp } from '../EditableCmp'

export class CellStatus extends Component {
    state = {
        isExpanded: false,
        isDone: false
    }

    handleUpdate = async ({ target }) => {
        const newStatus = this.getStatusById(target.dataset.label)
        this.props.task.status = newStatus
        const newBoard = { ...this.props.board }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Status changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: this.props.task.id,
                title: this.props.task.title,
                changedItem: newStatus.title
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

    getStatusById = (labelId) => {
        const { statusLabels } = this.props.board
        return statusLabels.find(label => label.id === labelId)
    }

    onOpenSelector = () => {
        console.log('closing');
        this.setState({ ...this.state, isExpanded: true })
    }

    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false })
    }

    onUpdateNewStatus=()=>{
        console.log('you need to write a new one');
    }



    render() {
        const { status } = this.props.task
        const { statusLabels } = this.props.board
        const { isExpanded} = this.state
        const classNameDot = status.title === '.' ? 'no-title': ''
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className="cell label" style={{ backgroundColor: status.color }} onClick={this.onOpenSelector}>
                   
                   <div className={`status-priority-dog-ear ${classNameDot}`}>
                        {status.title}
                    </div>

                    <div>
                        {isExpanded && <div>
                            <div className="fade-in modal-container relative">
                                <div className="triangle-with-shadow relative"></div>
                                <div className="floating-label-select">
                                    {statusLabels.map((label) => {
                                        return <div className="label-option" onClick={this.handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
                                            {label.title}
                                        </div>
                                    })}
                                     {/* <EditableCmp className="label-option" name="status" value={status.title} updateFunc={this.onUpdateNewStatus} /> */}
                                </div>
                            </div>
                        </div>
                        }
                    </div>

                </div>
            </ClickAwayListener>
        )
    }
}
