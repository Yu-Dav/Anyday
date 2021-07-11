import React, { Component } from 'react'
import { EditableCmp } from '../EditableCmp'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import OpenWithIcon from '@material-ui/icons/OpenWith';
import { ReactComponent as GripSvg } from '../../assets/imgs/svg/grip-vertical.svg'


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

                            <div className={snapshot.isDragging ? "cell asignee isDragging flex space-between" : "cell asignee flex space-between"}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <span className="left-border">
                                    <i {...provided.dragHandleProps}>
                                        <GripSvg />
                                    </i>
                                </span>
                                <span>Members</span>
                                <span className="right-border"></span>
                            </div>
                        )}
                    </Draggable>
                )

            case 'tag':
                return (
                    <Draggable draggableId={`tag-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (
                            <div className={snapshot.isDragging ? "cell tags isDragging flex space-between" : "cell tags flex space-between"}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <span className="left-border">
                                    <i {...provided.dragHandleProps}>
                                        <GripSvg />
                                    </i>
                                </span>
                                <span>Tags</span>
                                <span className="right-border"></span>
                            </div>
                        )}
                    </Draggable>

                )
            case 'status':
                return (
                    <Draggable draggableId={`status-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (
                            <div className={snapshot.isDragging ? "cell label isDragging" : "cell label"}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <span className="left-border">
                                    <i {...provided.dragHandleProps}>
                                        <GripSvg />
                                    </i>
                                </span>
                                <span>Status</span>
                                <span className="right-border"></span>
                            </div>
                        )}
                    </Draggable>

                )
            case 'priority':
                return (
                    <Draggable draggableId={`priority-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (
                            <div className={snapshot.isDragging ? "cell label isDragging" : "cell label"}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <span className="left-border">

                                    <i {...provided.dragHandleProps}>
                                        <GripSvg />
                                    </i>
                                </span>

                                <span>Priority</span>
                                <span className="right-border"></span>

                            </div>
                        )}
                    </Draggable>

                )
            case 'creationLog':
                return (
                    <Draggable draggableId={`creationLog-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (
                            <div className={snapshot.isDragging ? "cell creation-log isDragging" : "cell creation-log"}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <span className="left-border">
                                    <i {...provided.dragHandleProps}>
                                        <GripSvg />
                                    </i>
                                </span>

                                <span>Creation Log</span>
                                <span className="right-border"></span>

                            </div>
                        )}
                    </Draggable>

                )
            case 'timeline':
                return (
                    <Draggable draggableId={`timeline-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (

                            <div className={snapshot.isDragging ? "cell timeline isDragging" : "cell timeline"}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <span className="left-border">

                                    <i {...provided.dragHandleProps}>
                                        <GripSvg />
                                    </i>
                                </span>

                                <span>Timeline</span>
                                <span className="right-border"></span>

                            </div>
                        )}
                    </Draggable>

                )
            case 'location':
                return (
                    <Draggable draggableId={`location-${groupID}`} index={index} type="column">
                        {(provided, snapshot) => (

                            <div className={snapshot.isDragging ? "cell location isDragging" : "cell location"}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <span className="left-border">

                                    <i {...provided.dragHandleProps}>
                                        <GripSvg />
                                    </i>
                                </span>

                                <span>Location</span>
                                <span className="right-border"></span>

                            </div>
                        )}
                    </Draggable>
                )
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
                        <div className={snapshot.isDraggingOver ? "column-dnd-container flex isDragging" : "column-dnd-container flex"}
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
