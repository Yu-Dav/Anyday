import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';

export class CellCreationLog extends Component {
    getTime(timestamp) {
        const options = { day: 'numeric', month: 'long', };
        const date = new Date(timestamp).toLocaleDateString('en-UK', options)
        let time = new Date(timestamp).toLocaleTimeString('en-UK')
        time = time.slice(0, 5)
        return date
    }
    render() {
        const { createdAt, byMember } = this.props.task
        const date = this.getTime(createdAt)
        return (
            <div className="cell creation-log">
                <div className="flex justify-center align-center">
                    <Avatar key={byMember._id} alt={byMember.username} 
                    src={byMember.imgUrl} style={{ width:'25px', height:'25px', display: 'inline-block' }}/>  {date}</div>
                {/* change to named date+ username to avatar */}
            </div>
        )
    }
}
