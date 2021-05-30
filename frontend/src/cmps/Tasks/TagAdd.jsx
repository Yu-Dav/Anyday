import React, { Component } from 'react'
import { utilService } from '../../services/utilService';

export class TagAdd extends Component {
    state = {
        txt: ''
    }

    //tags is an array with objects
    onAddTag = ({ target }) => {
        const value = target.value
        if (!value) return
        const newTag = {
            id: utilService.makeId(),
            title: '#' + value,
            color: 'pink', //support different colors
        }
    }

    handleUpdate = (ev) => {
        if (ev.key === 'Enter') {
            this.onAddTag(ev)
        }
    }

    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ ...this.state, [name]: value })
    }

    render() {
        const { txt } = this.state
        return (
            <div className="tag-add flex">
                <input onKeyUp={this.handleUpdate} value={txt} name="txt" type="text" onChange={this.handleChange}
                    className="tags-picker-input" placeholder="Add tags" autocomplete="off" spellcheck="false" dir="auto" ></input>
                <button className="add" onClick={this.onAddTag}>Add</button>

            </div>
        )
    }
}
