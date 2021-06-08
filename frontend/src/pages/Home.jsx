import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../cmps/Header.jsx'
import logo from '../assets/imgs/favicon/logo-512x512.png'
import illust from '../assets/imgs/home-01.png'
import Snackbar from '@material-ui/core/Snackbar'

export function Home() {
    return (
        <section className="home-page-container flex column space-between container">
            {/* <header>
                <div className="container nav-container flex align-center">
                    <nav>
                        <ul className="flex clean-list">
                            <li><NavLink to="/login" >Login</NavLink></li>
                            <li><NavLink to="/signup" >Signup</NavLink></li>
                            <li className="try-as-guest"><NavLink to="/board/60b65fef19a5e8e76413c787" >Try as guest</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header> */}
            <Header />
            <main className="flex align-center justify-center">
                <img className="illust" src={illust} alt="task-illustration" />
                <div className="flex column right">
                    <div className="anyday flex align-center justify-center">
                        <img src={logo} alt="Logo" className="logo" />
                        <div className="title">nyday</div>
                    </div>
                    <div className="main-home-container flex align-center">
                        <div className="main-content ">
                            <h1>Work Without Limits</h1>
                            <p>Easily build, manage and run your projects <span>Anyday</span></p>
                            <p className="more-info">Operating system to collaboration</p>
                        
                            <Link to={`/board/`} ><button>Start here</button></Link>
                            
                            {/* <Link to={`/board/b101`} ><button>Try as guest</button></Link> */}

                        </div>
                    </div>
                </div>
            </main>
            <footer className="flex justify-center">
                {/* <h1>Dafna Bashan</h1>
                <h1>Noga Jacobi</h1>
                <h1>Yuval David</h1> */}
            </footer>
        </section>
    )
}

