import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { Colors } from '../Colors'

export class GroupMenu extends Component {

    state = {
        isExpanded: false,
        isColor: false
    }

    //should arive from props
    // const newBoard = this.props.board
    // const groupId = this.props.group.id
    // const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

    onDeleteGroup = (ev) => {
        const newBoard = this.props.board
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

        newBoard.groups.splice(groupIdx, 1)
        this.props.updateBoard(newBoard)
        // handleClose(ev)
    }

    onChangeGroupColor = (ev) => {
        console.log('okkkk')
        const newBoard = this.props.board
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

        const { color } = ev.target.dataset
        newBoard.groups[groupIdx].style.bgColor = color
        this.props.updateBoard(newBoard)
        // handleClose(ev)
    }


    onSelectChange = () => {
        console.log('okkkk')
        this.setState({ isColor: !this.state.isColor }, console.log(this.state))
    }
    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false })
    }

    render() {
        const { isExpanded, isColor } = this.state

        return (
            // <ClickAwayListener onClickAway={this.handleClickAway}>
            <div className="group-modal-choose" onClick={this.onOpenSelector}>^
                <div>
                    {isExpanded && <div className="fade-in modal-container">
                        <div onClick={this.onDeleteGroup}>Delete group</div>
                        <div onClick={this.onSelectChange}>Choose color</div>

                    </div>
                    }
                    {/* {isColor
                        && <Colors onChangeGroupColor={this.onChangeGroupColor} board={this.props.board}></Colors>} */}
                    {isColor && <div className="TEST">YOYOYOYO</div>}
                </div>

            </div>
            // </ClickAwayListener>
        )
    }
}