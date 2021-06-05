import React, { Component } from 'react'
import { Input } from '@material-ui/core'

export class BoardSearch extends Component {
    state = {
        txt: '',
        // inProp: true
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ ...this.state, [field]: value }, () => {
            this.props.setFilter(this.state)
        })
        // this.setState({ txt:'' })
    }
    render() {
        const { txt } = this.state
        return (

                <form className="board-search fade-in">
                    <label htmlFor="txt" ></label>
                    <Input
                        className="board-search" autoComplete="off" type="text" name="txt" id="txt"
                        value={txt} placeholder="Enter here" onChange={this.handleChange}
                        autoFocus />
                </form>

        )
    }
}
