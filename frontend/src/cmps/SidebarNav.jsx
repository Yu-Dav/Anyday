import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

import { loadBoards } from '../store/actions/boardActions'
import { Input } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import logo from '../assets/imgs/favicon/favicon-32x32.png'


class _SidebarNav extends Component {
    state = {
        isExpanded: this.props.isExpanded,
        searchBy: ''
    }
    componentDidMount() {
        this.props.loadBoards()
    }
    onOpenNavbar = () => {
        const { isExpanded } = this.state
        this.setState({ ...this.state, isExpanded: !isExpanded })
    }
    handleChange = (ev) => {
        const field = ev.target.name
        let value = ev.target.value
        this.setState({ ...this.state, [field]: value },) // add func to filter boards 
    }
    onSelectBoard(id) {
        this.props.history.push(`${id}`)
    }
    onClickAway = () => {
        const { isExpanded } = this.state
        this.setState({ ...this.state, isExpanded: false })
    }
    render() {
        const { isExpanded, searchBy } = this.state
        const { boards } = this.props
        return (

            <section className={isExpanded ? "sidebar-nav is-expanded" : "sidebar-nav"}>
                {/* Icon in desktop - arrow */}
                <i className={isExpanded ? "fas arrow arrow-left" : "fas arrow arrow-right"}
                    onClick={this.onOpenNavbar}></i>
                {/* Icon in mobile - hamburger */}
                <MenuIcon className="hamburger" onClick={this.onOpenNavbar}></MenuIcon>
                <Link to={`/`} ><img src={logo} alt="Logo" className="logo" title="Back to home page" /></Link>

                {isExpanded &&
                    <ClickAwayListener onClickAway={this.onClickAway}>

                        <div className="sidenav-open flex column">
                            <h1>My Workspace</h1>
                            <div className="sidebar-ops">
                                <i onClick={this.props.onAddNewBoard} className="flex add-board-wrapper flex align-center">
                                    <AddCircleOutlineOutlinedIcon style={{ fontSize: '18px', color: '#898a8f', cursor: 'pointer', position: 'absolute', left: '-3.3px' }} />
                                    <span style={{ marginLeft: '20px' }}>Add</span>

                                </i>
                                {/* <div className="flex align-center search-board-wrapper">
                                    <label htmlFor="boardName"><i className="fas fa-search"></i></label>
                                    <Input style={{ color: '#323338' }} name="searchBy" id="boardName" placeholder="Search by name"
                                        autoComplete="false" disableUnderline={true}
                                        onChange={this.handleChange} value={searchBy} />
                                </div> */}

                            </div>
                            <div className="sidebar-ops second flex column">
                                {boards.map(board =>
                                    <div className="flex board-ops">
                                        <Link key={board._id} to={`/board/${board._id}`} className="flex align-center">
                                            <TableChartOutlinedIcon style={{ fontSize: '18px', color: '#898a8f', cursor: 'pointer', marginRight: '4px' }} /> {board.title}

                                        </Link>
                                        <button className='delete-board' onClick={() => {
                                             if (window.confirm('Are you sure you wish to delete this board?'))this.props.onRemoveBoard(board._id) } 
                                             }><i className="fas close"></i></button>
                                        {/* <button data-id={board._id} onClick={this.props.onRemoveBoard}>x</button> */}
                                    </div>
                                )}
                            </div>
                        </div>

                    </ClickAwayListener>
                }
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        currBoard: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy
    }
}
const mapDispatchToProps = {
    loadBoards,
}

_SidebarNav = connect(mapStateToProps, mapDispatchToProps)(_SidebarNav)
export const SidebarNav = withRouter(_SidebarNav);
