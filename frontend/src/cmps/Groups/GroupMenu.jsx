import React, { useState } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { Colors } from '../Colors'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'
import { ReactComponent as DropDownArrow } from '../../assets/imgs/svg/dropDownArrow.svg'

export function GroupMenu({ group, board, updateBoard }) {
    const [isExpanded, setOpen] = React.useState(false)
    const [isColor, setColor] = React.useState(false)

    const onDeleteGroup = async (ev) => {
        const newBoard = board
        const groupId = group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const newActivity = {
            id: utilService.makeId(),
            type: 'Group deleted',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: null,
            group: {
                id: groupId,
                title: group.title
            }
        }
        newBoard.groups.splice(groupIdx, 1)
        newBoard.activities.unshift(newActivity)
        await updateBoard(newBoard)
        socketService.emit('board updated', newBoard._id);

    }
    const onChangeGroupColor = async (ev) => {
        const newBoard = board
        const groupId = group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const { color } = ev.target.dataset
        const newActivity = {
            id: utilService.makeId(),
            type: 'Group color changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: null,
            group: {
                id: groupId,
                title: group.title
            }
        }
        newBoard.groups[groupIdx].style.bgColor = color
        await updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
        setOpen(false)
        setColor(false)
    }
    const onSelectChange = (ev) => {
        ev.stopPropagation()
        setOpen(false)
        setColor(!isColor)
    }
    const onOpenSelector = () => {
        setOpen(!isExpanded)
    }
    const handleClickAway = () => {
        setOpen(false)
        setColor(false)
    }

    const { bgColor } = group.style
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <section className="group-modal-choose">
                <div onClick={onOpenSelector}>
                    <DropDownArrow style={{ fill: bgColor }} />

                </div>
                {isExpanded && <div className="fade-in group-modal absolute">
                    <div onClick={onDeleteGroup}>Delete group</div>
                    <div onClick={onSelectChange}>Choose color</div>
                </div>
                }
                {isColor && <Colors
                    onChangeGroupColor={onChangeGroupColor} board={board}>
                </Colors>
                }
            </section>
        </ClickAwayListener>
    )

}


