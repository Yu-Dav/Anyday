import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { socketService } from '../../services/socketService'

import { TagAddNew } from './TagAddNew'

export function CellTag({ task, board, updateBoard }) {
    const tags = task.tags
    const availableTags = board.tags
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (!event) return
        event.stopPropagation()
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const update = async (event, tag) => {
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
        await updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
        // TODO- remove comment below when  modal works
        // handleClose(event)
    }
    const addNewTag = (tag) => {
        update(null, tag)
    }
    const getTagById = (tagId) => {
        return availableTags.find(tag => tag.id === tagId)
    }
    const onRemoveTag = async (ev) => {
        ev.stopPropagation()
        // if(!tags) return
        // const tagToRemove = getTagById(ev.target.dataset.tag)
        const tagId = ev.target.dataset.tag
        const tagIdx = availableTags.findIndex(tag => tag.id === tagId)
        console.log('tagIdx', tagIdx)
        availableTags.splice(tagIdx, 1)
        // const inTaskIdx = tags.findIndex(tag => tag.id === tagId)
        // tags.splice(inTaskIdx, 1)
        const newBoard = { ...board }
        await updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
        const tags = task.tags
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);
    return (
        <div ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle} className="cell tags">

            <div className="cell-tag-container flex justify-center">

                {tags.map((tag) => {
                    return <span className="tag-container" style={{ color: tag.color }} >{tag.title}</span>
                })}
            </div>
            <Popper style={{ zIndex: '1' }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <TagAddNew addNewTag={addNewTag} board={board} />
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" >
                                    {availableTags.map((tag) => {
                                        return <MenuItem className="modal-li" style={{
                                            color: tag.color, display: "flex", fontSize: "13px",
                                            justifyContent: "space-between"
                                        }}
                                            onClick={update} data-tag={tag.id} key={tag.id}> {tag.title}
                                            <i data-tag={tag.id} onClick={onRemoveTag} className="fas close"></i>
                                        </MenuItem>
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

        </div >
    );
}

