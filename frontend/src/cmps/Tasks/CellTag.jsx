import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import {TagAdd} from './TagAdd'

export function CellTag({ task, board, updateBoard }) {
    // console.log('task', task.tags)
    const tags = task.tags
    const availableTags = board.tags
    // console.log('available' , availableTags)
    //   const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const update = (event) => {
        const selectedTag = getTagById(event.target.dataset.tag)
        task.tags.unshift(selectedTag)
        const newBoard = { ...board }
        // console.log('newBoard',newBoard)
        updateBoard(newBoard)
        handleClose(event)
    }


    const getTagById = (tagId) => {
        return availableTags.find(tag => tag.id === tagId)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
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

            <div className="flex justify-center">

                {tags.map((tag) => {
                    return <span className="tag-container" style={{ color: tag.color }} >{tag.title} </span>
                })}
            </div>
            <Popper style={{ zIndex: '1' }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <TagAdd/>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" >
                                {/* onKeyDown={handleListKeyDown} */}
                                    
                                    {availableTags.map((tag) => {
                                        return <MenuItem className="modal-li" style={{ color: tag.color,  display: "flex",
                                            justifyContent: "space-between"}}
                                            onClick={update} data-tag={tag.id}> {tag.title}
                                            <i className="fas close"></i>
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

