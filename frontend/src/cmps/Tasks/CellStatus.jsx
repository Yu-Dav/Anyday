import React, { Component } from 'react'

export class CellStatus extends Component {
    render() {
        const { status } = this.props.task
        return (
            <div>
                {status}
            </div>
        )
    }
}