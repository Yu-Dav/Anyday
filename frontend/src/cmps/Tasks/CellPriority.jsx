import React, { Component } from 'react'

export class CellPriority extends Component {
    render() {
        const {priority} = this.props.task
        return (
            <div>
               {priority}
            </div>
        )
    }
}
