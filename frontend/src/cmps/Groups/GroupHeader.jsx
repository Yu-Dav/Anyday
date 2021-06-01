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
            // <div className="flex">
            <div className="group-header flex">
                {/* <button>^</button> */}
                <div className="cell title">
                <EditableCmp name="group-title" value={group.title} updateFunc={this.onUpdateGroupTitle} style={{ color: group.style.bgColor }}/>
                </div>
                <div className="cell asignee">Asignee</div>
                <div className="cell tags">Tags</div>
                <div className="cell label">Status</div>
                <div className="cell label">Priority</div>
                <div className="cell creation-log">Creation Log</div>
                <div className="cell timeline">Timeline</div>
            </div>
            // {/* </div> */}
        )
    }
}

// todo- editabe