import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { EditableCmp } from './EditableCmp'
import { ReactComponent as StarSvg } from '../assets/imgs/svg/star.svg'
import { socketService } from '../services/socketService'

import Avatar from '@material-ui/core/Avatar';

export class BoardHeader extends Component {
    state = {
        isExpanded: false
    }

    onUpdateTitle = async ({ target }) => {
        const { name } = target.dataset
        const value = target.innerText
        const newBoard = { ...this.props.board }
        // console.log(`file: BoardHeader.jsx || line 13 || newBoard`, newBoard)
        // Getting the correct board above
        newBoard[name] = value
        await this.props.updateBoard(newBoard)
        socketService.emit('board updated', newBoard._id)
    }

    onAddUser = async (ev) => {
        ev.stopPropagation()
        //prob below:
        console.log('click user:', ev.target);
        const userId = ev.target.dataset.id
        console.log('clickes userid:', userId);
        const user = this.getUserById(userId)
        console.log('got user' , user)


    }

    getUserById = (id) => {
        return this.props.users.find(user => user._id === id)
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    render = () => {
        const { board, users } = this.props
        console.log('members in board', board.members)
        console.log('users in board', users)
        const { isExpanded } = this.state
        return (

            <div className="board-header">
                <div className="header-top flex space-between">
                    <div className="title-container flex align-center">

                        <EditableCmp className="title" name="title" value={board.title} updateFunc={this.onUpdateTitle} />

                        <StarSvg className="star-fav" />
                        {/* <button className="btn" onClick={()=> window.location.hash = `/board/${board._id}/map`}>Map</button>
                        <LocationSearchInput/> */}
                    </div>
                    <div className="board-header-btns">

                        <button className="btn">Last seen</button>
                        <ClickAwayListener>
                        <button className="btn" onClick={this.onOpenSelector}>Invite / {users.length}</button>
                        {isExpanded && <div className="invite-user">
                            {users.map(user => {
                                return <div data-id={user._id} onClick={this.onAddUser}
                                    className="user-select flex" key={user._id}>
                                    <Avatar alt={user.username} src={user.imgUrl}
                                        style={{ width: '30px', height: '30px' }} /><span>{user.username}</span>
                                </div>
                            })}
                        </div>}
                        </ClickAwayListener>
                        <button className="btn" onClick={() => window.location.hash = `/board/${board._id}/activity_log`}>Activity</button>
                    </div>
                </div>
                <div className="full subtitle-container">
                    <EditableCmp className="subtitle" name="subtitle" value={board.subtitle} updateFunc={this.onUpdateTitle} />
                </div>
            </div>
        )
    }
}

// {getOtherMembers().map(member => {
//     return <MenuItem style={{ display:'flex', gap:'10px', fontSize:'13px' }}
//      key={member._id} data-id={member._id} onClick={onAddMember}>
//          <Avatar alt={member.username} src={member.imgUrl} style={{ width:'30px', height:'30px' }}/>
//          {member.fullname}</MenuItem>
// }
// )}