  
import './ContactForm.css'
 
import { CgMail } from "react-icons/cg";
import { BiPhoneCall } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
export default function ContactForm() {
    return (
        <>
       <div className="contact-title">

<h1>connect us </h1>
</div>
       <div className="container contact-container  ">
        
        <div className="left-form">
          <span>For more Information</span>
          <h1  >Hey, Lets Talk</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, error!
          </p>
          <div className="contact-form">

          <div className="contactUs-details">
            <div className="contactUs-icon-name">
            <SlLocationPin className="contactUs-icon" />
              <span className="icon-details">Our Location</span>
              </div>
            <div className="mail-info">
              <span >abhi@gmail.com</span>
            </div>
          </div>

          <div className="contactUs-details">
          <div className="contactUs-icon-name">
            <CgMail className="contactUs-icon" />
              <span className="icon-details">Email Support</span>
              </div>
            <div className="mail-info">
              <span>abhi@gmail.com</span>
            </div>
          </div>

          <div className="contactUs-details">
          <div className="contactUs-icon-name">
            <BiPhoneCall className="contactUs-icon" />
              <span className="icon-details" data-aos="fade-in">Phone Number</span>
              </div>
            <div className="mail-info">
              <span>abhi@gmail.com</span>
            </div>
          </div> 

          
          </div>
          <hr />
          <p className="contactUs-left-des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi impedit vel alias fugit?</p>
        </div>
        <div className="right-form">

        <div className="right-container">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.64159104294!2d73.91936976956652!3d18.54848799890942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1d9adda5b89%3A0x19b2af557e4e05ed!2sSarvorks%20Business%20Solutions!5e0!3m2!1sen!2sin!4v1739791334840!5m2!1sen!2sin" 
        width="600" 
        height="450" 
        // style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      ></iframe>
    </div>
    
        </div>
      </div>
        </>
    )
}