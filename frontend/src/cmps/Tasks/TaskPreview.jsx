import React from 'react'
import { CellTitle } from './CellTitle'
import { CellMember } from './CellMember'
import { CellTag } from './CellTag'
import { CellStatus } from './CellStatus'
import { CellPriority } from './CellPriority'
import { CellCreationLog } from './CellCreationLog'
import { CellDate } from './CellDate'

export function TaskPreview({ task }) {
    console.log ('task =',task)
    return (
        <div className="task-row flex">
            <CellTitle task={task} />
            <CellMember task={task} />
            <CellTag task={task} />
            <CellStatus task={task} />
            <CellPriority task={task} />
            <CellCreationLog task={task} />
            <CellDate task={task} />
            <div className="task-row-border"></div>
        </div>
    )
}



