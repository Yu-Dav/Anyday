import React, { Component } from 'react'
import { userService } from '../../services/userService'
import { utilService } from '../../services/utilService'
import { UpdatePreview } from './UpdatePreview'
import { cloudinaryService } from '../../services/cloudinaryService'

export class Updates extends Component {

    state = {
        isBoardComments: false,
        comment: '',
        imgUrl: null,
        height: '40px',
        width: '100%',
        isUploading: false
    }

    uploadImg = async (ev) => {
        this.setState({ ...this.state, isUploading: true, height: 500, width: 500 })
        const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
        this.setState({ ...this.state, isUploading: false, imgUrl: secure_url, height, width })
    }
    get uploadMsg() {
        const { imgUrl, isUploading } = this.state
        if (imgUrl) return 'Uploaded'
        return isUploading ? 'Uploading...' : 'Upload Image'
    }

    onAddComment = (ev) => {
        ///todo
        const { task, groupId } = this.props
        ev.preventDefault()
        const newComment = {
            id: utilService.makeId(),
            txt: this.state.comment,
            imgUrl: this.state.imgUrl,
            createdAt: Date.now(),
            //change to logged in user
            byMember: userService.getLoggedinUser(),
            groupId: groupId,
            taskId: task.id
        }
        task.comments.unshift(newComment)
        this.props.onUpdateTask(task)
        this.setState({ ...this.state, comment: '', imgUrl: null, height: '40px', width: '100%' })
    }

    onUpdateComment = ({ target }) => {
        const value = target.innerText
        if (!value) value = 'New task'
        let { task, board } = this.props
        const commentId = target.dataset.id
        if (!task) {
            task = board.groups.find(group => group.tasks.find(task => task.comments.find(comment => comment.id === commentId)))
        }
        const commentIdx = task.comments.findIndex(comment => comment.id === commentId)
        const updatedComment = { ...task.comments[commentIdx], txt: value }
        task.comments.splice(commentIdx, 1, updatedComment)
        this.props.onUpdateTask(task)
    }

    getTask = (commentId) => {
        let task
        this.props.board.groups.forEach(group => {
            group.tasks.forEach(currTask => {
                currTask.comments.forEach(comment => {
                    if (comment.id === commentId && comment.taskId === currTask.id) {
                        task = currTask
                    }
                })
            })
        })
        return task
    }

    onRemoveComment = (comment) => {
        let { task, board } = this.props
        if (!task) {
            // task = board.groups.find(group => group.tasks.find(task => task.comments.find(comment => comment.id === commentId)))
            task = this.getTask(comment.id)
            console.log(task);
        }
        const commentId = comment.id
        const commentIdx = task.comments.findIndex(comment => comment.id === commentId)
        task.comments.splice(commentIdx, 1)
        this.props.onUpdateTask(task, comment.groupId)
    }

    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ ...this.state, [name]: value })
    }

    get boardComments() {
        const boardComments = []
        console.log(this.props.board);
        if (this.props.board.groups) {
            this.props.board.groups.forEach(group => {
                group.tasks.forEach(task => {
                    task.comments.forEach(comment => boardComments.push(comment))
                })
            })
        }
        return boardComments
    }

    render() {
        const { imgUrl, width, height, comment } = this.state
        const previewStyle = {
            backgroundImage: `url(${imgUrl})`,
            width,
            height
        }
        const { task, board } = this.props
        console.log('task', task);
        console.log('board', board);
        if (!board) return <div>loading</div>
        return (
            <div className="updates">
                {!task &&
                    <div className="updates-list">
                        {this.boardComments.map(comment => <UpdatePreview key={comment.id} comment={comment} onUpdateComment={this.onUpdateComment} onRemoveComment={this.onRemoveComment} />)}
                    </div>
                }
                {task &&
                    <React.Fragment>
                            <form onSubmit={this.onAddComment}>
                        <div className="upload-preview">
                                <textarea name="comment" id="" cols="30" rows="10" placeholder="Write an update..." value={comment} onChange={this.handleChange}></textarea>
                                <img src={imgUrl} alt="" />
                                <input type="file" onChange={this.uploadImg} accept="img/*" id="imgUpload" style={{display: "none"}}/>
                        </div>
                                <label htmlFor="imgUpload">{this.uploadMsg}</label>
                                <button>Update</button>
                            </form>
                        <div className="updates-list">
                            {task.comments.map(comment => <UpdatePreview key={comment.id} comment={comment} imgUrl={comment.imgUrl} onUpdateComment={this.onUpdateComment} onRemoveComment={this.onRemoveComment} />)}
                        </div>
                    </React.Fragment>}
            </div>
        )
    }
}
