import React, { createRef } from 'react';
// import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export function CellMember({ task, board, updateBoard }) {
    const taskMembers = task.members
    const boardMembers = board.members
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return
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
        if (prevOpen.current === true && open === false) anchorRef.current.focus()
        prevOpen.current = open;
    }, [open]);

    const onAddMember = (ev) => {
        const memberId = ev.target.dataset.id
        const member = getMemberById(memberId)
        taskMembers.unshift(member)
        const newBoard = { ...board }
        updateBoard(newBoard)
        handleClose(ev)
        console.log(taskMembers);
    }

    const onRemoveMember = (ev) => {
        const memberId = ev.target.dataset.id
        // console.log('member id',memberId);
        const memberIdx = taskMembers.findIndex(member => member._id === memberId)
        taskMembers.splice(memberIdx, 1)
        const newBoard = { ...board }
        updateBoard(newBoard)
        handleClose(ev)
    }

    function getMemberById(id) {
        return boardMembers.find(member => member._id === id)
    }

    function getOtherMembers() {
        var otherMembers = boardMembers.filter(boardMem => {
            let filteredArr = taskMembers.filter(taskMem => {
                return taskMem._id === boardMem._id
            });
            if (filteredArr.length > 0) return false
            return true
            //`return !length;` will  return false if length > 0
        });
        return otherMembers
    }

    return (
        <div  ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle} className="cell asignee">
            <div className="flex align-center justify-center">{taskMembers.map(member => {
                // return <span key={member._id}>{member.username.charAt(0)} </span>
                return <span className="cell-member-avatar flex align-center" key={member._id}>
                    <img src={member.imgUrl} alt="Member Avatar" />
                </span>
            })}
            </div>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '1' }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {taskMembers.map(member => {
                                        return <MenuItem key={member._id} >{member.fullname}<span data-id={member._id} onClick={onRemoveMember}> x</span></MenuItem>
                                    })}
                                    <hr />
                                    {getOtherMembers().map(member => {
                                        return <MenuItem key={member._id} data-id={member._id} onClick={onAddMember}>{member.fullname}</MenuItem>
                                    }
                                    )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
