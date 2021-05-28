import React from 'react'
import {GroupPreview} from './GroupPreview'

export function GroupList({ groups, board }) {
    if (!groups || !groups.length) return <p>Loading...</p>
    return (
        <div className="groups-container">
                {groups.map(group => <GroupPreview board={board} key={group.id} group={group} />)}
        </div>
    )
}
