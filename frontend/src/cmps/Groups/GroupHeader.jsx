import React, { Component } from 'react'
import { EditableCmp } from '../EditableCmp'
import { socketService } from '../../services/socketService'

export class GroupHeader extends Component {
    onUpdateGroupTitle = async ({ target }) => {
        let value = target.innerText;
        if (!value) value = 'New group';
        const newBoard = { ...this.props.board };
        const groupId = this.props.group.id;
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId);
        newBoard.groups[groupIdx].title = value;
        await this.props.updateBoard(newBoard);
        socketService.emit('board updated', newBoard._id);
    }
    render() {
        const { group } = this.props
        return (
            <div className="group-header flex">
                <div className="cell title">
                    <EditableCmp name="group-title" value={group.title} updateFunc={this.onUpdateGroupTitle} style={{ color: group.style.bgColor }} />
                </div>
                <div className="cell asignee">Members</div>
                <div className="cell tags">Tags</div>
                <div className="cell label">Status</div>
                <div className="cell label">Priority</div>
                <div className="cell creation-log">Creation Log</div>
                <div className="cell timeline">Timeline</div>
            </div>
        )
    }
}
