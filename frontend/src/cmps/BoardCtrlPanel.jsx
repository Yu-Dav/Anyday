import React, { Component } from 'react'

export class BoardCtrlPanel extends Component {
    render() {
        return (
            <div>
                Board controllers 
                {/* <button onClick={addGroup}>Add new group</button> */}
                {/* filter btn will change the state to open the Boardfilter cmp */}
                <button>Filter</button> 
                {/* sort all groups by name */}
            </div>
        )
    }
}
