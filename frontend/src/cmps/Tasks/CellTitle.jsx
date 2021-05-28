import React, { Component } from 'react'
import { EditableCmp } from '../EditableCmp'

export class CellTitle extends Component {
    render() {
        const { title } = this.props.task
        return (
            <div className="full">
                {/* cell title + btn to open chat */}
                {title}
                <EditableCmp className="title" name="title" value={title} updateFunc={this.onUpdateBoard}/>
            </div>
        )
    }
}
