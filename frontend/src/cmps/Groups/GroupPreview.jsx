import React from 'react'
import { GroupHeader } from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'
import { TaskAdd } from '../tasks/TaskAdd'
import { SimplePopover } from '../SimplePopover'
import { Colors } from '../Colors'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { GroupMenu } from './GroupMenu'
// import {ReactComponent as dropDownArrow} from '../../assets/imgs/dropDownArrow.svg'

export function GroupPreview({ group, board, updateBoard, index }) {
    const { tasks } = group
    return (
        // All this Droppable should be draggable too. type = group.   

        // I think Draggable should be inside of Droppable. 




        // <Droppable droppableId={group.id} type="task"
        // 3 lines below belongs to Draggable above.
        // >
        // {dropProvided => (
        <Draggable draggableId={group.id} index={index} type="group">
            {dragProvided => (

                <div className="group-container flex"
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                    >
                    <GroupMenu group={group} board={board} updateBoard={updateBoard} />
                    <i className="fas fa-arrows-alt" {...dragProvided.dragHandleProps}></i>
                    <div className="group-preview"
                    // ref={dropProvided.innerRef}
                    // {...dropProvided.droppableProps}
                    >
                        <GroupHeader group={group} board={board} updateBoard={updateBoard} />
                        <Droppable droppableId={group.id} type="task">
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {tasks.map((task, index) => <TaskPreview index={index} board={board} group={group}
                                        key={task.id} task={task} updateBoard={updateBoard} />)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        {/* {dragProvided.placeholder} */}
                        <TaskAdd board={board} group={group} updateBoard={updateBoard} />
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


