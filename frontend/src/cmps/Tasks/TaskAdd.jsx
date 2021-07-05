import React, { Component } from 'react'
import { utilService } from '../../services/utilService';
import { socketService } from '../../services/socketService';
// import { EditableCmp } from '../EditableCmp'
import { userService } from '../../services/userService'

export class TaskAdd extends Component {
    state = {
        txt: ''
    }
    onAddTask = async ({ target }) => {
        const value = target.value
        if (!value) return
        const newTask = {
            id: utilService.makeId(),
            labelIds: ['101'],
            createdAt: Date.now(),
            title: value,
            timeline: [null, null],
            tags: [],
            status: {
                id: 'sl1',
                title: '.',
                color: '#c4c4c4',
            },
            priority: {
                id: 'pl1',
                title: '.',
                color: '#c4c4c4',
            },
            members: [],
            comments: [],
            byMember: userService.getLoggedinUser(),
        }

        const newBoard = { ...this.props.board }
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

        const newActivity = {
            id: utilService.makeId(),
            type: 'Task added',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: newTask.id,
                title: newTask.title
            },
            group: {
                id: groupId,
                title: this.props.group.title
            }
        }
        if (!newBoard.groups[groupIdx].tasks || !newBoard.groups[groupIdx].tasks.length) newBoard.groups[groupIdx].tasks = [newTask]
        // else newBoard.groups[groupIdx].tasks.push(newTask)
        else newBoard.groups[groupIdx].tasks = [...newBoard.groups[groupIdx].tasks, newTask]
        newBoard.activities.unshift(newActivity)
        await this.props.updateBoard(newBoard)
        // console.log(`file: TaskAdd.jsx || line 47 || newBoard`, this.props.board)
        await socketService.emit('board updated', newBoard._id)
        this.setState({ txt: '' })
    }
    handleUpdate = (ev) => {
        if (ev.key === 'Enter' || ev.type === 'blur') {
            this.setState({ isEditing: false },
                () => {
                    this.onAddTask(ev)
                    // ev.target.blur()
                })
        }
        setTimeout(() => {
            this.setState({ isEditing: true })
        }, 500)
    }

    handleChange = ({ target }) => {
        const { name } = target
        const { value } = target
        this.setState({ ...this.state, [name]: value })
    }

    render() {
        const { txt } = this.state
        return (
            <div className="task-add flex">
                <div className="group-color" style={{ backgroundColor: this.props.group.style.bgColor }}></div>
                {/* <input autoComplete="off" className="full" name="txt" type="text" placeholder="+ New Task"
                    onKeyUp={this.handleUpdate} value={txt} onChange={this.handleChange} /> */}
                <input autoComplete="off" name="txt" type="text" placeholder="+ New Task"
                    onBlur={this.handleUpdate} onKeyUp={this.handleUpdate} value={txt} onChange={this.handleChange} />
                <button className="add" onClick={this.handleUpdate}>Add</button>
            </div>
        )
    }
}
