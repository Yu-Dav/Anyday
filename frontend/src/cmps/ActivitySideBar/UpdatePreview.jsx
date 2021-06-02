import React from 'react'
import { EditableCmp } from '../EditableCmp'

export function UpdatePreview({ comment, onUpdateComment, onRemoveComment }) {

    return (
        <div className="update-preview">
            <div className="flex space-between">
            <span>avatar</span><span>{comment.byMember.fullname}</span><span>{comment.createdAt}</span><span onClick={()=>onRemoveComment(comment)}>X</span>
            </div>
            <EditableCmp value={comment.txt} updateFunc={onUpdateComment} id={comment.id} />
        </div>
    )
}
