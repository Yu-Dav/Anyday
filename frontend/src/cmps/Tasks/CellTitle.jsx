import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { EditableCmp } from '../EditableCmp'
import { socketService } from '../../services/socketService'

export class CellTitle extends Component {
    onRemoveTask = async () => {
        const newBoard = { ...this.props.board }
        const { group } = this.props
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const taskId = this.props.task.id
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
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
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1, updatedTask)
        this.props.updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
    }
    render() {
        const { title, id } = this.props.task
        const { board, group } = this.props
        return (
            <div className="cell title flex">
                {/* cell title + btn to open chat */}
                <Link to={`/board/${board._id}/${group.id}/${id}`}>Updates</Link>
                <i className="fas fa-trash remove-task" onClick={this.onRemoveTask}></i>
                {/* <div className="remove-task" onClick={this.onRemoveTask}>X</div> */}
                <EditableCmp className="title" name="title" value={title} updateFunc={this.onUpdateTaskTitle} />
            </div>
        )
    }
}
