import React, { Component } from 'react'
import { EditableCmp } from '../EditableCmp'

export class CellTitle extends Component {

    onUpdateTaskTitle = ({target}) => {
        const value = target.innerText
        const newBoard = { ...this.props.board }
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const { group } = this.props
        const taskId = this.props.task.id
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        const updatedTask = {...this.props.task, title: value}
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1, updatedTask)
        this.props.updateBoard(newBoard)
    }

    render() {
        const { title } = this.props.task
        return (
            <div className="cell title">
                {/* cell title + btn to open chat */}
                {/* {title} */}
                <EditableCmp className="title" name="title" value={title} updateFunc={this.onUpdateTaskTitle} />
            </div>
        )
    }
}
