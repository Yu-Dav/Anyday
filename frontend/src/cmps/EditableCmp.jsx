import React, { useState } from 'react'

export const EditableCmp = (props) => {

    const [isEditing, setIsEditing] = useState(true)

    const handleUpdate = (ev) => {
        if (ev.key === 'Enter' || ev.type === 'blur') {
            setIsEditing(false)
            props.updateFunc(ev)
        }
        setTimeout(() => {
            setIsEditing(true)
        }, 500)
    }

    return (
        <div className={`editable-cmp ${props.className}`} style={props.style} data-name={props.name} data-id={props.id} contentEditable={isEditing}
            suppressContentEditableWarning={true} spellCheck="false"
            onBlur={handleUpdate} onKeyUp={handleUpdate}>
            {props.value}
        </div>
    )
}
