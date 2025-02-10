 
import './Homepage.css';

import Navbar from '../Navbar/Navbar';
import ContactForm from '../ContactForm_Fpages/ContactForm';
import Testimonial from '../Testimonial_section/Testimonial';
import Footer from '../Footer/Footer';
 


import { Link } from 'react-router-dom';

// icons
import { FaArrowRight } from 'react-icons/fa';
import Aboutus from '../AboutUs/Aboutus.jsx';
import Practice from '../Sections/Practice.jsx';


export default function Homepage() {
    return (
        <>   
        <Footer/>
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
 

            <div className="about-section">
            <Aboutus/>
            </div>
            <div className="about-section">
            <Practice/>
            </div>
            <div className="testimonial-section">
                <Testimonial/>
            </div>
            {/* Contact us */}
            <div className="Contact-section">
                <ContactForm/>
            </div>
           
            {/* <div className="footer-section"> */}
                {/* <Footer/> */}
            {/* </div> */}
        </div>
        </>
    )
}
