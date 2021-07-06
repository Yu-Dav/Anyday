import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { socketService } from '../../services/socketService'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { utilService } from '../../services/utilService';
import { userService } from '../../services/userService';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export function CellMember({ task, group, board, updateBoard }) {
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

    const onAddMember = async (ev) => {
        const memberId = ev.target.dataset.id
        const member = getMemberById(memberId)
        const newActivity = {
            id: utilService.makeId(),
            type: 'Member added',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: task.id,
                title: task.title
            },
            group: {
                id: group.id,
                title: group.title
            }
        }
        const newBoard = { ...board }
        taskMembers.unshift(member)
        newBoard.activities.unshift(newActivity)
        await updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
        handleClose(ev)
    }

    const onRemoveMember = async (ev) => {
        const memberId = ev.target.dataset.id
        const memberIdx = taskMembers.findIndex(member => member._id === memberId)
        const member = taskMembers.find(member => member._id === memberId)
        taskMembers.splice(memberIdx, 1)
        const newBoard = { ...board }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Member removed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: task.id,
                title: task.title,
                changedItem: member.username
            },
            group: {
                id: group.id,
                title: group.title
            }
        }
        newBoard.activities.unshift(newActivity)
        await updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
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
        <div ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle} className="cell asignee">
            <div className="flex align-center justify-center">
               {!taskMembers.length && <Avatar style={{ width:'26px', height:'26px', opacity:'0.4'}} src="https://i.ibb.co/DbbwGK1/016-user.png" alt="016-user" />}
               {taskMembers && <AvatarGroup max={4}>
                {taskMembers.map(member =>  <Avatar key={member._id} alt={member.username} src={member.imgUrl} 
                style={{ width:'30px', height:'30px' }}/>
            )}
            </AvatarGroup>}
            </div>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: '5' }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ fontSize:'13px' }}>
                                    {taskMembers.map(member => {
                                        return <MenuItem style={{ display:'flex', gap:'10px', fontSize:'13px' }} 
                                        key={member._id}><Avatar alt={member.username} src={member.imgUrl} 
                                        style={{ width:'30px', height:'30px' }}/><span className="memb-full-name">{member.fullname}</span><i className="fas close" 
                                        data-id={member._id} onClick={onRemoveMember}></i></MenuItem>
                                    })}
                                    <hr />
                                    {getOtherMembers().map(member => {
                                        return <MenuItem style={{ display:'flex', gap:'10px', fontSize:'13px' }}
                                         key={member._id} data-id={member._id} onClick={onAddMember}>
                                             <Avatar alt={member.username} src={member.imgUrl} style={{ width:'30px', height:'30px' }}/>
                                             {member.fullname}</MenuItem>
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
