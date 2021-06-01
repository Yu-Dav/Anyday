import React from 'react';
// import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../Colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export function GroupMenu({ group, board, updateBoard }) {

    const newBoard = board
    const groupId = group.id
    const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

    const onDeleteGroup = (ev) => {
        newBoard.groups.splice(groupIdx, 1)
        updateBoard(newBoard)
        handleClose(ev)
    }

    const onChangeGroupColor = (ev) => {
        const { color } = ev.target.dataset
        newBoard.groups[groupIdx].style.bgColor = color
        updateBoard(newBoard)
        handleClose(ev)
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = (ev) => {
        // ev.stopPropagation()
        // ev.preventDefault()
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

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
            onClick={handleToggle}>
            ^
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '1' }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={onDeleteGroup}>Delete group</MenuItem>
                                    {/* <MenuItem onClick={onChangeGroupColor}>Change group color</MenuItem> */}
                                    <MenuItem><Colors onChangeGroupColor={onChangeGroupColor} board={board} /></MenuItem>
                                    {/* <MenuItem>lalalalalallalalalalal</MenuItem> */}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
