import React, { Component } from 'react'
import { utilService } from '../../services/utilService';

export class TagAddNew extends Component {
    state = {
        txt: ''
    }

    //tags is an array with objects
    onAddTag = (ev) => {
        ev.preventDefault()
        // if (!value) return
        const newTag = {
            id: utilService.makeId(),
            title: '#' + this.state.txt,
            color: this.getColor()
        }
        this.props.addNewTag(newTag)
        this.setState({ txt: '' })
    }

    getColor() {
        const boardColors = this.props.board.colors
        var randomColor = boardColors[Math.floor(Math.random() * boardColors.length)]
        return randomColor.value
    }

    handleChange = (ev) => {
        // ev.stopPropagation()
        const { name } = ev.target
        const { value } = ev.target
        this.setState({ ...this.state, [name]: value })
    }

    render() {
        const { txt } = this.state
        return (
            <form className="tag-add flex" onSubmit={this.onAddTag}>
                <input style={{ zIndex: '1' }}
                    value={txt} name="txt" type="text" onChange={this.handleChange}
                    className="tags-picker-input" placeholder="Add tags" autoComplete="off" spellCheck="false" ></input>
                <button className="add-tag btn">Add</button>
            </form>
        )
    }
}
