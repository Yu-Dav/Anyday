import React, { Component } from 'react'
import { utilService } from '../../services/utilService';

export class TagAddNew extends Component {
    state = {
        txt: ''
    }

    //tags is an array with objects
    onAddTag = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const value = ev.target.value
        if (!value) return
        const newTag = {
            id: utilService.makeId(),
            title: '#' + value,
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
        console.log('boardcolors', this.props.board.colors)
        const { txt } = this.state
        return (
            <form className="tag-add flex" onSubmit={this.onAddTag}>
                <input onClick={(ev) => ev.stopPropagation()} style={{ zIndex: '1' }} onKeyUp={this.handleUpdate}
                    value={txt} name="txt" type="text" onChange={this.handleChange}
                    className="tags-picker-input" placeholder="Add tags" autoComplete="off" spellCheck="false" dir="auto" ></input>
                <button className="add">Add</button>

            </form>
        )
    }
}
