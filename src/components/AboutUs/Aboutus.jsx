import React from 'react'
import './Aboutus.css'
import Navbar from '../Navbar/Navbar';
import Practice from '../Sections/Practice.jsx';
import ContactForm from '../ContactForm_Fpages/ContactForm.jsx';
import Testimonial from '../Testimonial_section/Testimonial.jsx';
import Footer from '../Footer/Footer.jsx';

// icon
import { FaCheck } from 'react-icons/fa';


export default function Aboutus() {
    return (
        <> <Navbar />
        <div className="aboutus">
            <div className="about-Hero-section">
                <div className="about-nav">
                   
                </div>
                <div className="about-content">
                    <div className="about-head">
                        <h1>About Us </h1>
                        <p>At [Your Firm Name], we are a team of experienced Chartered Accountants dedicated to offering personalized financial solutions for individuals and businesses. Specializing in tax planning, financial advisory, business consulting, and auditing, we bring precision and integrity to every client interaction. Whether you're a startup, a growing business, or an individual seeking expert financial guidance, we are here to help you navigate your financial journey with confidence.

                        </p>
                    </div>

                </div>
            </div>

            {/* Our Story */}
            <div className="Story-section">
                <div className="story-left">
                    <div className="story">
                        <h1>Our Story</h1>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe quisquam illum nobis totam similique doloribus suscipit, accusantium debitis dicta id vel cupiditate voluptatibus, quas obcaecati, modi quos? Ea commodi minima necessitatibus doloremque sapiente autem, eos, consectetur doloribus voluptatem sequi aliquam dolorum laborum a earum ad.</p>
                    </div>
                </div>
                <div className="story-right">

                </div>
            </div>

            {/* Practices */}
            <div className="about-practices">
                <Practice />
            </div>

            {/* Why us  */}
            <div className="whyus-section">
                <div className="whyus-left">

                </div>
                <div className="whyus-right">
                    <h1>Why Choose Us !</h1>
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
                    <p>
                        <FaCheck style={{ color: 'green', fontSize: '1.2rem', marginRight: '8px' }} />
                        Comprehensive tax solutions for businesses and individuals.
                    </p>

                </div>
            </div>

            {/* Contact us section */}
            <div className="about-contact">
                <ContactForm />
            </div>

            <div className="testimonial-section">
                <Testimonial />
            </div>

            <div className="footer-section">
                <Footer />
            </div>
        </div>
        </>
    )
}