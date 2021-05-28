import React from 'react'
import { NavLink } from 'react-router-dom'

export function Home() {
    return (
        <div>
            <ul>

            <li><NavLink exact to="/" >Home</NavLink></li>
            <li><NavLink to="/signup" >Signup</NavLink></li>
            <li><NavLink to="/login" >Login</NavLink></li>
            <li><NavLink to="/board/:boardId" >Board</NavLink></li>

            </ul>
        </div>
    )
}
