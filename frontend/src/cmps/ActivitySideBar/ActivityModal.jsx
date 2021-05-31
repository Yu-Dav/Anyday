import React, { Component } from 'react'
import { ActivityLog } from './ActivityLog'
import { EditableCmp } from '../EditableCmp'
import { Updates } from './Updates'


export class ActivityModal extends Component {

    state = {
        content: 'updates'
    }

    render() {
        const {content} = this.state
        return (
            <div className="activity-modal">
                <div className="flex">
                    <h1>title</h1>
                    <EditableCmp />
                    <span>avatars</span>
                </div>
                <div>
                    <span>Updates</span>
                    <span>Activity Log</span>
                </div>
                <div>
                    {content === 'updates' && <Updates/>}
                    {content === 'activity'&& <ActivityLog/>}
                </div>
            </div>
        )
    }
}