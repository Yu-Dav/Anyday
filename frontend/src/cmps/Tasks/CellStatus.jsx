import React, { Component } from 'react'
import { SimplePopover } from '../SimplePopover'

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

    render() {
        const { status } = this.props.task
        const { statusLabels } = this.props.board
        // const { isExpanded } = this.state
        const clickableLabel = <div style={{ backgroundColor: status.color }}>{status.title}</div>
        const menu = <div className="floating-label-select">
            {statusLabels.map((label) => {
                return <div className="color-option" key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}> {label.title} </div> })}
            </div>
        return (
            // <div className="cell label" style={{ backgroundColor: status.color }} onClick={this.onOpenSelector}>
            //     {status.title}
            //     {isExpanded &&
            //     <div className= "floating-label-select">
            //         {statusLabels.map((label)=>{
            //             return <div className="label-option" onClick={this.handleUpdate} key={label.id} data-label={label.id} style={{ backgroundColor: label.color }}>
            //                 {label.title}
            //             </div>
            //         })}

            //     </div>
            //     }
            // </div>

            <SimplePopover className="cell label" clickedEl={clickableLabel} content={menu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }} />
        )
    }
}
