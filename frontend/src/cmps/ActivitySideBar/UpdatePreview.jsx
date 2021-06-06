import React from 'react'
import { EditableCmp } from '../EditableCmp'
import Avatar from '@material-ui/core/Avatar'
import TimeAgo from 'react-timeago'
import { ReactComponent as CrossSvg } from '../../assets/imgs/svg/cross.svg'


export function UpdatePreview({ comment, onUpdateComment, onRemoveComment, imgUrl }) {

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
                <div className="member flex justify-center align-center">
                <span><Avatar alt={comment.byMember.username} src={comment.byMember.imgUrl} style={{ width:'30px', height:'30px', display:'inline-block' }}/></span><span>{comment.byMember.fullname}</span>
                </div>
                <div className="edit"> 
                <span><TimeAgo date={comment.createdAt} minPeriod={10}/></span><span onClick={() => onRemoveComment(comment)}><CrossSvg className="cross-svg"/></span>
                </div>
            </div>
            <EditableCmp value={comment.txt} updateFunc={onUpdateComment} id={comment.id} />
            {imgUrl && <img className="uplaodImg" src={imgUrl}></img>}
        </div>
    )
}
