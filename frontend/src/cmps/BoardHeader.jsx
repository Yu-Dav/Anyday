import React, { useState } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { EditableCmp } from './EditableCmp'
// import { ReactComponent as StarSvg } from '../assets/imgs/svg/star.svg'
import { socketService } from '../services/socketService'
// import { ReactComponent as User } from '../assets/imgs/avatars/016-user.svg'
import Avatar from '@material-ui/core/Avatar';

export function BoardHeader({ board, updateBoard, users }) {
    
    const [open, setOpen] = useState(false)

    const onUpdateTitle = async ({ target }) => {
        const { name } = target.dataset
        const value = target.innerText
        const newBoard = { ...board }
        // Getting the correct board above
        newBoard[name] = value
        await updateBoard(newBoard)
        socketService.emit('board updated', newBoard._id)
    }

    const onAddUser = async (ev) => {
        ev.stopPropagation()
        const newBoard = { ...board }
        const userId = ev.currentTarget.dataset.id
        const user = getUserById(userId)
        newBoard.members.unshift(user)
        await updateBoard(newBoard)
        socketService.emit('board updated', newBoard._id)
        setOpen(false)
    }


    const getOtherMembers = () => {
        var otherMembers = users.filter(user => {
            let filteredArr = board.members.filter(boardMem => {
                return boardMem._id === user._id
            });
            if (filteredArr.length > 0) return false
            return true
            //`return !length;` will  return false if length > 0
        });
        return otherMembers
    }

    const getUserById = (id) => {
        return users.find(user => user._id === id)
    }

    const handleClickAway = () => {
        setOpen(false)
    }

    const onOpenSelector = () => {
        setOpen(!open)
    }

    return (
        <div className="board-header">
            <div className="header-top flex space-between">
                <div className="title-container flex align-center">
                    <EditableCmp className="title" name="title" value={board.title} updateFunc={onUpdateTitle} />

                    {/* <StarSvg className="star-fav" /> */}
                </div>
                <div className="board-header-btns flex">
                    {/* <User/> */}
                    {/* <button className="btn">Last seen</button> */}
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div className="board-header-btns flex">
                            <button className="btn" onClick={onOpenSelector}>Invite / {users.length}</button>
                            {open && <div className="invite-user">
                                {getOtherMembers().map(user => {
                                    return <div data-id={user._id} onClick={onAddUser}
                                        className="user-select flex" key={user._id}>
                                        <Avatar alt={user.username} src={user.imgUrl}
                                            style={{ width: '30px', height: '30px' }} /><span>{user.username}</span>
                                    </div>
                                })}
                            </div>}
                        </div>
                    </ClickAwayListener>
                    <button className="btn" onClick={() => window.location.hash = `/board/${board._id}/activity_log`}>Activity</button>
                </div>
            </div>
            <div className="full subtitle-container">
                <EditableCmp className="subtitle" name="subtitle" value={board.subtitle} updateFunc={onUpdateTitle} />
            </div>
        </div>
    )

}
