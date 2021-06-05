import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/favicon/favicon-32x32.png'
import { userService } from '../services/userService'
import { withRouter } from 'react-router-dom';

class _SidebarApp extends Component {
    state = {
        isNotifiOpen: false
    }
    onOpenNotifi = () => {
        const { isNotifiOpen } = this.state
        this.setState({ ...this.state, isNotifiOpen: !isNotifiOpen })
    }

    onLogOut = () => {
        userService.logout()
        this.props.history.push('/')
    }

    render() {
        const user = userService.getLoggedinUser()
        let fullname = user?.fullname || 'Guest'
        // if (!fullname) fullname = 'Guest'
        return (
            <section className="sidebar-app">
                <nav className="flex justify-center column align-center space-between">
                    <div className="flex column align-center top-sec">
                        <Link to={`/`} ><img src={logo} alt="Logo" className="logo" title="Back to home page" /></Link>
                        <Link to={`/board`} ><i className="fas fa-th" title="Go to boards"></i></Link>
                        <i className="far fa-bell" onClick={this.onOpenNotifi}></i>
                    </div>
                    <div className="user-greeting"><span>Hello {fullname}</span></div>
                    <div className="flex column align-center">
                        <i className="fas fa-sign-out-alt" title="Sign out" onClick={this.onLogOut}></i>
                    </div>

                </nav>
            </section>
        )
    }
}

export const SidebarApp = withRouter(_SidebarApp);
