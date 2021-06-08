import { Component } from 'react'
import { ReactComponent as FilterSvg } from '../assets/imgs/svg/filter.svg'
// import { ReactComponent as SortSvg } from '../assets/imgs/svg/sort.svg'
import { BoardSearch } from '../cmps/BoardSearch'
import { BoardFilter } from '../cmps/BoardFilter'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import { onSetFilter } from '../store/actions/boardActions';

export class BoardCtrlPanel extends Component {
    state = {
        isSearching: false,
        isFiltering: false,
        view: 'board-view'
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
        const { isSearching, isFiltering, view } = this.state
        return (
            <div className="board-ops flex space-between ">
                <div className="left-ctrl flex">
                    {/* filter btn will change the state to open the Boardfilter cmp */}
                    <button className="btn-add-group" onClick={this.props.addNewGroup}>New Group</button>

                    <button onClick={this.onSearchClicked} className="btn-search flex align-center "> <SearchIcon></SearchIcon>Search</button>
                    {isSearching &&
                        <BoardSearch filterBoard={this.props.filterBoard}/>
                    }

                    <ClickAwayListener onClickAway={this.handleFilterClickAway}>
                        <div>
                            <button onClick={this.onFilterClicked} className="btn-filter flex align-center"><FilterSvg /> <p>Filter</p></button>
                            {isFiltering &&
                                <BoardFilter board={this.props.board} loadBoard={this.props.loadBoard} filterBoard={this.props.filterBoard}></BoardFilter>
                            }
                        </div>
                    </ClickAwayListener>

                {/* <button className="btn-sort flex align-center"><SortSvg /> <p>Sort</p></button> */}
                </div>
                <div className="right-ctrl flex">
                    <div className={view === 'board-view' ? 'view active flex align-center' : 'view flex align-center'} onClick={(ev) => {
                        this.props.onChangeView(ev)
                        this.setState({ ...this.state, view: 'board-view' })
                    }} ><TableChartOutlinedIcon />Board</div>
                    <div className={view === 'map-view' ? 'view active flex align-center' : 'view flex align-center'} onClick={(ev) => {
                        this.props.onChangeView(ev)
                        this.setState({ ...this.state, view: 'map-view' })
                    }} >
                        <LocationOnOutlinedIcon />Map
                    </div>

                </div>
            </div>
        )

    }
}


// <div className={content === 'activity' ? 'active': ''} onClick={() => { this.setState({ ...this.state, content: 'activity' }) }}>Activity Log</div>