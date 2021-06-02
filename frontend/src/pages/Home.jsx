import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Header } from '../cmps/Header.jsx'
import logo from '../assets/imgs/favicon/logo-512x512.png'

export function Home() {
    return (
        <section className="home-page-container flex column space-between">
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
            <Header/>
            <main className="flex column align-center justify-center">
                <div className="main-home-container flex">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="main-content">
                        <p>Easily manage your team's task or your personal projects</p>
                        <h1>You will quickly use our app <span>Anyday</span></h1>
                        <Link to={`/board/60b7e7d319a5e8e764d808cb`} ><button>Try as guest</button></Link>
                        {/* <Link to={`/board/b101`} ><button>Try as guest</button></Link> */}
                        
                    </div>
                </div>
            </main>
            <footer className="flex justify-center">
                <h1>Dafna Bashan</h1>
                <h1>Noga Jacobi</h1>
                <h1>Yuval David</h1>
            </footer>
        </section>
    )
}

