import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../cmps/Header.jsx'
import logo from '../assets/imgs/favicon/logo-512x512.png'
import illust from '../assets/imgs/home-01.png'

export function Home() {
    return (
        <section className="home-page-container flex column space-between container">
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
                            <p className="more-info">Operating system for collaboration</p>
                            <Link to={`/board/`} ><button>Start here</button></Link>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="flex justify-center">
            </footer>
        </section>
    )
}

