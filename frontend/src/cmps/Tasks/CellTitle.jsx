import React from 'react'
import { Link } from 'react-router-dom'
import { EditableCmp } from '../EditableCmp'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'
// import { Snack } from './SnackBar'


export function CellTitle ({board,group, task,updateBoard, onRemoveTask}) {
   const onUpdateTaskTitle = async ({ target }) => {
        const value = target.innerText
        const newBoard = { ...board }
        const groupId = group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const taskId = task.id
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        const updatedTask = { ...task, title: value }
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
        updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
    }
   
        const { title, id } = task
        const className = task.comments.length ? 'fa comment active': 'fa comment'
        return (
            <div className="cell title flex">
                {/* <Snack onRemoveTask={onRemoveTask}/> */}
                <i className="fas fa-trash remove-task" onClick={()=>onRemoveTask()}></i>
                <EditableCmp className="cell-title-editable" name="title" value={title} updateFunc={onUpdateTaskTitle} />
                <Link to={`/board/${board._id}/${group.id}/${id}`}><i className={className}></i></Link>
            </div>
        )
    
}
