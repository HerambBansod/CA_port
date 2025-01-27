import React from 'react'
import './Contact_Us_page.css'
import Navbar from '../Navbar/Navbar';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact_Us_page() {
    return (
        <div className="contactus">
            <div className="contact-hero-section">
                <div className="contact-nav">
                    <Navbar />
                </div>
            </div>
            <div className="contact-section">
                <div className="contact-form-container">
                    <div className="contact-left">
                        <div className="map">
                            <iframe
                               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.1234567890123!2d73.91234567890123!3d18.551234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1234567890%3A0xabcdef1234567890!2sVadgaon%20Sheri%2C%20Pune%2C%20Maharashtra%20411014%2C%20India!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: '8px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="ca-info">
                            <p>
                                <FaPhoneAlt style={{ color: '#fbbf24', fontSize: '1.2rem', marginRight: '8px' }} />
                                +123-456-7890
                            </p>


                            <p>
                                <FaEnvelope style={{ color: '#fbbf24', fontSize: '1.2rem', marginRight: '8px' }} />
                                example@email.com
                            </p>

                            <p>
                                <FaMapMarkerAlt style={{ color: '#fbbf24', fontSize: '1.2rem', marginRight: '8px' }} />
                                123 Street Name, City, Country
                            </p>
                        </div>
                    </div>
                    <div className="contact-right">
                        <h1>Contact Us !</h1>
                        <form action="" method="post">
                            <div className="form-group">
                                <input type="text" name="Name" id="" placeholder='Enter Your Name : ' />
                                <input type="email" name="Email" id="" placeholder='Enter Your Email :' />
                            </div>
                            <div className="textarea">
                                <textarea className="form-control" rows="5" id="comment" placeholder="Message"></textarea>
                            </div>
                            <button className="btn btn-block" type="submit">Send Now!</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
