import React, { Component } from 'react'
import { EditableCmp } from '../EditableCmp'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import OpenWithIcon from '@material-ui/icons/OpenWith';

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

    DynamicGroupHeader = ({ cellType, index, groupID }) => {
        switch (cellType) {
            case 'title':
                return <span></span> // we need this otherwise nothing is returned -> err!
            case 'member':
                return (
                    <Draggable draggableId={`member-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (

                            <div className={snapshot.isDragging ? "cell asignee isDragging" : "cell asignee"}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            // isdragging={snapshot.isDragging.toString()}
                            >
                                {/* <i className="fas group-handle" ></i> */}
                                <OpenWithIcon />
                                <span>Members</span>
                            </div>
                        )}
                    </Draggable>
                )

            case 'tag':
                return (
                    <Draggable draggableId={`tag-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (
                            <div className={snapshot.isDragging ? "cell tags isDragging" : "cell tags"}

                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <OpenWithIcon />
                                <span>Tags</span>
                            </div>
                        )}
                    </Draggable>

                )
            case 'status':
                return (
                    <Draggable draggableId={`status-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (

                            // <div className="cell label"
                            <div className={snapshot.isDragging ? "cell label isDragging" : "cell label"}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <OpenWithIcon />
                                <span>Status</span>
                            </div>
                        )}
                    </Draggable>

                )
            case 'priority':
                return (
                    <Draggable draggableId={`priority-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (
                            // <div className="cell label"
                            <div className={snapshot.isDragging ? "cell label isDragging" : "cell label"}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <OpenWithIcon />
                                <span>Priority</span>
                            </div>
                        )}
                    </Draggable>

                )
            case 'creationLog':
                return (
                    <Draggable draggableId={`creationLog-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (

                            // <div className="cell creation-log"
                            <div className={snapshot.isDragging ? "cell creation-log isDragging" : "cell creation-log"}

                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <OpenWithIcon />
                                <span>Creation Log</span>
                            </div>
                        )}
                    </Draggable>

                )
            case 'timeline':
                return (
                    <Draggable draggableId={`timeline-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (

                            // <div className="cell timeline"
                            <div className={snapshot.isDragging ? "cell timeline isDragging" : "cell timeline"}

                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                            >
                                <OpenWithIcon />
                                <span>Timeline</span>
                            </div>
                        )}
                    </Draggable>

                )
            // case 'location': ///optional
            //     return
            default:
                return <div></div>;
        }
    }

    render() {
        const { group } = this.props
        return (
            <div className="group-header flex">
                <i className="fas group-handle" {...this.props.drag}></i>

                <div className="cell title" >
                    <EditableCmp name="group-title" value={group.title} updateFunc={this.onUpdateGroupTitle} style={{ color: group.style.bgColor }} />
                </div>

                <Droppable droppableId={`column-${this.props.group.id}`} type="column" direction="horizontal">
                    {(provided, snapshot) => (
                        <div className="flex"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.board.cellTypes.map((cellType, index) => <this.DynamicGroupHeader key={index} cellType={cellType} index={index} groupID={this.props.group.id} />)}

                            {provided.placeholder}

                        </div>
                    )}
                </Droppable>


            </div>
        )
    }
}
