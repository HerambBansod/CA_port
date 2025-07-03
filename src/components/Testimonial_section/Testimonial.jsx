 
import './Testimonial.css';

// Icons
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const TestimonialCarousel = () => {
    return (
        <div className="testimonial-container">
            <h2 className="testimonial-heading">What Our Clients Say</h2>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                showDots={true}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
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
            </Carousel>
        </div>
    );
}

export default TestimonialCarousel;

