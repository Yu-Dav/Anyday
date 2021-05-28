import React, { Component } from 'react'

export class CellCreationLog extends Component {
    getTime(timestamp) {
        const date = new Date(timestamp).toLocaleDateString("en-UK")
        let time = new Date(timestamp).toLocaleTimeString("en-UK")
        time = time.slice(0, 5)
        return date
    }


    render() {
        const { createdAt, byMember } = this.props.task
        const date = this.getTime(createdAt)
        return (
            <div className="cell">
                <p>{byMember.username}</p>
                <p>{date}</p> 
                {/* change to named date+ username to avatar */}
            </div>
        )
    }
}
