import { Component } from 'react'
import { ReactComponent as FilterSvg } from '../assets/imgs/svg/filter.svg'
import { ReactComponent as SortSvg } from '../assets/imgs/svg/sort.svg'

import { BoardSearch } from '../cmps/BoardSearch'

export class BoardCtrlPanel extends Component {
    state = {
        isSearching: false
    }
    onSearchClicked = () => {
        this.setState({...this.state , isSearching: !this.state.isSearching})
    }
    render() {
        const { isSearching } = this.state
        return (
            <div className="board-ops flex ">
                {/* filter btn will change the state to open the Boardfilter cmp */}
                <button className="btn-add-group" onClick={this.props.addNewGroup}>New Group</button>

                <button onClick={this.onSearchClicked} className="btn-search "><i className="fas fa-board-search"></i> Search</button>

                {isSearching &&
                    <BoardSearch onSetFilter={this.props.onSetFilter} />
                }

                <button className="btn-filter"><FilterSvg /> Filter</button>
                <button className="btn-sort"><SortSvg /> Sort</button>
                {/* sort all groups by name */}
            </div>
        )

    }
}
