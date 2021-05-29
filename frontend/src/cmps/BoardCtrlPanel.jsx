
export function BoardCtrlPanel({ addNewGroup }) {
    return (
        <div className="board-ops">
            <button className="btn-add-group" onClick={addNewGroup}>New Group</button>
            {/* filter btn will change the state to open the Boardfilter cmp */}
            <button>Filter</button>
            {/* sort all groups by name */}
        </div>
    )

}
