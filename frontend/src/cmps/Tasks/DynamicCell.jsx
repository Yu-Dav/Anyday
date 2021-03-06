import React from 'react'
import { CellTitle } from './CellTitle'
import { CellMember } from './CellMember'
import { CellTag } from './CellTag'
import { CellStatus } from './CellStatus'
import { CellPriority } from './CellPriority'
import { CellCreationLog } from './CellCreationLog'
import { CellDate } from './CellDate'
import { CellLocation } from './CellLocation'

export function DynamicCell({ type, task, group, board, updateBoard, setMap, onRemoveTask }) {
    switch (type) {
        case 'title':
            return <CellTitle task={task} group={group} board={board} updateBoard={updateBoard} onRemoveTask={onRemoveTask}  />
        case 'member':
            return <CellMember task={task} group={group} board={board} updateBoard={updateBoard} />
        case 'tag':
            return <CellTag task={task} group={group} board={board} updateBoard={updateBoard} />
        case 'status':
            return <CellStatus task={task} group={group} board={board} updateBoard={updateBoard} />
        case 'priority':
            return <CellPriority task={task} group={group} board={board} updateBoard={updateBoard} />
        case 'creationLog':
            return <CellCreationLog task={task} />
        case 'timeline':
            return <CellDate task={task} group={group} board={board} updateBoard={updateBoard} />
        case 'location': ///optional
            return <CellLocation task={task} group={group} board={board} updateBoard={updateBoard} setMap={setMap}/>
        default:
            return console.log('not supported yet')
    }
}
