import React from 'react'
import '../Sections/Practice.css';
import { Link } from 'react-router-dom';

import { FaBriefcase, FaRegFileAlt, FaGlobe, FaBuilding, FaCheck } from 'react-icons/fa';

export default function Practice() {
    return (
        <div className="practices">
            <div className="practices-head">
                <h2>Our Practices</h2>
            </div>
            <div className="practices-items">
                <div className="practice-item">
                    <FaRegFileAlt className="practice-icon" />
                    <h3>Tax Services</h3>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <br />
                    <br />
                    <div className="knowmore-btn">
                        <Link to="/tax-services"> Know More </Link>
                    </div>
                </div>
                <div className="practice-item">
                    <FaBuilding className="practice-icon" />
                    <h3>Business Services</h3>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <br />
                    <br />
                    <div className="knowmore-btn">
                        <Link to="/tax-services"> Know More </Link>
                    </div>
                </div>
                <div className="practice-item">
                    <FaGlobe className="practice-icon" />
                    <h3>Digital Solutions</h3>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <br />
                    <br />
                    <div className="knowmore-btn">
                        <Link to="/tax-services"> Know More </Link>
                    </div>
                </div>
                <div className="practice-item">
                    <FaBriefcase className="practice-icon" />
                    <h3>Career Services</h3>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>
                    <br />
                    <br />
                    <div className="knowmore-btn">
                        <Link to="/tax-services"> Know More </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
