import React, { Component } from 'react'

export class CellMember extends Component {
    render() {
        const {members} = this.props.task
        return (
            <div className="cell">
                {members.map(member=>{
                    return <p key={member._id}>{member.username}</p>
                })}
            </div>
        )
    }
}
