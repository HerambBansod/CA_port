import React from 'react';
import './Testimonial.css';

// Icons
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Testimonial() {
    return (
        <div className="testimonial-container">
            <h2 className="testimonial-heading">What Our Clients Say</h2>
            <div className="testimonial-content">
                <div className="testimonial-items">
                    
                    {/* Testimonial 1 */}
                    <div className="testimonial-item">
                        <FaQuoteLeft className="quote-icon" />
                        <p className="testimonial-text">
                            "The service was exceptional! The team provided detailed guidance and ensured my finances were in order."
                        </p>
                        <div className="testimonial-author">
                            <h4>John Doe</h4>
                            <span className="testimonial-role">Business Owner</span>
                        </div>
                        <div className="testimonial-rating">
                            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="testimonial-item">
                        <FaQuoteLeft className="quote-icon" />
                        <p className="testimonial-text">
                            "I highly recommend their services. They made the entire tax filing process stress-free!"
                        </p>
                        <div className="testimonial-author">
                            <h4>Jane Smith</h4>
                            <span className="testimonial-role">Freelancer</span>
                        </div>
                        <div className="testimonial-rating">
                            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="testimonial-item">
                        <FaQuoteLeft className="quote-icon" />
                        <p className="testimonial-text">
                            "Professional, efficient, and very helpful. I’m glad I chose them for my financial needs!"
                        </p>
                        <div className="testimonial-author">
                            <h4>Alex Johnson</h4>
                            <span className="testimonial-role">Entrepreneur</span>
                        </div>
                        <div className="testimonial-rating">
                            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                    </div>

                    {/* Testimonial 4 */}
                    <div className="testimonial-item">
                        <FaQuoteLeft className="quote-icon" />
                        <p className="testimonial-text">
                            "Amazing service! They went above and beyond to help me with my business setup."
                        </p>
                        <div className="testimonial-author">
                            <h4>Samantha Brown</h4>
                            <span className="testimonial-role">Startup Founder</span>
                        </div>
                        <div className="testimonial-rating">
                            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
