import React from 'react'
import { GroupPreview } from './GroupPreview'
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
// import { onSetFilter } from '../store/actions/boardActions'


export function GroupList({ groups, board, updateBoard, currUser, filterBy }) {
    console.log('filter in gl', filterBy)

    // getFiltered = (filterBy) => {
    //     let filteredBoard = { ...board }
    //     if (filterBy.status){
    //         filterdBoard= filteredBoard.filter((group)=>{
    //             return group.tasks.filter((task)=>{
    //                 return task.status.title === filterBy.status
    //             })
    //         })
    //     }
    //     return filteredBoard
    // }



    if (!groups || !groups.length) return <p>Loading...</p>
    return (
        // the group will be a filtered group
        < div className="groups-container">

            {groups.map((group, index) => <GroupPreview board={board} key={group.id} group={group}
                updateBoard={updateBoard} index={index} currUser={currUser} />)}


        </div>


    )
}


// function mapStateToProps(state) {
//     return {
//         filterBy: state.boardModule.filterBy,
//     }
// }

// export const GroupList = connect(mapStateToProps, null)( _GroupList)
