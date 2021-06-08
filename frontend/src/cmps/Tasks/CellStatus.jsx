import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { socketService } from '../../services/socketService'
import { userService } from '../../services/userService'
import { utilService } from '../../services/utilService'

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
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false })
    }

    onClickDone = (ev) => {
        ev.stopPropagation()
        // ev.preventDefault;
        ev.target.classList.toggle('animate')
        // setTimeout(ev.target.classList.remove('animate'), 700);
        this.setState({ ...this.state, isDone: true })
        setTimeout(() => {
            this.setState({ ...this.state, isDone: false })
            ev.target.classList.remove('animate')
        }, 700)
    }


    render() {
        const { status } = this.props.task
        const { statusLabels } = this.props.board
        const { isExpanded, isDone } = this.state
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>


                <div className="cell label" style={{ backgroundColor: status.color }} onClick={this.onOpenSelector}>
                   
                   <div className="status-priority-dog-ear">
                        {status.title}
                    </div>
                    {/* <div className={ ? "done status-priority-dog-ear" : "status-priority-dog-ear"}>
                        {status.title}
                    </div> */}

                    <div>
                        {isExpanded && <div>
                            <div className="fade-in modal-container relative">
                                <div className="triangle-with-shadow relative"></div>
                                <div className="floating-label-select">
                                    {statusLabels.map((label) => {
                                        // if (label.title === 'Done') {
                                        //     return <div className="done label-option" onClick={(ev) => {
                                        //         this.handleUpdate(ev)
                                        //         this.onClickDone(ev)
                                        //     }}
                                        //         key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
                                        //         {label.title}
                                        //     </div>
                                        // } else {
                                            return <div className="label-option" onClick={this.handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
                                                {label.title}
                                            </div>
                                        // }
                                    })}

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
