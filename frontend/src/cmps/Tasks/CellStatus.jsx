import React, { useState } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { socketService } from '../../services/socketService'
import { userService } from '../../services/userService'
import { utilService } from '../../services/utilService'
import { EditableCmp } from '../EditableCmp'

export function CellStatus({ board, group, task, updateBoard }) {
    const [open, setOpen] = React.useState(false)

    const handleUpdate = async ({ target }) => {
        const newStatus = getStatusById(target.dataset.label)
        task.status = newStatus
        const newBoard = { ...board }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Status changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: task.id,
                title: task.title,
                changedItem: newStatus.title
            },
            group: {
                id: group.id,
                title: group.title
            }
        }
        newBoard.activities.unshift(newActivity)
        await updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
    }

    const getStatusById = (labelId) => {
        const { statusLabels } = board
        return statusLabels.find(label => label.id === labelId)
    }

    const onOpenSelector = () => {
        setOpen(true)
    }

    const handleClickAway = () => {
        setOpen(false)
    }

    // const onUpdateNewStatus=()=>{
    //     console.log('you need to write a new one');
    // }




    const { status } = task
    const { statusLabels } = board
    const classNameDot = status.title === '.' ? 'no-title' : ''
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="cell label" style={{ backgroundColor: status.color }} onClick={onOpenSelector}>

                <div className={`status-priority-dog-ear ${classNameDot}`}>
                    {status.title}
                </div>

                <div>
                    {open && <div>
                        <div className="fade-in modal-container relative">
                            <div className="triangle-with-shadow relative"></div>
                            <div className="floating-label-select">
                                {statusLabels.map((label) => {
                                    return <div className="label-option" onClick={handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
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
