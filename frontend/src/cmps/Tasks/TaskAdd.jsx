import React, { Component } from 'react'
import { utilService } from '../../services/utilService';
// import { EditableCmp } from '../EditableCmp'


export class TaskAdd extends Component {

    state = {
        txt: ''
    }

    onAddTask = ({ target }) => {
        const value = target.value
        if (!value) return
        const newTask = {
            id: utilService.makeId(),
            labelIds: ['101'],
            createdAt: Date.now(),
            dueDate: null,
            title: value,
            tags: [],
            status: '',
            priority: {},
            members: [],
            comments: [],
            byMember: {//loggedin user
                _id: 'u101',
                username: 'Tal',
                fullname: 'Tal Tarablus',
                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
        }
        const newBoard = { ...this.props.board }
        const groupId = this.props.group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        console.log(groupId, groupIdx);
        newBoard.groups[groupIdx].tasks.push(newTask)
        this.props.updateBoard(newBoard)
        this.setState({ txt: '' })
    }


    handleUpdate = (ev) => {
        if (ev.key === 'Enter' || ev.type === 'blur') {
            this.setState({ isEditing: false }, () => this.onAddTask(ev))
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
            <div className="task-add">
                {/* <EditableCmp name="title" value="add task" updateFunc={this.onAddTask} /> */}
                <input name="txt" type="text" placeholder="+ Add" onBlur={this.handleUpdate} onKeyUp={this.handleUpdate} value={txt} onChange={this.handleChange} />
                <button onClick={this.handleUpdate}>Add</button>
            </div>
        )
    }
}
