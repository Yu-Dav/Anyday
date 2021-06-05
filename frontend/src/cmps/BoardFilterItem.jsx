import React from 'react'

export function BoardFilterItem({ field, onSetFilter, type, filterBy }) {
    // console.log(field);
    let title
    let item
    if (type === 'status' || type === 'priority') {
        title = field.title
        item = field.title
    } else if (type === 'tag') {
        title = field.title
        item = field.title
    } else {
        title = field.username
        item = field._id
    }
    // if (!title) title = 'Unassigned'
    const className = filterBy.includes(item) ? "filter-group-item selected" : "filter-group-item"
    return (
        <div onClick={() => onSetFilter(type, item)} className={className}>
            <span className="badge" style={{ backgroundColor: field.color }}></span>
            {title}
        </div>
    )
}