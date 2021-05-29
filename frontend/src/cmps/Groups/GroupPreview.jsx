import React from 'react'
import {GroupHeader} from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'
import { TaskAdd } from '../tasks/TaskAdd'

export function GroupPreview({ group, board, updateBoard }) {
    const {tasks} = group
    return (
        <div className="group-preview" >
            <GroupHeader group={group} board={board} updateBoard={updateBoard}/>
            {tasks.map(task => <TaskPreview board={board} group={group} key={task.id} task={task} updateBoard={updateBoard}/>)}
            <TaskAdd board={board} group={group} updateBoard={updateBoard}/>
        </div>
    )
}

