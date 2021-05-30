import React from 'react'
import { GroupHeader } from './GroupHeader'
import { TaskPreview } from '../tasks/TaskPreview'
import { TaskAdd } from '../tasks/TaskAdd'
import { SimplePopover } from '../SimplePopover'
import { Colors } from '../Colors'
import { Droppable } from 'react-beautiful-dnd';

// import {ReactComponent as dropDownArrow} from '../../assets/imgs/dropDownArrow.svg'

export function GroupPreview({ group, board, updateBoard }) {

    const newBoard = board
    const groupId = group.id
    const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)

    const onDeleteGroup = () => {
        newBoard.groups.splice(groupIdx, 1)
        updateBoard(newBoard)
    }

    const onChangeGroupColor = (ev) => {
        const { color } = ev.target.dataset
        newBoard.groups[groupIdx].style.bgColor = color
        updateBoard(newBoard)
    }

    const { tasks } = group
    const menu = <React.Fragment><div onClick={onDeleteGroup}>Delete group</div>
        <SimplePopover clickedEl={<div>Change group color</div>} content={<Colors onChangeGroupColor={onChangeGroupColor} />}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }} />

    </React.Fragment>

    return (

        <Droppable droppableId={group.id}>
            {provided => (
                <div className="group-container flex" >
                    {/* <dropDownArrow/> */}
                    <SimplePopover clickedEl="^" content={menu}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }} />
                    {/* <button onClick={handleClick}>^</button> */}

                    <div className="group-preview"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>

                        <GroupHeader group={group} board={board} updateBoard={updateBoard} />
                        {tasks.map((task, index) => <TaskPreview index={index} board={board} group={group} key={task.id} task={task} updateBoard={updateBoard} />)}
                        {provided.placeholder}
                        <TaskAdd board={board} group={group} updateBoard={updateBoard} />
                    </div>

                </div>
            )}
        </Droppable >




    )
}



