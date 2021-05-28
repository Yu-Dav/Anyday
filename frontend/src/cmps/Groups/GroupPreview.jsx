import React from 'react'
import {GroupHeader} from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'

export function GroupPreview({ group, board }) {
    const {tasks} = group
    return (
        <div className="group-preview" >
            <GroupHeader group={group}/>
            {tasks.map(task => <TaskPreview board={board} key={task.id} task={task} />)}
        </div>
    )
}

