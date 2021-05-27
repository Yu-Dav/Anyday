import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import { loadBoards } from '../store/actions/boardActions'
import { Input } from '@material-ui/core';

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
                    <div className="workspace-dropdown" >
                        <h1>My Workspaces</h1>
                        <i className="fas fa-plus">Add</i>
                        <div className="flex">
                            <label htmlFor="boardName"><i className="fas fa-search"></i></label>
                            <Input name="searchBy" id="boardName" placeholder="Search by name"
                                autoComplete="false" disableUnderline={true}
                                onChange={this.handleChange} value={searchBy} />
                        </div>
                        {boards.map(board =>
                            <h2 key={board._id} onClick={() => this.onSelectBoard(board._id)}>
                                {board.title}
                            </h2>)}
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
