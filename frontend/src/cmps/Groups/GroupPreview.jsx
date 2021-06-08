import React from 'react'
import { GroupHeader } from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'
import { TaskAdd } from '../tasks/TaskAdd'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { GroupMenu } from './GroupMenu'

export function GroupPreview({ group, board, updateBoard, index, currUser }) {

    const { tasks } = group
    return (
        <Draggable draggableId={group.id} index={index} type="group">
            {dragProvided => (
                <div className="group-container flex"
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                >
                    <GroupMenu group={group} board={board} updateBoard={updateBoard} />
                    {/* <i className="fas group-handle" {...dragProvided.dragHandleProps}></i> */}
                    <div className="group-preview">
                        <GroupHeader group={group} board={board} updateBoard={updateBoard} drag={dragProvided.dragHandleProps}></GroupHeader>
                        <Droppable droppableId={group.id} type="task">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    // isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {tasks.map((task, index) => <TaskPreview index={index} board={board} group={group}
                                        key={task.id} task={task} updateBoard={updateBoard} />)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <TaskAdd board={board} group={group} updateBoard={updateBoard} currUser={currUser} />
                    </div>
                </div>

            )}
        </Draggable>
    )
}


// <div
//     ref={provided.innerRef}
//     {...provided.droppableProps} >
//     <GroupList

//         board={currBoard} groups={currBoard.groups} key={currBoard._id} updateBoard={this.props.updateBoard} />
//     {provided.placeholder}
// </div>


