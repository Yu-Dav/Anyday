import React, { Component } from 'react'
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
    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    render = () => {
        const { board } = this.props
        const {isExpanded} = this.state
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
                        <button className="btn" onClick={this.onOpenSelector}>Invite / 3</button>
                        {isExpanded && <div>
                            {board.members.map(member => {
                                return <div key={member._id}>
                                    <Avatar alt={member.username} src={member.imgUrl}
                                        style={{ width: '30px', height: '30px' }} />{member.fullname}
                                </div>
                            })}
                        </div>}
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

// {
//     taskMembers.map(member => {
//         return <MenuItem style={{ display: 'flex', gap: '10px', fontSize: '13px' }}
//             key={member._id}><Avatar alt={member.username} src={member.imgUrl}
//                 style={{ width: '30px', height: '30px' }} />{member.fullname}<i className="fas close"
//                     data-id={member._id} onClick={onRemoveMember}></i></MenuItem>
//     })
// }