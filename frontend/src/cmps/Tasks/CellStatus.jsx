import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'


export class CellStatus extends Component {
    state = {
        isExpanded: false
    }

    handleUpdate = ({ target }) => {
        const newStatus = this.getStatusById(target.dataset.label)
        this.props.task.status = newStatus
        const newBoard = { ...this.props.board }
        this.props.updateBoard(newBoard)
    }

    getStatusById = (labelId) => {
        const { statusLabels } = this.props.board
        return statusLabels.find(label => label.id === labelId)
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false })
    }

    render() {
        const { status } = this.props.task
        const { statusLabels } = this.props.board
        const { isExpanded } = this.state
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className="cell label" style={{ backgroundColor: status.color }} onClick={this.onOpenSelector}>
                    {status.title}

                    <div>
                        {isExpanded && <div>
                            <div className="fade-in modal-container relative">
                                <div className="triangle-with-shadow relative"></div>
                                <div className="floating-label-select">
                                    {statusLabels.map((label) => {
                                        return <div className="label-option" onClick={this.handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
                                            {label.title}
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                        }
                    </div>

                </div>
            </ClickAwayListener>
        )
    }
}
