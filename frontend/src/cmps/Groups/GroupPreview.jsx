import React from 'react'
import { GroupHeader } from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'
import { TaskAdd } from '../tasks/TaskAdd'
import { SimplePopover } from '../SimplePopover'
import { Colors } from '../Colors'
import { Droppable } from 'react-beautiful-dnd';

import { GroupMenu } from './GroupMenu'
// import {ReactComponent as dropDownArrow} from '../../assets/imgs/dropDownArrow.svg'

export function GroupPreview({ group, board, updateBoard }) {



    const { tasks } = group

    return (

        <Droppable droppableId={group.id}>
            {provided => (
                <div className="group-container flex" >
                    <GroupMenu group={group} board={board} updateBoard={updateBoard} />


                    <div className="group-preview"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>

                        <GroupHeader group={group} board={board} updateBoard={updateBoard} />
                        {tasks.map((task, index) => <TaskPreview index={index} board={board} group={group} key={task.id} task={task} updateBoard={updateBoard} />)}
                        {provided.placeholder}
                        <TaskAdd board={board} group={group} updateBoard={updateBoard} />
                    </div>

                </div>
            )}
        </Droppable >

    )
}



