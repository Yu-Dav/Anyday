import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

import { loadBoards } from '../store/actions/boardActions'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import logo from '../assets/imgs/favicon/favicon-32x32.png'
import { AlertDialog } from '../cmps/Dialog'


class _SidebarNav extends Component {
    state = {
        isExpanded: this.props.isExpanded,
        searchBy: ''
    }
    componentDidMount() {
        this.props.loadBoards()
        window.addEventListener('scroll', this.handleScroll);
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
    handleScroll = (ev) => {
        if (ev.currentTarget.scrollX) this.setState({ ...this.state, isExpanded: false })
    }


    render() {
        const { isExpanded } = this.state
        const { boards } = this.props
        return (

            <section className={isExpanded ? "sidebar-nav is-expanded" : "sidebar-nav"} onScroll={this.handleScroll}>
                {/* Icon in desktop - arrow */}
                <i className={isExpanded ? "fas arrow arrow-left" : "fas arrow arrow-right"}
                    onClick={this.onOpenNavbar}></i>
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


                            </div>
                            <div className="sidebar-ops second flex column">
                                {boards.map(board =>
                                    <div className="flex" key={board._id}>
                                        <Link to={`/board/${board._id}`} className="flex align-center">
                                            <TableChartOutlinedIcon style={{ fontSize: '18px', color: '#898a8f', cursor: 'pointer', marginRight: '4px' }} /> {board.title}
                                        </Link>
                                        <AlertDialog onRemoveBoard={this.props.onRemoveBoard} boardId={board._id}/>
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
