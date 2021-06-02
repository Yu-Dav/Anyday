import React, { Component } from 'react'
// import ContentEditable from 'react-contenteditable'
import { EditableCmp } from './EditableCmp'
import { ReactComponent as StarSvg } from '../assets/imgs/svg/star.svg'

import { socketService } from '../services/socketService'


export class BoardHeader extends Component {

    onUpdateBoard = async ({ target }) => {
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
                <div className="flex space-between">
                    {/* <div className="full title-container flex align-center"> */}
                    <div className="title-container flex align-center">

                        <EditableCmp className="title" name="title" value={board.title} updateFunc={this.onUpdateBoard} />

                        <StarSvg className="" />
                    </div>
                    <div className="board-header-btns">

                        <button className="btn">Last seen</button>
                        <button className="btn">Invite / 3</button>
                        <button className="btn" onClick={()=> window.location.hash = `/board/${board._id}/activity_log`}>Activity</button>
                    </div>
                </div>
                <div className="full subtitle-container">
                    <EditableCmp className="subtitle" name="subtitle" value={board.subtitle} updateFunc={this.onUpdateBoard} />
                </div>
            </div>
        )
    }
}

