import React, { Component } from 'react'
import { Input } from '@material-ui/core'

export class BoardSearch extends Component {

    state = {
        txt: '',
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
            <form>
                <Input 
                className="board-search" autoComplete="off" type="text" name="txt" 
                value={txt} placeholder="Search" onChange={this.handleChange} />
            </form>
        )
    }
}
