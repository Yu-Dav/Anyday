import React from 'react'
import { GroupHeader } from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'
import { TaskAdd } from '../tasks/TaskAdd'
import { SimplePopover } from '../SimplePopover'

export function GroupPreview({ group, board, updateBoard }) {

    const { tasks } = group
    const menu = "delete group"
    return (
        <div className="group-container flex" >
            <SimplePopover clickedEl="^" content={menu}                 
            anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}/>
            {/* <button onClick={handleClick}>^</button> */}

            <div className="group-preview">
                <GroupHeader group={group} board={board} updateBoard={updateBoard} />
                {tasks.map(task => <TaskPreview board={board} group={group} key={task.id} task={task} updateBoard={updateBoard} />)}
                <TaskAdd board={board} group={group} updateBoard={updateBoard} />
            </div>
        </div>
    )
}



