import React, { Component } from 'react'

export class CellTag extends Component {
    render() {
        const { tags } = this.props.task
        return (
            <div>
                {tags.map(tag => {
                    return <p key={tag}>{tag}</p>
                })}
            </div>
        )
    }
}
