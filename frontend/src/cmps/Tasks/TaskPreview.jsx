import React from 'react'
import { CellTitle } from './CellTitle'
import { CellMember } from './CellMember'
import { CellTag } from './CellTag'
import { CellStatus } from './CellStatus'
import { CellPriority } from './CellPriority'
import { CellCreationLog } from './CellCreationLog'
import { CellDate } from './CellDate'


export function TaskPreview({ task, group, board, updateBoard }) {
    return (
        <React.Fragment>
            <div className="task-row flex">
                <CellTitle task={task} group={group} board={board} updateBoard={updateBoard}/>
                <CellMember task={task} />
                <CellTag task={task} />
                <CellStatus task={task} board={board} updateBoard={updateBoard} />
                <CellPriority task={task} board={board} updateBoard={updateBoard}/> 
                <CellCreationLog task={task} />
                <CellDate task={task} />
            </div>
        
        </React.Fragment>
    )
}

