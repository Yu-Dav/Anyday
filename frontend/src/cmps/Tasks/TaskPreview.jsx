import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { DynamicCell } from './DynamicCell'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'



export const TaskPreview= ({ task, group, board, updateBoard, index, setMap }) =>{

    const onRemoveTask = async () => {
        const newBoard = { ...board }
        const groupId = group.id
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const taskId = task.id
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        const newActivity = {
            id: utilService.makeId(),
            type: 'Task deleted',
            createdAt: Date.now(),
            byMember: userService.getLoggedinUser(),
            task: {
                id: taskId,
                title: task.title
            },
            group: {
                id: groupId,
                title: group.title
            }
        }

        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
        newBoard.activities.unshift(newActivity)
        await updateBoard(newBoard)
        await socketService.emit('board updated', newBoard._id);
    }

    return (
        <React.Fragment>
            <Draggable draggableId={task.id} index={index} type="task">
                {provided => (
                    <div className="task-row flex"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <div className="group-color" style={{ backgroundColor: group.style.bgColor }}></div>
                        {board.cellTypes.map((cellType, index) => <DynamicCell onRemoveTask={onRemoveTask} key={index} type={cellType} task={task} group={group} board={board} updateBoard={updateBoard} setMap={setMap}/>)}
                                                           {/* adding key to the map above causes an error... why? */}                          
                    </div>
                )}
            </Draggable>
            
        </React.Fragment>
    )
}

