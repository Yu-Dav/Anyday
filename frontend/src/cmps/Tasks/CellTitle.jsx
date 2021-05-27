import React, { Component } from 'react'

export class CellTitle extends Component {
    render() {
        const {title} = this.props.task
        return (
            <div>
                {/* cell title + btn to open chat */}
                {title}

            </div>
        )
    }
}
