import React, { Component } from 'react'

export class CellStatus extends Component {
    render() {
        const { status } = this.props.task
        return (
            <div className="cell status">
                {status}
            </div>
        )
    }
}
