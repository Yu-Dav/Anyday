import React, { useState, useRef } from 'react'
import { utilService } from '../../services/utilService';
import { socketService } from '../../services/socketService';
import { userService } from '../../services/userService'

export const TaskAdd = (props) => {

    const [txt, setTxt] = useState('')
    const inputEl = useRef()

    const onAddTask = async ({ target }) => {
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

        const newBoard = { ...props.board }
        const groupId = props.group.id
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
                title: props.group.title
            }
        }
        if (!newBoard.groups[groupIdx].tasks || !newBoard.groups[groupIdx].tasks.length) newBoard.groups[groupIdx].tasks = [newTask]
        // else newBoard.groups[groupIdx].tasks.push(newTask)
        else newBoard.groups[groupIdx].tasks = [...newBoard.groups[groupIdx].tasks, newTask]
        newBoard.activities.unshift(newActivity)
        await props.updateBoard(newBoard)
        // console.log(`file: TaskAdd.jsx || line 47 || newBoard`, this.props.board)
        await socketService.emit('board updated', newBoard._id)
        setTxt('')
    }

    const handleUpdate = (ev) => {
        if (ev.key === 'Enter' || ev.type === 'blur') {
            onAddTask(ev)
        }
    }

    const handleChange = ({ target }) => {
        const { value } = target
        setTxt(value)
    }

    const onFocusInput = () => {
        inputEl.current.focus()
    }

    return (
        <div className="task-add flex" onClick={onFocusInput}>
            <div className="group-color" style={{ backgroundColor: props.group.style.bgColor }}></div>
            <input autoComplete="off" name="txt" type="text" placeholder="+ New Task"
                onBlur={handleUpdate} onKeyUp={handleUpdate} value={txt} onChange={handleChange} 
                ref={inputEl}/>
            <button className="add" onClick={handleUpdate}>Add</button>
        </div>
    )

}


