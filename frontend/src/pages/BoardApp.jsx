import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { utilService } from '../services/utilService'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { connect } from 'react-redux'
import { SidebarNav } from '../cmps/SidebarNav.jsx'
import { SidebarApp } from '../cmps/SidebarApp.jsx'
import { BoardHeader } from '../cmps/BoardHeader'

import { BoardCtrlPanel } from '../cmps/BoardCtrlPanel'
import { loadBoard, updateBoard } from '../store/actions/boardActions'
import { GroupList } from '../cmps/groups/GroupList'
import { ActivityModal } from '../cmps/ActivitySideBar/ActivityModal';
// import { MenuListComposition } from '../cmps/MenuCmp'
// import { ChipCmp } from '../cmps/ChipCmp';


class _BoardApp extends Component {

    componentDidMount() {
        const boardId = 'b101'  //later from params
        this.props.loadBoard(boardId)
    }

    addNewGroup = () => {
        const newBoard = { ...this.props.currBoard }
        const newGroup = {
            id: utilService.makeId(),
            style: { bgColor: '#26de81' },
            title: 'New Group',
            tasks: [],
        }
        newBoard.groups.unshift(newGroup)
        this.props.updateBoard(newBoard)
    }
    
    onDragEnd = result => {
        const { destination, source, draggableId, type } = result;
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return
        if (type === 'task') {
            const sourceGroup = this.props.currBoard.groups.find(group => group.id === source.droppableId);
            const destinationGroup = this.props.currBoard.groups.find(group => group.id === destination.droppableId);
            const task = sourceGroup.tasks.find(task => task.id === draggableId)
            sourceGroup.tasks.splice(source.index, 1);
            destinationGroup.tasks.splice(destination.index, 0, task);
            // const copyGroup = { ...this.props.currBoard };
            // this.props.updateBoard(copyGroup);
            // return
        }
        if (type === 'group') {
            // console.log(`file: BoardApp.jsx || line 35 || result`, result);
            // console.log('props.currBoard =', this.props.currBoard);
            const { currBoard } = this.props;
            const sourceGroup = this.props.currBoard.groups.find(group => group.id === draggableId);
            // console.log(`file: BoardApp.jsx || line 53 || sourceGroup`, sourceGroup);
            currBoard.groups.splice(source.index, 1);
            currBoard.groups.splice(destination.index, 0, sourceGroup)
        }
        const copyGroup = { ...this.props.currBoard };
        this.props.updateBoard(copyGroup);
    }

    onSetFilter = (filterBy) => {
        console.log('filterBy' , filterBy)
        // this.props.loadBoard(filterBy)
    }

    render() {
        const { currBoard } = this.props
        return (
            <div className="board-app-container flex">
                <SidebarApp />
                <SidebarNav />
                <div className="container board-container">
                    <BoardHeader board={this.props.currBoard} updateBoard={this.props.updateBoard} />
                    <BoardCtrlPanel addNewGroup={this.addNewGroup} onSetFilter={this.onSetFilter} />

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="all-groups" type="group">
                            {provided => (

                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} >
                                    <GroupList

                                        board={currBoard} groups={currBoard.groups} key={currBoard._id} updateBoard={this.props.updateBoard} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* <Route component={ActivityModal} path="/board/:boardId/tasks/:taskId" /> */}
                    {/* <Route path={`${this.props.match.path}/task/:taskId`} render={(props) => {
                        return <ActivityModal board={currBoard} {...props} />
                    }} /> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        currBoard: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy
    }
}

const mapDispatchToProps = {
    loadBoard,
    updateBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)