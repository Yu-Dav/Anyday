import React, { Component } from 'react'
import { ActivityLog } from './ActivityLog'
import { EditableCmp } from '../EditableCmp'
import { Updates } from './Updates'
import { boardService } from '../../services/boardService.js'
import { connect } from 'react-redux'
import { loadBoard, updateBoard } from '../../store/actions/boardActions'

class _ActivityModal extends Component {

    state = {
        task: null,
        content: 'updates'
    }

    componentDidMount() {
        // console.log('mounted');
        // this.loadTask()
        // console.log('mounted!');
    }

    loadTask = async () =>{
        const taskId = this.props.match.params.taskId;
        if(!taskId) return
        const boardId = this.props.match.params.boardId;
        console.log(taskId, boardId);
        const board = await this.props.loadBoard(boardId)
        const task = this.getKeyById(board, taskId)
        console.log('board', board);
        console.log('task', task);
        this.setState({ task });

    }

    getKeyById(source, target) {

        const sourceSet = new Set()
        return findTarget(source, target)

        function findTarget(source, target) {


            if (!source) {
                sourceSet.clear()
                return
            }

            if (sourceSet.has(source)) {

                sourceSet.clear()
                return
            }

            sourceSet.add(source)

            if (Array.isArray(source)) {
                for (let arrayItem of source) {
                    const value = findTarget(arrayItem, target);
                    if (value) return value
                }
            } else if (typeof source === 'object') {
                for (let key of Object.keys(source)) {
                    if (source[key] === target) {
                        return source
                    } else if (typeof source[key] === 'object' || Array.isArray(source[key])) {
                        const value = findTarget(source[key], target)
                        if (value) return value
                    }
                }
            }
        }


    }


    render() {
        const { content, task } = this.state
        
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
                    {content === 'updates' && <Updates task={task} />}
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