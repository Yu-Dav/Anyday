import React from 'react'
import { GroupHeader } from './GroupHeader'
import { TaskPreview } from '../Tasks/TaskPreview'
import { TaskAdd } from '../Tasks/TaskAdd'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { GroupMenu } from './GroupMenu'

//hashmap task titles?
export function GroupPreview({ group, board, updateBoard, index, currUser, setMap }) {
    const { tasks } = group
    return (
        <Draggable draggableId={group.id} index={index} type="group">
            {dragProvided => (
                <div className="group-container flex"
                {...dragProvided.draggableProps}
                ref={dragProvided.innerRef}
                >
                    <GroupMenu group={group} board={board} updateBoard={updateBoard} />
                    <div className="group-preview">
                        <GroupHeader group={group} board={board} updateBoard={updateBoard} drag={dragProvided.dragHandleProps}></GroupHeader>
                        <Droppable droppableId={group.id} type="task">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {tasks.map((task, index) => <TaskPreview index={index} board={board} group={group}
                                        key={task.id} task={task} updateBoard={updateBoard} setMap={setMap}/>)}
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
