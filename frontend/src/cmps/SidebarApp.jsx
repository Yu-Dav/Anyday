import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// This is the app side bar, navbar is a child of it. 

export class SidebarApp extends Component {
    state = {
        isNotifiOpen: false
    }
    onOpenNotifi = () => {
        const { isNotifiOpen } = this.state
        this.setState({ ...this.state, isNotifiOpen: !isNotifiOpen })
    }

    render() {
        return (
            <section className="sidebar-app">
                <nav className="flex justify-center column align-center space-between">

                    <div className="flex column align-center">
                        Logo
                    <Link to={`/board`} ><i className="fas fa-th" title="Go to boards"></i></Link>
                        <i className="far fa-bell" onClick={this.onOpenNotifi}></i>
                        {/* func changes true/false, need to add a modal from the activities  */}
                    </div>
                    <div className="user-greeting">Hello Guest</div>
                    <div className="flex column align-center">
                        <Link to={`/`} ><i className="fas fa-sign-out-alt" title="Sign out"></i></Link>
                    </div>

                </nav>
            </section>
        )
    }
}
