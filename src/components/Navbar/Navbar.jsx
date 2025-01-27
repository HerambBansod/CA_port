import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'



export default function navbar() {
    return (
        <div className="nav-head">
            <div className="nav-list-left">
                <h1>FirmName</h1>
            </div>
            <div className="nav-list-right">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About-us">About us</Link></li>
                    <li><Link to="/Services">Services</Link></li>
                    <Link to="/contact" className='Btn'>Contact Us</Link>
                </ul>
            </div>
        </div>
    )
}