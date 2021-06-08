import React from 'react'
// import { CellTitle } from './CellTitle'
// import { CellMember } from './CellMember'
// import { CellTag } from './CellTag'
// import { CellStatus } from './CellStatus'
// import { CellPriority } from './CellPriority'
// import { CellCreationLog } from './CellCreationLog'
// import { CellDate } from './CellDate'
import { Draggable } from 'react-beautiful-dnd';
import { DynamicCell } from './DynamicCell'
import { socketService } from '../../services/socketService'
import { utilService } from '../../services/utilService'
import { userService } from '../../services/userService'
import { Snack } from './SnackBar'

// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

export function TaskPreview({ task, group, board, updateBoard, index }) {

    // const cellTypes = ['title', 'member', 'tag', 'status', 'priority', 'creationLog', 'timeline', 'location']
    // console.log(board.cellTypes);
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
                        {/* <span className="left-container flex"> */}
                        <div>
                            <Snack onRemoveTask={onRemoveTask}/>                            
                        </div>
                        <div className="group-color" style={{ backgroundColor: group.style.bgColor }}></div>
                        {/* <CellTitle task={task} group={group} board={board} updateBoard={updateBoard} /> */}
                        {/* </span> */}
                        {board.cellTypes.map(cellType => <DynamicCell type={cellType} task={task} group={group} board={board} updateBoard={updateBoard} />)}
                                                           {/* adding key to the map above causes an error... why? */}                          
                        {/* <CellMember task={task} group={group} board={board} updateBoard={updateBoard} />
                        <CellTag task={task} group={group} board={board} updateBoard={updateBoard} />
                        <CellStatus task={task} group={group} board={board} updateBoard={updateBoard} />
                        <CellPriority task={task} group={group} board={board} updateBoard={updateBoard} />
                        <CellCreationLog task={task} />
                        <CellDate task={task} group={group} board={board} updateBoard={updateBoard} /> */}
                    </div>
                )}
            </Draggable>
            
        </React.Fragment>
    )
}

//old task preview
// export function TaskPreview({ task, group, board, updateBoard, index }) {
//     const cellTypes = ['title', 'member', 'tag', 'status', 'priority', 'creationLog', 'timeline', 'location']
//     return (
//         <React.Fragment>
//             <Draggable draggableId={task.id} index={index} type="task">
//                 {provided => (
//                     <div className="task-row flex"
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}>
//                         <span className="left-container flex">
//                             <div className="group-color" style={{ backgroundColor: group.style.bgColor }}></div>
//                             <CellTitle task={task} group={group} board={board} updateBoard={updateBoard} />
//                         </span>
//                         <CellMember task={task} group={group} board={board} updateBoard={updateBoard} />
//                         <CellTag task={task} group={group} board={board} updateBoard={updateBoard} />
//                         <CellStatus task={task} group={group} board={board} updateBoard={updateBoard} />
//                         <CellPriority task={task} group={group} board={board} updateBoard={updateBoard} />
//                         <CellCreationLog task={task} />
//                         <CellDate task={task} group={group} board={board} updateBoard={updateBoard} />
//                     </div>
//                 )}
//             </Draggable>
//         </React.Fragment>
//     )
// }