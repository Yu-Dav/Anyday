import React from 'react'
import { CellTitle } from '../tasks/CellTitle'
import { CellMember } from '../tasks/CellMember'
import { CellTag } from '../tasks/CellTag'
import { CellStatus } from '../tasks/CellStatus'
import { CellPriority } from '../tasks/CellPriority'
import { CellCreationLog } from '../tasks/CellCreationLog'
import { CellDate } from '../tasks/CellDate'

export function TaskPreview({ task }) {
    return (
        <div className="task-row flex">
            <CellTitle task={task} />
            <CellMember task={task} />
            <CellTag task={task} />
            <CellStatus task={task} />
            <CellPriority task={task} />
            <CellCreationLog task={task} />
            <CellDate task={task} />
        </div>
    )
}



