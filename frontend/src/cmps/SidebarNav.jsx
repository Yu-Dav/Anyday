import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import { loadBoards } from '../store/actions/boardActions'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import logo from '../assets/imgs/favicon/favicon-32x32.png'
import { AlertDialog } from '../cmps/Dialog'


const _SidebarNav = ({ isExpandedProp, onAddNewBoard, onRemoveBoard }) => {

    const [isExpanded, setIsExpanded] = useState(isExpandedProp)
    // const [searchBy, setSearchBy] = useState('')
    const boards = useSelector(state => state.boardModule.boards)
    // const currBoard = useSelector(state => state.boardModule.currBoard)
    // const filterBy = useSelector(state => state.boardModule.filterBy)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadBoards())
        window.addEventListener('scroll', handleScroll);
    }, [])

    const onOpenNavbar = () => {
        setIsExpanded(!isExpanded)
    }

    const onClickAway = () => {
        setIsExpanded(false)
    }
    const handleScroll = (ev) => {
        if (ev.currentTarget.scrollX) setIsExpanded(false)
    }
    return (
        <section className={isExpanded ? "sidebar-nav is-expanded" : "sidebar-nav"} onScroll={handleScroll}>
            {/* Icon in desktop - arrow */}
            <i className={isExpanded ? "fas arrow arrow-left" : "fas arrow arrow-right"}
                onClick={onOpenNavbar}></i>
            <MenuIcon className="hamburger" onClick={onOpenNavbar}></MenuIcon>
            <Link to={`/`} ><img src={logo} alt="Logo" className="logo" title="Back to home page" /></Link>
            {isExpanded &&
                <ClickAwayListener onClickAway={onClickAway}>
                    <div className="sidenav-open flex column">
                        <h1>My Workspace</h1>
                        <div className="sidebar-ops">
                            <i onClick={onAddNewBoard} className="flex add-board-wrapper flex align-center">
                                <AddCircleOutlineOutlinedIcon style={{ fontSize: '18px', color: '#898a8f', cursor: 'pointer', position: 'absolute', left: '-3.3px' }} />
                                <span style={{ marginLeft: '20px' }}>Add</span>
                            </i>
                        </div>
                        <div className="sidebar-ops second flex column">
                            {boards.map(board =>
                                <div className="flex" key={board._id}>
                                    <Link to={`/board/${board._id}`} className="flex align-center">
                                        <TableChartOutlinedIcon style={{ fontSize: '18px', color: '#898a8f', cursor: 'pointer', marginRight: '4px' }} /> {board.title}
                                    </Link>
                                    <AlertDialog onRemoveBoard={onRemoveBoard} boardId={board._id} />
                                </div>
                            )}
                        </div>
                    </div>
                </ClickAwayListener>
            }
        </section>
    )
}

export const SidebarNav = withRouter(_SidebarNav);
