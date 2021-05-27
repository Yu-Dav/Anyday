import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard } from '../store/actions/boardActions'

class _SidebarNav extends Component {
    state = {
        isExpanded: false
    }
    onOpenBoardDropdown = () => {
        const { isExpanded } = this.state
        this.setState({...this.state, isExpanded: !isExpanded})
    }
    render() {
        const { isExpanded } = this.state
        return (
            <section className="sidebar-nav is-expanded ">

                <div className="workspace-dropdown flex" onClick={this.onOpenBoardDropdown}>
                     <h1>My Workspaces</h1> 
                    <i className="fas fa-angle-down"></i>
                </div>

                {isExpanded && 
                <div>List of ALL boards</div>}

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
    loadBoard,
}

export const SidebarNav = connect(mapStateToProps, mapDispatchToProps)(_SidebarNav)