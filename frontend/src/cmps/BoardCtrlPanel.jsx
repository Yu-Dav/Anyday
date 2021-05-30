import { ReactComponent as FilterSvg } from '../assets/imgs/svg/filter.svg'
import { ReactComponent as SortSvg } from '../assets/imgs/svg/sort.svg'

export function BoardCtrlPanel({ addNewGroup }) {

    return (
        <div className="board-ops">
            <button className="btn-add-group" onClick={addNewGroup}>New Group</button>
            {/* filter btn will change the state to open the Boardfilter cmp */}
            <button className="btn-filter"><FilterSvg/> Filter</button>
            <button className="btn-sort"><SortSvg/> Sort</button>
            {/* sort all groups by name */}
        </div>
    )

}
