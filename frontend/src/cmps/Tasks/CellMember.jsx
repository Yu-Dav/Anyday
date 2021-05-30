import React, { Component } from 'react'
import { SimplePopover } from '../SimplePopover'

export function CellMember({task, board}) {
 
        const taskMembers = task.members
        const boardMembers = board.members
        return (
            <React.Fragment>
            <SimplePopover className="cell asignee" 
            clickedEl={<div>
                {taskMembers.map(member=>{
                    return <p key={member._id}>{member.fullname}</p>
                })}
            </div>} 
            content={<div>{boardMembers.map(member=> {
                 return <p key={member._id}>{member.fullname}</p>
            })}</div>}
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
