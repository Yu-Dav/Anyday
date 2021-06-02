import React from 'react'
import { EditableCmp } from '../EditableCmp'

export function UpdatePreview({ comment, onUpdateComment, onRemoveComment }) {

    function getTime(timestamp) {
        const options = { year: 'numeric', day: 'numeric', month: 'long', };
        const date = new Date(timestamp).toLocaleDateString('en-UK', options)
        let time = new Date(timestamp).toLocaleTimeString('en-UK')
        time = time.slice(0, 5)
        return date
    }
    return (
        <div className="update-preview">
            <div className="flex space-between">
                <span>avatar</span><span>{comment.byMember.fullname}</span><span>{getTime(comment.createdAt)}</span><span onClick={() => onRemoveComment(comment)}>X</span>
            </div>
            <EditableCmp value={comment.txt} updateFunc={onUpdateComment} id={comment.id} />
        </div>
    )
}
