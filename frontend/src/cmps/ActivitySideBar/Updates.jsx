import React, { Component } from 'react'
import { UpdatePreview } from './UpdatePreview'

export class Updates extends Component {

    state = {
        comment: ''
    }

    onAddComment = () => {
        ///todo
        // const newComment = this.state.comment
        // const { task } = this.props
        // task.comments.unshift(newComment)
    }

    onUpdateComment = () => {

    }

    onRemoveComment = () => {

    }

    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ ...this.state, [name]: value })
    }

    render() {
        const { task } = this.props
        const { comment } = this.state
        console.log('task', task);
        if (!task) return <div>loading</div>
        return (
            <div className="updates">
                <form onSubmit={this.onAddComment}>
                    <input type="text" name="comment" placeholder="Write an update" value={comment} onChange={this.handleChange} />
                    <button>Update</button>
                </form>
                <div className="updates-list">
                    {task.comments.map(comment => <UpdatePreview key={comment.id} comment={comment} onUpdateComment={this.onUpdateComment} onRemoveComment={this.onRemoveComment} />)}
                </div>
            </div>
        )
    }
}
