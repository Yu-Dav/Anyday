import React, { Component } from 'react'
import {UpdatePreview} from './UpdatePreview'

export class Updates extends Component {

    onAddComment = () => {

    }

    onUpdateComment = () => {

    }

    onRemoveComment = () => {

    }

    render() {
        const task = this.props
        if (!task) return <div>loading</div>
        return (
            <div className="updates">
                <form onSubmit={this.onAddUpdate}>
                    <input type="text" placeholder="Write an update" />
                    <button>Update</button>
                </form>
                <div className="updates-list">
                    {/* {task.comments.map(comment => <UpdatePreview comment={comment} onUpdateComment={this.onUpdateComment} onRemoveComment={this.onRemoveComment}/>)} */}
                </div>
            </div>
        )
    }
}
