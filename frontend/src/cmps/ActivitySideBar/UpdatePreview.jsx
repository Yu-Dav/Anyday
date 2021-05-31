import React from 'react'
import { EditableCmp } from '../EditableCmp'

export function UpdatePreview({ comment, onUpdateComment, onRemoveComment }) {



    return (
        <div className="update-preview">
            <span>avatar</span><span>{comment.byMember.fullname}</span><span>{comment.createdAt}</span><span onClick={onRemoveComment}>delete</span>
            <EditableCmp value={comment.txt} updateFunc={onUpdateComment} />
        </div>
    )
}
