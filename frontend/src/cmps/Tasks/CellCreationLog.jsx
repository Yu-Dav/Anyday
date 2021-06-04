import React, { Component } from 'react'

export class CellCreationLog extends Component {
    getTime(timestamp) {
        const options = { day: 'numeric', month: 'long', };
        const date = new Date(timestamp).toLocaleDateString('en-UK', options)
        let time = new Date(timestamp).toLocaleTimeString('en-UK')
        time = time.slice(0, 5)
        return date
    }
    render() {
        const { createdAt, byMember } = this.props.task
        const date = this.getTime(createdAt)
        return (
            <div className="cell creation-log">
                {!byMember.username &&
                    <p>Guest - {date}</p>
                }
                {byMember.username &&
                    <p>{byMember.username} - {date}</p>
                }
            </div>
        )
    }
}
