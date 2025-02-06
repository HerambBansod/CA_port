 
import './Homepage.css';

import Navbar from '../Navbar/Navbar';
import ContactForm from '../ContactForm_Fpages/ContactForm';
import Testimonial from '../Testimonial_section/Testimonial';
import Footer from '../Footer/Footer';
import Practice from '../Sections/Practice.jsx';


import { Link } from 'react-router-dom';

// icons
import { FaArrowRight } from 'react-icons/fa';


export default function Homepage() {
    return (
        <>   
        <Navbar />
        <div className="Homepage">
          
            <div className="hero-section">
                <video className="background-video" autoPlay loop muted>
                    <source src="/Landing_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="header">
                   
                </div>
                <div className="landing-page">
                    <div className="landing-content">
                        <h1>Simplify Your Taxes and Finances with Expert CA Services</h1>
                    </div>
                    <div className="CTA-btn">
                        <Link to="/contact">
                            Book Free Consultation
                            <FaArrowRight style={{ marginLeft: '10px' }} />
                        </Link>
                    </div>
                </div>
            </div>

            service/practice section

            <div className="practices-section">
                <Practice/>
            </div>

            {/* Contact us */}
            <div className="Contact-section">
                <ContactForm/>
            </div>
            <div className="testimonial-section">
                <Testimonial/>
            </div>
            <div className="footer-section">
                <Footer/>
            </div>
        </div>
        </>
    )
}
