import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
             <header>
                <div className="app-header container nav-container flex align-center">
                    <nav>
                        <ul className="flex clean-list">
                            <li><NavLink to="/login" >Login</NavLink></li>
                            {/* <li><NavLink to="/signup" >Signup</NavLink></li> */}
                            <li><NavLink to="/board" >Try as guest</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
    )
}
