import React from 'react'

export function ActivityLog({task, board}) {

    function getTaskActivities(){
        return board.activities.filter(activity => activity.task.id === task.id)
    }

    return (
        <div>
           <h1>activities</h1>
           {!task && <div>
               {board.activities.map(activity => <div className="flex space-between">
                   <div>{activity.createdAt}</div><div>avatar</div><div>{activity.task.title}</div><div>{activity.type}</div><div>{activity.group.title}</div>
               </div> )}
               </div>}
           {task && <div>
               {getTaskActivities().map(activity=> <div className="flex space-between">
                   <div>{activity.createdAt}</div><div>avatar</div><div>{activity.task.title}</div><div>{activity.type}</div><div>{activity.group.title}</div>  
               </div>)}
               </div>}
        </div>
    )
}
