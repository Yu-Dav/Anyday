import React from 'react'

export function BoardFilterItem({ field, setFilter, type, filterBy }) {
    // console.log(filterBy);
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
    const className = filterBy?.includes(item) ? "filter-group-item selected" : "filter-group-item"
    return (
        <div onClick={() => setFilter(type, item)} className={className}>
          {field.color &&  <span className="badge" style={{ backgroundColor: field.color }}></span>} 
            {title}
        </div>
    )
}
