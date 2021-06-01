import React from 'react'

export function BoardFilterList({ field, onSetFilter, type }) {
    let { title } = field
    if (!title) title = 'Unassigned'
    return (
        <div onClick={() => onSetFilter(field, type)} className="filter-group-item">
            <span className="badge" style={{ backgroundColor: field.color }}></span>
            {title}
        </div>
    )
}
