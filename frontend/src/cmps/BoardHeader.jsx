import React, { Component } from 'react'
import { EditableCmp } from './EditableCmp'
import { ReactComponent as StarSvg } from '../assets/imgs/svg/star.svg'
import {LocationSearchInput} from './tasks/CellLocation'
import { socketService } from '../services/socketService'

export class BoardHeader extends Component {

    onUpdateTitle = async ({ target }) => {
        const { name } = target.dataset
        const value = target.innerText
        const newBoard = { ...this.props.board }
        newBoard[name] = value
        await this.props.updateBoard(newBoard)
        socketService.emit('board updated', newBoard._id)
    }

    render = () => {
        const { board } = this.props
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
                        <button className="btn">Invite / 3</button>
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

