import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import { Colors } from '../Colors'
import { socketService } from '../../services/socketService'

import { ReactComponent as DropDownArrow } from '../../assets/imgs/svg/dropDownArrow.svg'

export class GroupMenu extends Component {

    state = {
        isExpanded: false,
        isColor: false
    }

    onDeleteGroup = async (ev) => {
        const newBoard = this.props.board
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        newBoard.groups.splice(groupIdx, 1)
        await this.props.updateBoard(newBoard)
        socketService.emit('board updated', newBoard._id);

    }
    onChangeGroupColor = async (ev) => {
        const newBoard = this.props.board
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const { color } = ev.target.dataset
        newBoard.groups[groupIdx].style.bgColor = color
        await this.props.updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
        this.setState({ ...this.state, isColor: false, isExpanded: false })
    }
    onSelectChange = (ev) => {
        ev.stopPropagation()
        this.setState({ ...this.state, isColor: !this.state.isColor, isExpanded: false })
    }
    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }
    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false, isColor: false })
    }
    render() {
        const { isExpanded, isColor } = this.state
        const { bgColor } = this.props.group.style
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className="group-modal-choose" onClick={this.onOpenSelector}>
                    <DropDownArrow style={{ fill: bgColor }} />
                    <div>
                        {isExpanded && <div className="fade-in group-modal absolute">
                            <div onClick={this.onDeleteGroup}>Delete group</div>
                            <div onClick={this.onSelectChange}>Choose color</div>
                        </div>
                        }
                        {isColor && <Colors
                            onChangeGroupColor={this.onChangeGroupColor} board={this.props.board}>
                        </Colors>
                        }
                    </div>
                </div>
            </ClickAwayListener>
        )
    }
}


