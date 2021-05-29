import React, { Component } from 'react'

export class CellStatus extends Component {
    state = {
        isExpanded: false
    }

    handleUpdate = ({ target }) => {
        const newStatus = this.getStatusById(target.dataset.label)
        this.props.task.status = newStatus
        const newBoard = {...this.props.board}
        this.props.updateBoard(newBoard)
    }

    getStatusById = (labelId) => {
        const { statusLabels } = this.props.board
        return statusLabels.find(label => label.id === labelId)
    }

    onOpenSelector = () => {
        console.log('opening stsdah')
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    render() {
        const { status } = this.props.task
        const { statusLabels } = this.props.board
        const { isExpanded } = this.state
        return (
            <div className="cell status" style={{ backgroundColor: status.color }} onClick={this.onOpenSelector}>
                {status.title}
                {isExpanded &&
                <div className= "floating-status-select">
                    {statusLabels.map((label)=>{
                        return <div className="color-option" onClick={this.handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
                            {label.title}
                        </div>
                    })}

                </div>
                }
            </div>
        )
    }
}


//statusLabels - name of the array