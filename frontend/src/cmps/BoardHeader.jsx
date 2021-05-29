import React, { Component } from 'react'
// import ContentEditable from 'react-contenteditable'
import { EditableCmp } from './EditableCmp'

export class BoardHeader extends Component {

    // handleChange = ({ target }) => {
    //     const { name } = target.dataset
    //     const value = target.innerText
    //     this.setState({ ...this.state, [name]: value })
    // }

    onUpdateBoard = ({ target }) => {
        console.log('onUpdateBoard');
        console.log(this.state);
        const { name } = target.dataset
        const value = target.innerText
        const newBoard = { ...this.props.board }
        newBoard[name] = value
        this.props.updateBoard(newBoard)
        console.log('new board', newBoard);
    }

    render = () => {
        // console.log('board',this.props.board);
        const { board } = this.props
        return (

            <div className="board-header">
                <div className="flex">
                    <div className="full title-container">
                    <EditableCmp className="title" name="title" value={board.title} updateFunc={this.onUpdateBoard} />
                    </div>
                    <button>Last seen</button>
                    <button>Invite / 3</button>
                    <button>Activity</button>
                </div>
                <div className="full subtitle-container">
                <EditableCmp className="subtitle" name="subtitle" value={board.subtitle} updateFunc={this.onUpdateBoard} />
                </div>
            </div>
        )
    }
}

