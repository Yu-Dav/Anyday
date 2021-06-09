import React from 'react'
import { GroupPreview } from './GroupPreview'
import loader from '../../assets/imgs/loader.gif'

export function GroupList({ groups, board, updateBoard, currUser, setMap}) {
console.log(groups);
    if (!groups || !groups.length) return <div className="loader-no-groups">
        {/* <h1>Loading tasks</h1> */}
        <img src={loader} alt="Loader" />
        </div>
    return (
        < div className="groups-container wrapper">
            {groups.map((group, index) => <GroupPreview board={board} key={group.id} group={group}
                updateBoard={updateBoard} index={index} currUser={currUser} setMap={setMap}/>)}
        </div>
    )
}


