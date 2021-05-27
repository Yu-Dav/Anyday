import React, { Component } from 'react'

export class BoardFilter extends Component {
    state = {
        filterBy: {
            group: '', // name of the group
            name: '', // name of the task
            member: '',
            priority: '',
            status: '',
        }
    }
    render() {
        return (
            <div>
                Board Filter 
            </div>
        )
    }
}


