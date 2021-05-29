import React, { Component } from 'react'

export class GroupHeader extends Component {
    render() {
        const { group } = this.props
        return (
            <div className="group-header flex">
                <h1 className="title" style={{ color: group.style.bgColor }}>{group.title}</h1>
                <h2 className="asignee">Asignee</h2>
                <h2 className="tags">Tags</h2>
                <h2 className="status">Status</h2>
                <h2 className="priority">Priority</h2>
                <h2 className="creation-log">Creation Log</h2>
                <h2 className="due-date">Due Date</h2>
            </div>
        )
    }
}

// todo- editabe