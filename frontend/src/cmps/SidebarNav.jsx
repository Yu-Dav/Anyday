import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { loadBoards } from '../store/actions/boardActions'
import { Input } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

class _SidebarNav extends Component {
    state = {
        isExpanded: false,
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
    render() {
        const { isExpanded, searchBy } = this.state
        const { boards } = this.props
        return (
            <section className={isExpanded ? "sidebar-nav is-expanded" : "sidebar-nav"}>
                <i className={isExpanded ? "fas arrow arrow-left" : "fas arrow arrow-right"}
                    onClick={this.onOpenNavbar}></i>
                {isExpanded &&
                    <div className="sidenav-open">
                        <h1>My Workspace</h1>
                        <div className="sidebar-ops">
                            <i>

                                <AddCircleOutlineOutlinedIcon style={{ fontSize: '18px', color: '#898a8f', cursor: 'pointer' }} />
                                <span>Add</span>
                            </i>
                            {/* <i className="fas fa-plus"></i> */}
                            <div className="flex">
                                <label htmlFor="boardName"><i className="fas fa-search"></i></label>
                                <Input style={{ color: '#323338' }} name="searchBy" id="boardName" placeholder="Search by name"
                                    autoComplete="false" disableUnderline={true}
                                    onChange={this.handleChange} value={searchBy} />
                            </div>
                        </div>
                        <div className="sidebar-ops second">
                            {boards.map(board =>
                                <h2 key={board._id} onClick={() => this.onSelectBoard(board._id)}>
                                    <TableChartOutlinedIcon style={{ fontSize: '18px', color: '#898a8f', cursor: 'pointer' }} /> {board.title}
                                </h2>)}
                        </div>
                    </div>
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
