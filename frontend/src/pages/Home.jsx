import React from 'react'
import { NavLink } from 'react-router-dom'

export function Home() {
    return (
        <div>
            <ul>

            <li><NavLink exact to="/" >Home</NavLink></li>
            <li><NavLink to="/signup" >Signup</NavLink></li>
            <li><NavLink to="/login" >Login</NavLink></li>
            <li><NavLink to="/board/60b7e87419a5e8e764d835fe" >Board</NavLink></li> 
            {/* <li><NavLink to="/board/:boardId" >Board</NavLink></li>  */}
            {/* board id will change when mongo */}

            </ul>
        </div>
    )
}

