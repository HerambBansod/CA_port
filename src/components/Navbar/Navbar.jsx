import   { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import './Navbar.css';

export default function NavBar() {
    const [dropDown, setDropDown] = useState(false);
  
    function handleDropDown() {
      setDropDown(!dropDown);
    }
  
    return (
      <div className="navbar-section">
        <div className="container">
          <div className="navbar-logo">
            <img src="../../../images/ca logo.jpeg" alt="ca-logo" />
          </div>
          <div className="navbar-element">
            <FaBars className="navbar-menu" onClick={handleDropDown} />
            <ul className={`menu ${dropDown ? "show" : ""}`}>
              <li>
                <Link to="/" className="link-li">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Services" className="link-li">
                  Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-li">
                  Contact
                </Link>
              </li>
            </ul>
            <button className="get-in-touch-btn">
              Get In Touch <IoIosArrowRoundForward />
            </button>
          </div>
        </div>
      </div>
    );
  }