import React from 'react'
import { GroupPreview } from './GroupPreview'
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
// import { onSetFilter } from '../store/actions/boardActions'


export function GroupList({ groups, board, updateBoard, currUser, filterBy }) {

    onSetFilter(filterBy)

    function onSetFilter(filterBy) {
        if (!groups) return
        let copyGroups = [...groups]
        const test = []
        if (filterBy.status) {
            copyGroups.filter(group => {
                group.tasks.some(task => {
                    filterBy.status.forEach(status => {
                        if (task.status.title === status) {
                            test.push(task.id)
                        }
                    })

                })
            })


            // var otherMembers = copyGroups.filter(groups => {
            //     let filteredArr = test.filter(filteredTask => {
            //         return filteredTask === boardMem._id
            //     });
            //     if (filteredArr.length > 0) return false
            //     return true
            //`return !length;` will  return false if length > 0
            // });



            // return otherMembers



            // copyGroups.filter(group => {
            //     group.tasks.filter(task => {
            //         return test.some(test => {
            //             test === task.id
            //         })

            //     })
            // })
            // .map(group => {
            //     let newGroup = Object.assign({}, group); // copies element
            //     return newGroup.tasks.filter(task => task.title === '1');
            // })
        }
        // console.log('copyGroups =', copyGroups)
        console.log('test =', test)
        return copyGroups
    }

    if (!groups || !groups.length) return <p>Loading...</p>
    return (
<<<<<<< HEAD
        // the group will be a filtered group
        < div className="groups-container wrapper">

=======
        < div className="groups-container">
>>>>>>> 5b797075ea20024de826d889ad0340e0c8a54b62
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
