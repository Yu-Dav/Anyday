import React, { Component } from 'react'
import { ClickAwayListener } from '@material-ui/core'

export class Modal extends Component {
    state = {
        isExpanded: false,
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false })
    }

    render() {
        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className={`modal ${this.props.className}`} onClick={this.onOpenSelector}>
                    {this.props.children}
                </div>
            </ClickAwayListener>
        )
    }
}
