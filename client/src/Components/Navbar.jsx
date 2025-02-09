import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>{/* Navbar */}
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand mb-0 h1" href="#">Dinesh Patel</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse mb-0 h6 justify-content-end"
                    id="navbarSupportedContent"
                    style={{ marginRight: "70px", fontWeight: 700 }}
                >
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/academics">Academics</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/achievements">Awards/Achievements</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/publications">Publications</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/conferences">Conferences</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gallery">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/login">Admin Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
