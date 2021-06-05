import { Component } from 'react'
import { ReactComponent as FilterSvg } from '../assets/imgs/svg/filter.svg'
import { ReactComponent as SortSvg } from '../assets/imgs/svg/sort.svg'
import { BoardSearch } from '../cmps/BoardSearch'
import { BoardFilter } from '../cmps/BoardFilter'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

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

                <button onClick={this.onSearchClicked} className="btn-search flex align-center "> <SearchIcon></SearchIcon>Search</button>
                {isSearching &&
                    <BoardSearch setFilter={this.props.setFilter} />
                }

                <ClickAwayListener onClickAway={this.handleFilterClickAway}>
                    <div>
                        <button onClick={this.onFilterClicked} className="btn-filter flex align-center"><FilterSvg /> <p>Filter</p></button>
                        {isFiltering &&
                            <BoardFilter board={this.props.board} loadBoard={this.props.loadBoard} setFilter={this.props.setFilter}></BoardFilter>
                        }
                    </div>
                </ClickAwayListener>


                <button className="btn-sort flex align-center"><SortSvg /> <p>Sort</p></button>
                {/* sort all groups by name */}

                <div className="right-ctrl flex">
                    <button onClick={this.props.onChangeView} className="btn-map flex align-center"><LocationOnOutlinedIcon />Map</button>
                    <button onClick={this.props.onChangeView} className="btn-board flex align-center"><TableChartOutlinedIcon />Board</button>
                </div>
            </div>
        )

    }
}
