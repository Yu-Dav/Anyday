import React from 'react'
import {GroupPreview} from './GroupPreview'

export function GroupList({ groups }) {
    if (!groups || !groups.length) return <p>Loading...</p>
    return (
        <div className="groups-container">
                {groups.map(group => <GroupPreview key={group.id} group={group} />)}
        </div>
    )
}
