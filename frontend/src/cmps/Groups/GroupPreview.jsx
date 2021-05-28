import React from 'react'
import {GroupHeader} from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'
import { TaskAdd } from '../tasks/TaskAdd'

export function GroupPreview({ group, board, updateBoard }) {
    const {tasks} = group
    return (
        <div className="group-preview" >
            <GroupHeader group={group}/>
            {tasks.map(task => <TaskPreview board={board} key={task.id} task={task} />)}
            <TaskAdd board={board} group={group} updateBoard={updateBoard}/>
        </div>
    )
}

