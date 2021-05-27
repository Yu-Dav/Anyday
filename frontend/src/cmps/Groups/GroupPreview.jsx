import React from 'react'
import {GroupHeader} from '../groups/GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'

export function GroupPreview({ group }) {
    const {tasks} = group
    return (
        <div className="group-preview" >
            <GroupHeader group={group}/>
            {tasks.map(task => <TaskPreview key={task.id} task={task} />)}
        </div>
    )
}

