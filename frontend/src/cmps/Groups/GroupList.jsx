import React from 'react'
import { GroupPreview } from './GroupPreview'
import { Droppable } from 'react-beautiful-dnd';

export function GroupList({ groups, board, updateBoard, currUser }) {

  


    if (!groups || !groups.length) return <p>No tasks to display</p>
    return (

        // Droppable here - as all groups are draggable. id doesn't matter much as it won't interact with others. type="group"

        < div className="groups-container">

            { board.groups.map((group, index) => <GroupPreview board={board} key={group.id} group={group}
                updateBoard={updateBoard} index={index} currUser={currUser} />)}


        </div>


    )
}


// const filteredBoard = useMemo(() => {
//     const boardCopy = JSON.parse(JSON.stringify(board))
//     if (filterBy) {
//         if (filterBy.status.length) {
//             boardCopy.groups = boardCopy.groups.filter(group => {
//                 const filteredCards = group.cards.filter(card => {
//                     const status = filterBy.status.find(label => {
//                         return card.status.text === label
//                     });
//                     if (!status) return false
//                     return true
//                 })
//                 if (filteredCards.length) {
//                     group.cards = filteredCards
//                     return true
//                 }
//                 return false
//             })
//         }
//         if (filterBy.priority.length) {
//             boardCopy.groups = boardCopy.groups.filter(group => {
//                 const filteredCards = group.cards.filter(card => {
//                     const priority = filterBy.priority.find(label => {
//                         return card.priority.text === label
//                     });
//                     if (!priority) return false
//                     return true
//                 })
//                 if (filteredCards.length) {
//                     group.cards = filteredCards
//                     return true
//                 }
//                 return false
//             })
//         }
//         if (filterBy.membersId.length) {
//             boardCopy.groups = boardCopy.groups.filter(group => {
//                 const filteredCards = group.cards.filter(card => {
//                     const member = card.members.find(memberId => {
//                         return (filterBy.membersId.includes(memberId))
//                     })
//                     if (!member) return false
//                     return true
//                 })
//                 if (filteredCards.length) {
//                     group.cards = filteredCards
//                     return true
//                 }
//                 return false
//             })
//         }
//         if (filterBy.sortBy && !onDrag) {
//             if (filterBy.sortBy === 'name') boardCopy.groups = boardService.sortByTitle(boardCopy.groups)
//             else boardCopy.groups = boardService.sortByDate(boardCopy.groups)
//         }
//         const filterRegex = new RegExp(filterBy.txt, 'i');
//         boardCopy.groups = boardCopy.groups.filter(group => {
//             const filteredCards = group.cards.filter(card => filterRegex.test(card.title))
//             if (filteredCards.length) {
//                 group.cards = filteredCards
//                 return true
//             } else return false
//                 || filterRegex.test(group.title)
//         })
//     }
//     return boardCopy
// }, [filterBy, board])