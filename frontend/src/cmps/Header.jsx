import React from 'react'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
             <header>
                <div className="app-header container nav-container flex align-center">
                    <nav>
                        <ul className="flex clean-list">
                            <li><NavLink to="/login" >Login</NavLink></li>
                            <li><NavLink to="/signup" >Signup</NavLink></li>
                            <li className="try-as-guest"><NavLink to="/board/60b7e7d319a5e8e764d808cb" >Try as guest</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
    )
}
