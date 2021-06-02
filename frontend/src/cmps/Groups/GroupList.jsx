import React from 'react'
import { GroupPreview } from './GroupPreview'
import { Droppable } from 'react-beautiful-dnd';

export function GroupList({ groups, board, updateBoard, currUser }) {


    if (!groups || !groups.length) return <p>Loading...</p>
    return (

        // Droppable here - as all groups are draggable. id doesn't matter much as it won't interact with others. type="group"

        < div className="groups-container">

            {groups.map((group, index) => <GroupPreview board={board} key={group.id} group={group}
                updateBoard={updateBoard} index={index} currUser={currUser} />)}


        </div>


    )
}
