import React, { Component } from 'react'
import { ActivityLog } from './ActivityLog'
import { EditableCmp } from '../EditableCmp'
import { Updates } from './Updates'
// import { boardService } from '../../services/boardService.js'
import { connect } from 'react-redux'
import { loadBoard, updateBoard } from '../../store/actions/boardActions'

export class _ActivityModal extends Component {

    state = {
        task: null,
        content: 'updates'
    }

    async componentDidMount() {
        const boardId = 'b101'
        await this.props.loadBoard(boardId)
        const taskId = this.props.match.params.taskId
        if (!taskId) return
        this.loadTask(taskId)
    }

    loadTask = async (taskId) => {
        const groupId = this.props.match.params.groupId
        const { currBoard } = this.props
        console.log('props', this.props);
        const group = currBoard.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        // console.log('board', board);
        // console.log('task', task);
        this.setState({ task });

    }

    onUpdateTaskTitle = ({ target }) => {
        const value = target.innerText
        if (!value) value = 'New task'
        const updatedTask = { ...this.state.task, title: value }
        this.onUpdateTask(updatedTask)
    }

    onUpdateTask = (updatedTask, groupId = null) => {
        const { currBoard } = this.props
        const newBoard = { ...this.props.currBoard }
        const taskId = this.props.match.params.taskId
        if(!groupId) groupId = this.props.match.params.groupId
        console.log(groupId, newBoard);
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const group = newBoard.groups.find(group => group.id === groupId)
        console.log(group);
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1, updatedTask)
        this.props.updateBoard(newBoard)
    }

    render() {
        const { content, task } = this.state
        const { currBoard } = this.props
        // if (!task) return <div className="activity-modal">loading</div>
        return (
            <div className="activity-modal">
                <div onClick={() => window.location.hash = `/board/${currBoard._id}`}>X</div>
                {!task && <div><h2>{currBoard.title}</h2></div>}
                {task &&
                    <div className="flex">
                        <EditableCmp value={task.title} updateFunc={this.onUpdateTaskTitle} />
                        <span>avatars</span>
                    </div>}
                <div>
                    <span onClick={() => { this.setState({ ...this.state, content: 'updates' }) }}>Updates</span>
                    <span onClick={() => { this.setState({ ...this.state, content: 'activity' }) }}>Activity Log</span>
                </div>
                <div>
                    {content === 'updates' && <Updates task={task} board={currBoard} onUpdateTask={this.onUpdateTask} />}
                    {content === 'activity' && <ActivityLog task={task} board={currBoard} />}
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

export const ActivityModal = connect(mapStateToProps, mapDispatchToProps)(_ActivityModal)