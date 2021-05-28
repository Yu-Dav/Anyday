
export function BoardCtrlPanel({ addNewGroup }) {
    return (
        <div>
            Board controllers
            <button onClick={addNewGroup}>Add new group</button>
            {/* filter btn will change the state to open the Boardfilter cmp */}
            <button>Filter</button>
            {/* sort all groups by name */}
        </div>
    )

}
