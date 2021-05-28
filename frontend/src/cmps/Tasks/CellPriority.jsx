import React, { Component } from 'react'

//try to combine with CellStatus?

export class CellPriority extends Component {
    state = {
        currPriority: null,
        isExpanded: false
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    render() {
        const { priority } = this.props.task
        const { isExpanded, currPriority } = this.state
        console.log(priority)
        return (
            // delete innerline style after it works
            <div className="cell" style={{ color: 'red' }} onClick={this.onOpenSelector}>
                {priority.title}

                {isExpanded &&
                    <div className="floating-priority-select">
                        {}
                        <div>High</div>
                        <div>Medium</div>
                        <div>Low</div>
                        <div>Best Effort</div>

                    </div>
                    // TODO- support adding a customized label (change names to labels?)
                }
            </div>
        )
    }
}
