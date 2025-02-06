  
import './ContactForm.css'
import {FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactForm() {
    return (
        <>
       
        <div className="contactus">
            <div className="contact-head">
                <div className="head-content">
                    <h1>Contact Us and Schedule a meeting</h1>

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
            <div className="contact-form">
                <div className="con-form">
                    <form action="/submit">
                        <div className="form-container">
                            <input type="text" name="Name" id="" placeholder='Enter your Name :' />
                            <input type="email" name="Email" id="" placeholder='Enter Your Email : ' />
                        </div>
                        <div className="text-area">
                            <textarea id="message" name="message" rows="5" placeholder="Leave your message" required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}