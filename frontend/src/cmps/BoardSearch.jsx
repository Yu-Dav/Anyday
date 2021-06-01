import React, { Component } from 'react'
import { Input } from '@material-ui/core'
import { CSSTransition } from 'react-transition-group';

export class BoardSearch extends Component {
    state = {
        txt: '',
        inProp: true
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ ...this.state, [field]: value }, () => {
            this.props.onSetFilter(this.state)
        })
    }
    render() {
        const { txt } = this.state
        return (
            <CSSTransition
                in={this.state.inProp} timeout={500} classNames="board-search-ani"
            >
                <form>
                    <label htmlFor="txt" ></label>
                    <Input
                        className="board-search" autoComplete="off" type="text" name="txt" id="txt"
                        value={txt} placeholder="Enter here" onChange={this.handleChange}
                        autoFocus />
                </form>
            </CSSTransition>

        )
    }
}
