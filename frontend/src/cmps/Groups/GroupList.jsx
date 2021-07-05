import React from 'react'
import { GroupPreview } from './GroupPreview'
import loader from '../../assets/imgs/loader.gif'

export function GroupList({ groups, board, updateBoard, currUser, setMap}) {
console.log('groups in group list', groups);
    if (!groups) return <div className="loader-no-groups">
        <img src={loader} alt="Loader" />
        </div>
       if (!groups.length) return <div>No tasks to display</div>
    return (
        < div className="groups-container wrapper">
            <div className="hide-lines"></div>
            {groups.map((group, index) => <GroupPreview board={board} key={group.id} group={group}
                updateBoard={updateBoard} index={index} currUser={currUser} setMap={setMap}/>)}
        </div>
    )
}


