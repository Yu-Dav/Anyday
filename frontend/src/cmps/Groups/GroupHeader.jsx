import React, { Component } from 'react'
import { EditableCmp } from '../EditableCmp'

export class GroupHeader extends Component {

    onUpdateGroupTitle = ({target})=> {
        let value = target.innerText
        if (!value) value = 'New group'
        const newBoard = { ...this.props.board }
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        newBoard.groups[groupIdx].title = value
        this.props.updateBoard(newBoard)
    }

   render() {
        const { group } = this.props
        return (
            <div className="group-header flex">
                <div className="title">
                <EditableCmp name="group-title" value={group.title} updateFunc={this.onUpdateGroupTitle} style={{ color: group.style.bgColor }}/>
                </div>
                {/* <h1 className="title" style={{ color: group.style.bgColor }}>{group.title}</h1> */}
                <div className="asignee">Asignee</div>
                <div className="tags">Tags</div>
                <div className="status">Status</div>
                <div className="priority">Priority</div>
                <div className="creation-log">Creation Log</div>
                <div className="due-date">Due Date</div>
            </div>
        )
    }
}

// todo- editabe