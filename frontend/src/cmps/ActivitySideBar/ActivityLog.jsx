import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import TimeAgo from 'react-timeago'

export function ActivityLog({ task, board }) {

    function getTaskActivities() {
        return board.activities.filter(activity => activity.task && (activity.task.id === task.id))
    }

    console.log(board)
    if (!board.activities) return <div>No activities to display</div>
    return (
        <div className="activities">
            {!task && <div>
                {board.activities.map(activity => <div key={activity.id} className="activity-preview flex align-center">
                    <div className="time"><TimeAgo date={activity.createdAt} minPeriod={10} /></div>
                    <Avatar alt={activity.byMember.username} src={activity.byMember.imgUrl} style={{ width: '30px', height: '30px', display: 'inline-block' }} />
                    {!activity.task && <div className="title">{activity.group.title}</div>}
                    {activity.task && <div className="title">{activity.task.title}</div>}
                    <div className="type">{activity.type}</div>
                    <div className="item">{activity.task && activity.task.changedItem && <span>{activity.task.changedItem}</span>}</div>
                    {!activity.task && <div className="group"></div>}
                    {activity.task && <div className="group">{activity.group.title}</div>}
                </div>)}
            </div>}
            {task && <div>
                {getTaskActivities().map(activity => <div key={activity.id} className="activity-preview flex align-center">
                    <div className="time"><TimeAgo date={activity.createdAt} minPeriod={10} /></div>
                    <Avatar alt={activity.byMember.username} src={activity.byMember.imgUrl} style={{ width: '30px', height: '30px', display: 'inline-block' }} />
                    {!activity.task && <div className="title">{activity.group.title}</div>}
                    {activity.task && <div className="title">{activity.task.title}</div>}
                    <div className="type">{activity.type}</div>
                    <div className="item">{activity.task && activity.task.changedItem && <span>{activity.task.changedItem}</span>}</div>
                    {!activity.task && <div className="group"></div>}
                    {activity.task && <div className="group">{activity.group.title}</div>}
                </div>)}
            </div>}
        </div>
    )
}
