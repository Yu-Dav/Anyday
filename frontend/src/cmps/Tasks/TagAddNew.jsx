import React, { useState } from 'react'
import { utilService } from '../../services/utilService';

export const TagAddNew = (props) => {

    const [txt, setTxt] = useState('')

    const onAddTag = (ev) => {
        ev.preventDefault()
        // if (!value) return
        const newTag = {
            id: utilService.makeId(),
            title: '#' + txt,
            color: getColor()
        }
        props.addNewTag(newTag)
        setTxt('')
    }

    const getColor = () => {
        const boardColors = props.board.colors
        var randomColor = boardColors[Math.floor(Math.random() * boardColors.length)]
        return randomColor.value
    }

    const handleChange = (ev) => {
        const { value } = ev.target
        setTxt(value)
    }

    return (
        <form className="tag-add flex" onSubmit={onAddTag}>
            <input style={{ zIndex: '1' }}
                value={txt} name="txt" type="text" onChange={handleChange}
                className="tags-picker-input" placeholder="Add tags" autoComplete="off" spellCheck="false" ></input>
            <button className="add-tag btn">Add</button>
        </form>
    )

}



