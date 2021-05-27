import React, { Component } from 'react'

export class GroupHeader extends Component {
    render() {
        const { group } = this.props
        return (
            <div className="group-header flex">
                <h1 style={{ color: group.style.bgColor }}>{group.title}</h1>
                <h2>Asignee</h2>
                <h2>Tags</h2>
                <h2>Status</h2>
                <h2>Priority</h2>
                <h2>Creation Log</h2>
                <h2>Due Date</h2>
            </div>
        )
    }
}

// todo- editabe