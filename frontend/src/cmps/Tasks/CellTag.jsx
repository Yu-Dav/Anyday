import React, { useState } from 'react'
import { TagAddNew } from './TagAddNew'
import { ClickAwayListener } from '@material-ui/core'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'


export function CellTag({ board, task, group, updateBoard }) {
    const [open, setOpen] = React.useState(false)

    const handleUpdate = async ({ target }) => {
        const selectedTag = getTagById(target.dataset.tag)
        task.tags.unshift(selectedTag)
        const newBoard = { ...board }
        await updateBoard(newBoard) //updating the entire board
        await socketService.emit('board updated', newBoard._id);
        setOpen(false)

    }

    const update = async (event, tag) => {
        const availableTags = board.tags
        //CREATE
        let selectedTag;
        if (!event) {
            selectedTag = tag
            availableTags.unshift(tag)
        } else {
            // UPDATE
            selectedTag = getTagById(event.target.dataset.tag)
        }
        task.tags.unshift(selectedTag)
        const newBoard = { ...board }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Tag added',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: task.id,
                title: task.title,
                changedItem: selectedTag.title
            },
            group: {
                id: group.id,
                title: group.title
            }
        }
        newBoard.activities.unshift(newActivity)
        await updateBoard(newBoard)
        setOpen(false)
    }

    const addNewTag = (tag) => {
        update(null, tag)
    }

    const getTagById = (tagId) => {
        const availableTags = board.tags
        return availableTags.find(tag => tag.id === tagId)
    }

    const onOpenSelector = () => {
        setOpen(true)
    }


    const handleClickAway = (ev) => {
        ev.stopPropagation()
        setOpen(false)
    }

    const onRemoveTag = async (ev) => {
        // const availableTags = this.props.board.tags
        const tags = task.tags
        if (!tags) return
        ev.stopPropagation()
        const tagId = ev.target.dataset.tag
        const tagIdx = tags.findIndex(tag => tag.id === tagId)
        const tag = tags.find(tag => tag.id === tagId)
        tags.splice(tagIdx, 1)
        const newBoard = { ...board }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Tag removed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: task.id,
                title: task.title,
                changedItem: tag.title
            },
            group: {
                id: group.id,
                title: group.title
            }
        }
        newBoard.activities.unshift(newActivity)
        await updateBoard(newBoard)
    }

    const getOtherTags = () => {
        const availableTags = board.tags
        let taskTags = task.tags
        var otherTags = availableTags.filter(x => {
            let elementsOfArray2PresentInArray1 = taskTags.filter(y => {
                return y.id === x.id
            });
            if (elementsOfArray2PresentInArray1.length > 0) {
                return false
            } else {
                return true;
            }
        });
        return otherTags
    }



    const { tags } = task
    return (
        <ClickAwayListener onClickAway={(ev) => handleClickAway(ev)}>
            <div className="cell-tag-container flex justify-center" onClick={onOpenSelector} >
                {tags.map((tag) => {
                    return <span className="tag-container" style={{ color: tag.color }} key={tag.id}>{tag.title} </span>
                })}
                {open &&
                    <div className="tag-options fade-in">
                        <TagAddNew addNewTag={addNewTag} board={board} />
                        {tags.map((tag) => {
                            return <div className="tag-option"
                                key={tag.id} data-tag={tag.id} style={{
                                    color: tag.color, display: "flex", fontSize: "13px",
                                    justifyContent: "space-between"
                                }}>
                                {tag.title} <i data-tag={tag.id} onClick={onRemoveTag}
                                    className="fas close"></i>
                            </div>
                        })}
                        <hr className="horiz-line"></hr>
                        {getOtherTags().map((tag) => {
                            return <div className="tag-option" onClick={handleUpdate}
                                key={tag.id} data-tag={tag.id} style={{
                                    color: tag.color, display: "flex", fontSize: "13px",
                                    justifyContent: "space-between"
                                }}>
                                {tag.title}
                            </div>
                        })}
                    </div>
                }
            </div>
        </ClickAwayListener>
    )

}




