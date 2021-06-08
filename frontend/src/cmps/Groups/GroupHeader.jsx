import React, { Component } from 'react'
import { EditableCmp } from '../EditableCmp'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'
import { Droppable, Draggable } from 'react-beautiful-dnd';

export class GroupHeader extends Component {
    onUpdateGroupTitle = async ({ target }) => {
        let value = target.innerText;
        if (!value) value = 'New group';
        const newBoard = { ...this.props.board };
        const groupId = this.props.group.id;
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId);
        const newActivity = {
            id: utilService.makeId(),
            type: 'Group title changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: null,
            group: {
                id: groupId,
                title: value
            }
        }
        newBoard.groups[groupIdx].title = value;
        newBoard.activities.unshift(newActivity)
        await this.props.updateBoard(newBoard);
        socketService.emit('board updated', newBoard._id);
    }
    render() {
        const { group } = this.props
        return (
            <div className="group-header flex">
                <i className="fas group-handle" {...this.props.drag}></i>

                <div className="cell title" {...this.props.drag}>
                    <EditableCmp name="group-title" value={group.title} updateFunc={this.onUpdateGroupTitle} style={{ color: group.style.bgColor }} />
                </div>
                <Droppable droppableId="column" type="column" direction="horizontal">
                    {(provided, snapshot) => (
                        <div className="flex"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >

                            <div className="cell asignee">
                                <i >m </i>
                                <span>Members</span>
                            </div>

                            <div className="cell tags">
                                <i>m </i>
                                <span>Tags</span>
                            </div>

                            <div className="cell label">
                                <i>m </i>
                                <span>Status</span>
                            </div>

                            <div className="cell label">
                                <i>m</i>
                                <span>Priority</span>
                            </div>

                            <div className="cell creation-log">
                                <i>m </i>
                                <span>Creation Log</span>
                            </div>

                            <div className="cell timeline">
                                <i>m </i>
                                <span>Timeline</span>
                            </div>

                            {provided.placeholder}

                        </div>
                    )}
                </Droppable>


            </div>
        )
    }
}
