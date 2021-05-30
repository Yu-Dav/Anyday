import React, { Component } from 'react'

export class CellTag extends Component {
    state = {
        isExpanded: false
    }

    handleUpdate = ({ target }) => {
        const selectedTag = this.getTagById(target.dataset.tag)
        console.log('selectedtag',selectedTag)
        this.props.task.tags.unshift(selectedTag) 
        const newBoard = { ...this.props.board }
        // newBoard.priority = newPriority
        this.props.updateBoard(newBoard) //updating the entire board
    }

    getTagById= (tagId) => {
        const availableTags = this.props.board.tags
        return availableTags.find(tag => tag.id === tagId)
    }

    onOpenSelector = () => {
        this.setState({ ...this.state, isExpanded: !this.state.isExpanded })
    }

    render() {
        const { tags } = this.props.task
        const { isExpanded } = this.state
        const availableTags = this.props.board.tags
        // console.log('available tags', availableTags)
        return (
            <div className="cell tags" >
                {tags.map((tag) => {
                    return <p style={{ color: tag.color }} key={tag.id} onClick={this.onOpenSelector}>{tag.title} </p>
                })}
                {isExpanded &&
                    <div className="tag-options">
                        {availableTags.map((tag) => {
                            return <div className="tag-option" onClick={this.handleUpdate}
                                key={tag.id} data-tag={tag.id} style={{ color: tag.color }}>
                                {tag.title}

                            </div>
                        })}
                    </div>
                }
            </div>
        )
    }
}
