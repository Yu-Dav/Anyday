import React, { Component } from 'react'
// import ContentEditable from 'react-contenteditable'
import { EditableCmp } from './EditableCmp'
import { ReactComponent as StarSvg } from '../assets/imgs/svg/star.svg'

export class BoardHeader extends Component {

    // handleChange = ({ target }) => {
    //     const { name } = target.dataset
    //     const value = target.innerText
    //     this.setState({ ...this.state, [name]: value })
    // }

    onUpdateBoard = ({ target }) => {
        const { name } = target.dataset
        const value = target.innerText
        const newBoard = { ...this.props.board }
        newBoard[name] = value
        this.props.updateBoard(newBoard)
    }

    render = () => {
        // console.log('board',this.props.board);
        const { board } = this.props
        return (

            <div className="board-header">
                <div className="flex">
                    {/* <div className="full title-container flex"> */}
                    <div className="title-container flex">
                        <EditableCmp className="title" name="title" value={board.title} updateFunc={this.onUpdateBoard} />
                        <StarSvg className="" />
                    </div>
                    <div className="board-header-btns">

                        <button className="btn">Last seen</button>
                        <button className="btn">Invite / 3</button>
                        <button className="btn">Activity</button>
                    </div>
                </div>
                <div className="full subtitle-container">
                    <EditableCmp className="subtitle" name="subtitle" value={board.subtitle} updateFunc={this.onUpdateBoard} />
                </div>
            </div>
        )
    }
}

