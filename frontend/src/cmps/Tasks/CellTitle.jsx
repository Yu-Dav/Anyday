import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { EditableCmp } from '../EditableCmp'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'


export class CellTitle extends Component {
    onRemoveTask = async () => {
        const newBoard = { ...this.props.board }
        const { group } = this.props
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const taskId = this.props.task.id
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)

        const newActivity = {
            id: utilService.makeId(),
            type: 'Task deleted',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: taskId,
                title: this.props.task.title
            },
            group: {
                id: groupId,
                title: group.title
            }
        }

        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
        newBoard.activities.unshift(newActivity)
        await this.props.updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
    }

    onUpdateTaskTitle = async ({ target }) => {
        const value = target.innerText
        const newBoard = { ...this.props.board }
        const { group } = this.props
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const taskId = this.props.task.id
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        const updatedTask = { ...this.props.task, title: value }
        const newActivity = {
            id: utilService.makeId(),
            type: 'Task title changed',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: taskId,
                title: updatedTask.title
            },
            group: {
                id: groupId,
                title: group.title
            }
        }
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1, updatedTask)
        newBoard.activities.unshift(newActivity)
        this.props.updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
    }
    render() {
        const { title, id } = this.props.task
        const { board, group } = this.props
        const className = this.props.task.comments.length ? 'fa comment active': 'fa comment'
        return (
            <div className="cell title flex ">
                <i className="fas fa-trash remove-task" onClick={this.onRemoveTask}></i>
                <EditableCmp className="cell-title-editable" name="title" value={title} updateFunc={this.onUpdateTaskTitle} />
                <Link to={`/board/${board._id}/${group.id}/${id}`}><i className={className}></i></Link>
            </div>
        )
    }
}
