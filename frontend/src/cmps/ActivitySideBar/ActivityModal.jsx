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

    componentDidMount() {
        this.loadTask()
    }

    loadTask = async () => {
        const taskId = this.props.match.params.taskId
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

    onUpdateTask = (updatedTask)=>{
        const { currBoard } = this.props
        const newBoard = { ...this.props.currBoard }
        const taskId = this.props.match.params.taskId
        const groupId = this.props.match.params.groupId
        const groupIdx = newBoard.groups.findIndex(group => group.id === groupId)
        const group = currBoard.groups.find(group => group.id === groupId)
        const taskIdx = group.tasks.findIndex(task => task.id === taskId)
        newBoard.groups[groupIdx].tasks.splice(taskIdx, 1, updatedTask)
        this.props.updateBoard(newBoard)
    }

    render() {
        const { content, task } = this.state
        const { currBoard } = this.props
        if (!task) return <div className="activity-modal">loading</div>
        return (
            <div className="activity-modal">
                <div onClick={() => window.location.hash = `/board/${currBoard._id}`}>X</div>
                <div className="flex">
                    <h1>title</h1>
                    <EditableCmp value={task.title} updateFunc={this.onUpdateTaskTitle}/>
                    <span>avatars</span>
                </div>
                <div>
                    <span onClick={() => { this.setState({ ...this.state, content: 'updates' }) }}>Updates</span>
                    <span onClick={() => { this.setState({ ...this.state, content: 'activity' }) }}>Activity Log</span>
                </div>
                <div>
                    {content === 'updates' && <Updates task={task} onUpdateTask={this.onUpdateTask}/>}
                    {content === 'activity' && <ActivityLog task={task} />}
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