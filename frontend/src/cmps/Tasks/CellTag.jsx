import React, { Component } from 'react'
import { TagAddNew } from './TagAddNew'
import { ClickAwayListener } from '@material-ui/core'
import { socketService } from '../../services/socketService'



export class CellTag extends Component {
    state = {
        isExpanded: false
    }

    handleUpdate = async({ target }) => {
        const selectedTag = this.getTagById(target.dataset.tag)
        this.props.task.tags.unshift(selectedTag)
        const newBoard = { ...this.props.board }
        await this.props.updateBoard(newBoard) //updating the entire board
        await socketService.emit('board updated', newBoard._id);
        this.setState({...this.state, isExpanded:false})

    }

    update =  async (event, tag) => {
        const availableTags = this.props.board.tags
        const { task, board, updateBoard } = this.props
        //CREATE
        let selectedTag;
        if (!event) {
            selectedTag = tag
            availableTags.unshift(tag)
        } else {
            // UPDATE
            selectedTag = this.getTagById(event.target.dataset.tag)
        }
        task.tags.unshift(selectedTag)
        const newBoard = { ...board }
        await updateBoard(newBoard)
        this.setState({...this.state, isExpanded:false})
    }

    addNewTag = (tag) => {
        this.update(null, tag)
    }

    getTagById = (tagId) => {
        const availableTags = this.props.board.tags
        return availableTags.find(tag => tag.id === tagId)
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    
    handleClickAway = () => {
        this.setState({ ...this.state, isExpanded: false })
    }

    onRemoveTag = async (ev) => {
        // const availableTags = this.props.board.tags
        const tags = this.props.task.tags
        if (!tags) return
        ev.stopPropagation()
        const tagId = ev.target.dataset.tag
        const tagIdx = tags.findIndex(tag => tag.id === tagId)
        tags.splice(tagIdx, 1)
        const newBoard = { ...this.props.board }
        await this.props.updateBoard(newBoard)
    }

    getOtherTags = () => {
        const availableTags = this.props.board.tags
        let taskTags = this.props.task.tags
        var otherTags = availableTags.filter(x => {
            let elementsOfArray2PresentInArray1 = taskTags.filter(y => {
                return y.id === x.id
            });
            if (elementsOfArray2PresentInArray1.length > 0) {
                return false
            } else {
                return true;
            }
        });
        return otherTags
    }


    render() {
        const { tags } = this.props.task
        const { isExpanded } = this.state
        const { board } = this.props
        return (
            <ClickAwayListener  onClickAway={this.handleClickAway}>
                <div className="cell-tag-container flex justify-center" >
                    {tags.map((tag) => {
                        return <span className="tag-container" style={{ color: tag.color }} key={tag.id} onClick={this.onOpenSelector}>{tag.title} </span>
                    })}
                    {isExpanded &&
                        <div className="tag-options fade-in">
                            <TagAddNew addNewTag={this.addNewTag} board={board} />
                            {tags.map((tag) => {
                                return <div className="tag-option"
                                    key={tag.id} data-tag={tag.id} style={{
                                        color: tag.color, display: "flex", fontSize: "13px",
                                        justifyContent: "space-between"
                                    }}>
                                    {tag.title} <i data-tag={tag.id} onClick={this.onRemoveTag}
                                        className="fas close"></i>
                                </div>
                            })}
                            <hr></hr>
                            {this.getOtherTags().map((tag) => {
                                return <div className="tag-option" onClick={this.handleUpdate}
                                    key={tag.id} data-tag={tag.id} style={{
                                        color: tag.color, display: "flex", fontSize: "13px",
                                        justifyContent: "space-between"
                                    }}>
                                    {tag.title}
                                </div>
                            })}
                        </div>
                    }
                </div>
            </ClickAwayListener>
        )
    }
}




