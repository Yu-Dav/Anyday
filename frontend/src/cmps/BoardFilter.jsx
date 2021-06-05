import React, { Component } from 'react'
import { BoardFilterItem } from './BoardFilterItem.jsx'
import { connect } from 'react-redux'
import { loadBoard } from '../store/actions/boardActions'

class _BoardFilter extends Component {
    state = {
        filterBy: {
            txt: '',
            membersId: [],
            priority: [],
            status: [],
            tag: []
        },
        isSelected: {
            txt: false,
            membersId: false,
            priority: false,
            status: false,
            tag: false
        }

    }
    // onSetFilter = (newFilterCriteria, filterType) => {
    //     // console.log('new criter' , newFilterCriteria)
    //     const prevCriteria = this.state.filterBy[filterType].find(prevCriteria => prevCriteria.id === newFilterCriteria.id)
    //     if (prevCriteria) return // checking if the clicked new criteria already present in the state arr. is so return. later -> remove from the array, loadboard and return
    //     const newFilter = {
    //         ...this.state.filterBy,
    //         [filterType]: [...this.state.filterBy[filterType], newFilterCriteria.title]
    //     }
    //     const newState = { ...this.state, filterBy: newFilter }
    //     this.setState(newState, () =>
    //         this.props.loadBoard(this.props.currBoard._id, newFilter)
    //     )
    //     // add txt to the filterBy 
    // }


    onSetFilter = (field, item) => {
        console.log('filter item', field, item);
        const newFilter = { ...this.state.filterBy }
        if (field === 'status' || field === 'priority' || field === 'tag') {
            console.log(newFilter);
            if (newFilter[field].includes(item)) {
                const filteredLabels = newFilter[field].filter(field => field !== item)
                newFilter[field] = filteredLabels
                console.log(newFilter);
            }
            else newFilter[field] = [...newFilter[field], item]
            console.log(newFilter);
        } else if (field === 'membersId') {
            if (newFilter[field].includes(item)) {
                const filteredMembers = newFilter[field].filter(memberId => memberId !== item)
                newFilter[field] = filteredMembers
            }
            else newFilter[field] = [...newFilter[field], item]
        }
        console.log(this.props);
        this.setState({ filterBy: newFilter, isSelected:{...this.state.isSelected, [field]: !this.state.isSelected.filed}  }, () => {
            console.log('filter by', this.state.filterBy);
            this.props.setFilter({ ...this.state.filterBy })})
    }

    // onSetFilterLabels = (label, text) => {
    //     const copyFilter = { ...this.state.filterBy }
    //     if (copyFilter[label].includes(text)) {
    //         const newLabels = copyFilter[label].filter(label => label !== text)
    //         copyFilter[label] = newLabels
    //     }
    //     else copyFilter[label] = [...copyFilter[label], text]
    //     const copyStatusForDispaly = { ...this.state.statusesForDisplay }
    //     const copyPriorityForDisplay = { ...this.state.priorityForDisplay }
    //     if (label === 'status') copyStatusForDispaly[text].isSelect = !this.state.statusesForDisplay[text].isSelect
    //     if (label === 'priority') copyPriorityForDisplay[text].isSelect = !this.state.priorityForDisplay[text].isSelect
    //     this.setState({ filterBy: copyFilter, statusesForDisplay: copyStatusForDispaly, priorityForDisplay: copyPriorityForDisplay },
    //         () => this.props.onSetFilter({ ...this.state.filterBy }))
    // }

    // onSetFilter = (ev) => {
    //     const { value, name } = ev.target
    //     const filterBy = { ...this.state.filterBy }
    //     filterBy[name] = value;
    //     this.setState({ filterBy }, () => this.props.onSetFilter({ ...this.state.filterBy }));
    // }

    // onGetMember = (memberId) => {
    //     const copyFilter = { ...this.state.filterBy }
    //     if (copyFilter.membersId.includes(memberId)) {
    //         const newMmbers = copyFilter.membersId.filter(member => member !== memberId)
    //         copyFilter.membersId = newMmbers
    //     }
    //     else copyFilter.membersId = [...copyFilter.membersId, memberId]
    //     this.setState({ filterBy: copyFilter }, () => this.props.onSetFilter({ ...this.state.filterBy }))
    // }

    render() {
        const { board } = this.props
        const {filterBy} = this.state
        return (
            <div className="board-filter fade-in">
                <div className=" filter-groups flex flex-column">
                    <div className="filter-group">
                        <h1>Status:</h1>
                        {board.statusLabels.map(status => status.title !== '' && < BoardFilterItem type='status' filterBy={filterBy.status} key={status.id} field={status} onSetFilter={this.onSetFilter} />)}
                    </div>
                    <div className="filter-group">
                        <h1>Priority:</h1>
                        {board.priorityLabels.map(priority => priority.title !== '' && < BoardFilterItem type='priority' filterBy={filterBy.priority} key={priority.id} field={priority} onSetFilter={this.onSetFilter} />)}
                    </div>
                    <div className="filter-group">
                        <h1>Tags:</h1>
                        {board.tags.map(tag => < BoardFilterItem type='tag' filterBy={filterBy.tag} key={tag.id} field={tag} onSetFilter={this.onSetFilter} />)}
                    </div>
                    <div className="filter-group">
                        <h1>Members:</h1>
                        {board.members.map(member => < BoardFilterItem type='membersId' filterBy={filterBy.membersId} key={member._id} field={member} onSetFilter={this.onSetFilter} />)}
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        // boards: state.boardModule.boards,
        currBoard: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    loadBoard,
    // updateBoard
}

export const BoardFilter = connect(mapStateToProps, mapDispatchToProps)(_BoardFilter)