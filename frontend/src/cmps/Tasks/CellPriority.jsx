import React, { useState } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'

export function CellPriority ({board,task,group,updateBoard,})  {
    const [open, setOpen] = React.useState(false)
 
    const handleUpdate = async ({ target }) => {
        const selectedPriority = this.getPriorityById(target.dataset.label)
        task.priority = selectedPriority
        const newBoard = { ...board }
        // newBoard.priority = selectedPriority
        const newActivity = {
            id: utilService.makeId(),
            type: 'Priority changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: task.id,
                title: task.title,
                changedItem: selectedPriority.title
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
    const getPriorityById = (labelId) => {
        const { priorityLabels } = board
        return priorityLabels.find(label => label.id === labelId)
    }
    const onOpenSelector = () => {
        setOpen(!open)
    }
    const handleClickAway = () => {
        setOpen(false)
    }
    
        const { priority } = task
        const { priorityLabels } = board
        const classNameDot = priority.title === '.' ? 'no-title': ''
        return (
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className="cell label" style={{ backgroundColor: priority.color }} onClick={onOpenSelector}>

                    <div className={`status-priority-dog-ear ${classNameDot}`}>
                        {priority.title}
                    </div>

                    {open && <div>
                        <div className=" fade-in modal-container relative">
                            <div className=" triangle-with-shadow relative"></div>
                            <div className=" floating-label-select">
                                {priorityLabels.map((label) => {
                                    return <div className="label-option" onClick={handleUpdate} key={label.id}
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

