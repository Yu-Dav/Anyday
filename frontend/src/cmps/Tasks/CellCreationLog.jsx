import React from 'react'
import Avatar from '@material-ui/core/Avatar';

export function CellCreationLog({ task }) {
    const getTime = (timestamp) => {
        const options = { day: 'numeric', month: 'long', };
        const date = new Date(timestamp).toLocaleDateString('en-UK', options)
        let time = new Date(timestamp).toLocaleTimeString('en-UK')
        time = time.slice(0, 5)
        return date
    }

    const { createdAt, byMember } = task
    const date = getTime(createdAt)
    return (
        <div className="cell creation-log">
            <div className="flex justify-center align-center">
                <Avatar key={byMember._id} alt={byMember.username}
                    src={byMember.imgUrl} style={{ width: '25px', height: '25px', display: 'inline-block', marginRight: '10px' }} />  {date}</div>
        </div>
    )

}
