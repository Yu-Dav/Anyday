import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/imgs/favicon/favicon-32x32.png'
import { userService } from '../services/userService'
import { withRouter } from 'react-router-dom';

function _SidebarApp({ history }) {
    const [open, setOpen] = React.useState(false)

    const onOpenNotifi = () => {
        setOpen(!open)
    }

    const onLogOut = () => {
        userService.logout()
        history.push('/')
    }


    const user = userService.getLoggedinUser()
    let fullname = user?.fullname || 'Guest'

    return (
        <section className="sidebar-app">
            <nav className="flex justify-center column align-center space-between">
                <div className="flex column align-center top-sec">
                    <Link to={`/`} ><img src={logo} alt="Logo" className="logo" title="Back to home page" /></Link>
                </div>
                <div className="user-greeting"><span>Hello {fullname}</span></div>
                <div className="flex column align-center">
                    <i className="fas fa-sign-out-alt" title="Sign out" onClick={onLogOut}></i>
                </div>

            </nav>
        </section>
    )

}

export const SidebarApp = withRouter(_SidebarApp);
