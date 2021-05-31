import { ReactComponent as FilterSvg } from '../assets/imgs/svg/filter.svg'
import { ReactComponent as SortSvg } from '../assets/imgs/svg/sort.svg'

import {BoardSearch} from '../cmps/BoardSearch'

export function BoardCtrlPanel({ addNewGroup, onSetFilter }) {

    return (
        <div className="board-ops">
            <button className="btn-add-group" onClick={addNewGroup}>New Group</button>
            <BoardSearch onSetFilter={onSetFilter}/>
            {/* filter btn will change the state to open the Boardfilter cmp */}
            <button className="btn-filter"><FilterSvg/> Filter</button>
            <button className="btn-sort"><SortSvg/> Sort</button>
            {/* sort all groups by name */}
        </div>
    )

}
