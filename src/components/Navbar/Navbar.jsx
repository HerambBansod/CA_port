import   { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const navRef = useRef(null);

    useEffect(() => {
        setDropdownOpen(false);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navRef]);

    const toggleNav = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="nav-head" ref={navRef}>
            <div className="nav-list-left">
                <h1>FirmName</h1>
            </div>
            <button className="nav-toggle" aria-label="Toggle navigation" onClick={toggleNav}>
                &#9776;
            </button>
            <div className={`nav-list-right ${dropdownOpen ? 'active' : ''}`}>
                <ul className="nav-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About-us">About us</Link></li>
                    <li><Link to="/Services">Services</Link></li>
                    <li><Link to="/contact" className='Btn'>Contact Us</Link></li>
                </ul>
            </div>
        </nav>
    );
}
