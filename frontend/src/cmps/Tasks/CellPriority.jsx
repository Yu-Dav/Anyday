import React, { Component } from 'react'

//try to combine with CellStatus?

export class CellPriority extends Component {
    state = {
        currPriority: null,
        isExpanded: false
    }

    componentDidMount() {
        // console.log('mounted')
        this.setState({ ...this.state, currPriority: this.props.priority })
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    render() {
        // work here
        const { priority, board } = this.props.task  
        const { isExpanded, currPriority } = this.state
        // console.log(priority)
        return (
            // delete innerline style after it works
            <div className="cell priority" style={{ color: 'red' }} onClick={this.onOpenSelector}>
                {priority.title}

                {isExpanded &&
                    <div className="floating-priority-select">
                        { }

                    </div>
                    // TODO- support adding a customized label (change names to labels?)
                }
            </div>
        )
    }
}
