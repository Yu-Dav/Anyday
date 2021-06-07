import React from 'react'
import logo from '../assets/imgs/favicon/logo-192x192.png'

export function Welcome() {
    return (
        <React.Fragment>
            <div className="welcome-container flex column align-center justify-center">
                <div className="anyday flex align-center justify-center">
                    <img src={logo} alt="Logo" />
                    <div className="title">nyday</div>
                </div>
                <div className="subtitle">welcome to your workspace</div>
            </div>
            <div className="welcome-mobile"></div>
        </React.Fragment>
    )
}
