import { Component } from 'react'
import { ReactComponent as FilterSvg } from '../assets/imgs/svg/filter.svg'
import { ReactComponent as SortSvg } from '../assets/imgs/svg/sort.svg'

import { BoardSearch } from '../cmps/BoardSearch'
import { BoardFilter } from '../cmps/BoardFilter'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export class BoardCtrlPanel extends Component {
    state = {
        isSearching: false,
        isFiltering: false
    }
    onSearchClicked = () => {
        this.setState({ ...this.state, isSearching: !this.state.isSearching })
    }
    onFilterClicked = () => {
        this.setState({ ...this.state, isFiltering: !this.state.isFiltering })
    }
    handleFilterClickAway = () => {
        this.setState({ ...this.state, isFiltering: false })
    }
    render() {
        const { isSearching, isFiltering } = this.state
        return (
            <div className="board-ops flex ">
                {/* filter btn will change the state to open the Boardfilter cmp */}
                <button className="btn-add-group" onClick={this.props.addNewGroup}>New Group</button>

                <button onClick={this.onSearchClicked} className="btn-search "><i className="fas fa-board-search"></i> Search</button>
                {isSearching &&
                    <BoardSearch setFilter={this.props.setFilter} />
                }

                <ClickAwayListener onClickAway={this.handleFilterClickAway}>
                    <div>
                        <button onClick={this.onFilterClicked} className="btn-filter"><FilterSvg /> Filter</button>
                        {isFiltering &&
                            <BoardFilter board={this.props.board} loadBoard={this.props.loadBoard} setFilter={this.props.setFilter}></BoardFilter>
                        }
                    </div>
                </ClickAwayListener>


                <button className="btn-sort"><SortSvg /> Sort</button>
                {/* sort all groups by name */}
            </div>
        )

    }
}
