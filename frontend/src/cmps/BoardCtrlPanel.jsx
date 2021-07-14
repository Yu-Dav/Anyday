// import { Component } from 'react'
import React, { useState } from 'react';

import { ReactComponent as FilterSvg } from '../assets/imgs/svg/filter.svg'
// import { ReactComponent as SortSvg } from '../assets/imgs/svg/sort.svg'
import { BoardSearch } from '../cmps/BoardSearch'
import { BoardFilter } from '../cmps/BoardFilter'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
// import { onSetFilter } from '../store/actions/boardActions';

export const BoardCtrlPanel = ({ addNewGroup, filterBoard, board, loadBoard, filterBy, onChangeView, isMap }) => {
    const [isSearching, setIsSearching] = useState(false)
    const [isFiltering, setIsFiltering] = useState(false)
    //  eslint-disable-next-line
    const [view, setView] = useState('board-view')
    // const onSearchClicked = () => {
    //     setIsSearching(!isSearching)
    // }
    // const onFilterClicked = () => {
    //     setIsFiltering(!isFiltering)

    // }
    // const handleFilterClickAway = () => {
    //     setIsFiltering(false)

    // }
    return (
        <div className="board-ops flex space-between">
            <div className="left-ctrl flex">
                <button className="btn-add-group" onClick={addNewGroup}>New Group</button>
                {!isSearching &&
                    <button onClick={() => setIsSearching(!isSearching)} className="btn-search flex align-center "> <SearchIcon></SearchIcon>Search</button>
                }

                {isSearching &&
                    <BoardSearch filterBoard={filterBoard} setIsSearching={setIsSearching} />
                }
                <ClickAwayListener onClickAway={() => setIsFiltering(false)}>
                    <div>
                        <button onClick={() => setIsFiltering(!isFiltering)} className="btn-filter flex align-center"><FilterSvg /> <p>Filter</p></button>
                        {isFiltering &&
                            <BoardFilter board={board} loadBoard={loadBoard} filterBy={filterBy} filterBoard={filterBoard}></BoardFilter>
                        }
                    </div>
                </ClickAwayListener>
            </div>
            <div className="right-ctrl flex">
                <div className={!isMap ? 'view active flex align-center' : 'view flex align-center'} onClick={(ev) => {
                    onChangeView(ev, false)
                    setView('board-view')
                }} ><TableChartOutlinedIcon />Board</div>
                <div className={isMap ? 'view active flex align-center' : 'view flex align-center'} onClick={(ev) => {
                    onChangeView(ev, true)
                    setView('map-view')
                }} >
                    <LocationOnOutlinedIcon />Map
                </div>
            </div>
        </div>
    )
}

