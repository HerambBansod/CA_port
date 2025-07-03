
import './service.css'
import Navbar from '../Navbar/Navbar';
import Practice from '../Sections/Practice.jsx';
import Testimonial from '../Testimonial_section/Testimonial';
import ContactForm from '../ContactForm_Fpages/ContactForm';
import Footer from '../Footer/Footer';

export default function service() {
    return (
        <>
            <Navbar />

            <div className="services">
                <div className="service-hero-section">
                    <div className="service-nav">

                    </div>
                    <div className="service-content">
                        <div className="service-head">
                            <h1>Our Services</h1>
                            <p>At [Your Firm Name], we offer a variety of professional services tailored to the unique
                                financial needs of individuals and businesses. Our team specializes in tax planning,
                                business consulting, financial advisory, and auditing, helping you navigate the complexities
                                of finance. Whether you&aposre a startup or an established business, our personalized solutions
                                are designed to achieve your financial goals with precision and integrity. Let us be your
                                trusted partner in managing and growing your financial future.</p>
                        </div>
                    </div>
                </div>
                <div className="service-practice">
                    <Practice />
                </div>
                <div className="service-testimonials">
                    <Testimonial />
                </div>
                <div className="service-contactus">
                    <ContactForm />
                </div>
                <div className="footer-section">
                    <Footer />
                </div>
            </div>
        </>
    )
}
