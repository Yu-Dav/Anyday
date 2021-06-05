import React from 'react'
import { GroupPreview } from './GroupPreview'
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
// import { onSetFilter } from '../store/actions/boardActions'

export function GroupList({ groups, board, updateBoard, currUser}) {
        // window.addEventListener('scroll', this.handleScroll);


    if (!groups || !groups.length) return <p>No tasks for display...</p>
    return (
        // the group will be a filtered group
        < div className="groups-container wrapper">

            {groups.map((group, index) => <GroupPreview board={board} key={group.id} group={group}
                updateBoard={updateBoard} index={index} currUser={currUser} />)}
        </div>
    )
}


