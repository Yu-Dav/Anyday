import React, { Component } from 'react'
import { SimplePopover } from '../SimplePopover'

export function CellMember({task, board}) {
 
        const taskMembers = task.members
        const boardMembers = board.members

        return (
            <React.Fragment>
            <SimplePopover clickedEl={<div className="cell asignee">
                {taskMembers.map(member=>{
                    return <p key={member._id}>{member.username}</p>
                })}
            </div>} content={boardMembers.map(member=> {
                 <p key={member._id}>{member.fullname}</p>
            })}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }} />
            </React.Fragment>
        )
    
}
