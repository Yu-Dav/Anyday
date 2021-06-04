import React from 'react'
import { CellTitle } from './CellTitle'
import { CellMember } from './CellMember'
import { CellTag } from './CellTag'
import { CellStatus } from './CellStatus'
import { CellPriority } from './CellPriority'
import { CellCreationLog } from './CellCreationLog'
import { CellDate } from './CellDate'
import { Draggable } from 'react-beautiful-dnd';


export function TaskPreview({ task, group, board, updateBoard, index }) {
    const cellTypes = ['title', 'member', 'tag', 'status', 'priority', 'creationLog', 'timeline', 'map']
    return (
        <React.Fragment>
            <Draggable draggableId={task.id} index={index} type="task">
                {provided => (
                    <div className="task-row flex"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <span className="left-container flex">
                            <div className="group-color" style={{ backgroundColor: group.style.bgColor }}></div>

                            <CellTitle task={task} group={group} board={board} updateBoard={updateBoard} />
                        </span>
                        <CellMember task={task} board={board} updateBoard={updateBoard} />
                        <CellTag task={task} board={board} updateBoard={updateBoard} />
                        <CellStatus task={task} board={board} updateBoard={updateBoard} />
                        <CellPriority task={task} board={board} updateBoard={updateBoard} />
                        <CellCreationLog task={task} />
                        <CellDate task={task} group={group} board={board} updateBoard={updateBoard} />
                    </div>
                )}
            </Draggable>
        </React.Fragment>
    )
}

