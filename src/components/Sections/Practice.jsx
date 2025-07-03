import "./practice.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaCircleXmark } from "react-icons/fa6";
import { useState } from "react";
import {
  FaBriefcase,
  FaRegFileAlt,
  FaGlobe,
  FaBuilding,
   
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Practice() {
    const [selectedService, setSelectedService] = useState(null);
  const services = [
    {
      title: "Tax Services",
      icon: <FaRegFileAlt className="w-8 h-8 text-blue-600" />,
      description: "Comprehensive tax solutions for businesses and individuals. Ensure accurate and compliant tax filings with our professional tax services.",
      items: [
         
      ],
      details: {
        sections: [
          {
            title: "GST Services",
            content: [
              "Monthly/Quarterly GSTR-1 and GSTR-3B Filing",
              "Annual GST Return Filing (GSTR-9)",
              "GST Registration and Cancellation",
              "Input Tax Credit Reconciliation",
              "GST Audit Assistance",
              "E-way Bill Generation",
            ],
          },
          {
            title: "Income Tax Services",
            content: [
              "Individual and Business Tax Returns",
              "Tax Planning and Consultation",
              "International Tax Advisory",
              "Transfer Pricing Documentation",
              "Tax Audit Support",
              "Advance Tax Calculation",
            ],
          },
        ],
      },
    },
    {
      title: "Tax Services",
      icon: <FaRegFileAlt className="w-8 h-8 text-blue-600" />,
      description: "Comprehensive tax solutions for businesses and individuals. Ensure accurate and compliant tax filings with our professional tax services.",
      items: [
         
      ],
      details: {
        sections: [
          {
            title: "GST Services",
            content: [
              "Monthly/Quarterly GSTR-1 and GSTR-3B Filing",
              "Annual GST Return Filing (GSTR-9)",
              "GST Registration and Cancellation",
              "Input Tax Credit Reconciliation",
              "GST Audit Assistance",
              "E-way Bill Generation",
            ],
          },
          {
            title: "Income Tax Services",
            content: [
              "Individual and Business Tax Returns",
              "Tax Planning and Consultation",
              "International Tax Advisory",
              "Transfer Pricing Documentation",
              "Tax Audit Support",
              "Advance Tax Calculation",
            ],
          },
        ],
      },
    },
    {
      title: "Tax Services",
      icon: <FaRegFileAlt className="w-8 h-8 text-blue-600" />,
      description: "Comprehensive tax solutions for businesses and individuals. Ensure accurate and compliant tax filings with our professional tax services.",
      items: [
         
      ],
      details: {
        sections: [
          {
            title: "GST Services",
            content: [
              "Monthly/Quarterly GSTR-1 and GSTR-3B Filing",
              "Annual GST Return Filing (GSTR-9)",
              "GST Registration and Cancellation",
              "Input Tax Credit Reconciliation",
              "GST Audit Assistance",
              "E-way Bill Generation",
            ],
          },
          {
            title: "Income Tax Services",
            content: [
              "Individual and Business Tax Returns",
              "Tax Planning and Consultation",
              "International Tax Advisory",
              "Transfer Pricing Documentation",
              "Tax Audit Support",
              "Advance Tax Calculation",
            ],
          },
        ],
      },
    },
    {
      title: "Tax Services",
      icon: <FaRegFileAlt className="w-8 h-8 text-blue-600" />,
      description: "Comprehensive tax solutions for businesses and individuals. Ensure accurate and compliant tax filings with our professional tax services.",
      items: [
         
      ],
      details: {
        sections: [
          {
            title: "GST Services",
            content: [
              "Monthly/Quarterly GSTR-1 and GSTR-3B Filing",
              "Annual GST Return Filing (GSTR-9)",
              "GST Registration and Cancellation",
              "Input Tax Credit Reconciliation",
              "GST Audit Assistance",
              "E-way Bill Generation",
            ],
          },
          {
            title: "Income Tax Services",
            content: [
              "Individual and Business Tax Returns",
              "Tax Planning and Consultation",
              "International Tax Advisory",
              "Transfer Pricing Documentation",
              "Tax Audit Support",
              "Advance Tax Calculation",
            ],
          },
        ],
      },
    },
    {
      title: "Tax Services",
      icon: <FaRegFileAlt className="w-8 h-8 text-blue-600" />,
      description: "Comprehensive tax solutions for businesses and individuals. Ensure accurate and compliant tax filings with our professional tax services.",
      items: [
         
      ],
      details: {
        sections: [
          {
            title: "GST Services",
            content: [
              "Monthly/Quarterly GSTR-1 and GSTR-3B Filing",
              "Annual GST Return Filing (GSTR-9)",
              "GST Registration and Cancellation",
              "Input Tax Credit Reconciliation",
              "GST Audit Assistance",
              "E-way Bill Generation",
            ],
          },
          {
            title: "Income Tax Services",
            content: [
              "Individual and Business Tax Returns",
              "Tax Planning and Consultation",
              "International Tax Advisory",
              "Transfer Pricing Documentation",
              "Tax Audit Support",
              "Advance Tax Calculation",
            ],
          },
        ],
      },
    },
    {
      title: "Tax Services",
      icon: <FaRegFileAlt className="w-8 h-8 text-blue-600" />,
      description: "Comprehensive tax solutions for businesses and individuals. Ensure accurate and compliant tax filings with our professional tax services.",
      items: [
         
      ],
      details: {
        sections: [
          {
            title: "GST Services",
            content: [
              "Monthly/Quarterly GSTR-1 and GSTR-3B Filing",
              "Annual GST Return Filing (GSTR-9)",
              "GST Registration and Cancellation",
              "Input Tax Credit Reconciliation",
              "GST Audit Assistance",
              "E-way Bill Generation",
            ],
          },
          {
            title: "Income Tax Services",
            content: [
              "Individual and Business Tax Returns",
              "Tax Planning and Consultation",
              "International Tax Advisory",
              "Transfer Pricing Documentation",
              "Tax Audit Support",
              "Advance Tax Calculation",
            ],
          },
        ],
      },
    },
  ];

  const ServiceDetails = ({ service, onClose }) => (
    <div className="modal-backdrop">
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title    practice-icon">
            {service.icon}
            <h3 className="modal-title-text">
              {service.title}
            </h3>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <FaCircleXmark className="modal-close-icon" />
          </button>
        </div>

        {service.details.sections.map((section, index) => (
          <div key={index} className="modal-section">
            <h4 className="modal-section-title">
              {section.title}
            </h4>
            <ul className="modal-section-list">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="modal-section-item">
                  <MdKeyboardDoubleArrowRight className="modal-section-icon" />
                  <span className="modal-section-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={onClose}
          className="modal-close-details-btn"
        >
          Close Details
        </button>
      </div>
    </div>
  </div>
  );

  ServiceDetails.propTypes = {
    service: PropTypes.shape({
      icon: PropTypes.element.isRequired,
      title: PropTypes.string.isRequired,
      details: PropTypes.shape({
        sections: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            content: PropTypes.arrayOf(PropTypes.string).isRequired,
          })
        ).isRequired,
      }).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  return (
    <div className="practices">
      <div className="practices-head">
        <h2>Our Services</h2>
      </div>
      <div className="golden-div">
        
        </div>
      
      <div className="practices-items">
  
        {services.map((service, index) => (
          <div className="practice-item" key={index}>
            <div className="practice-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>
              <MdKeyboardDoubleArrowRight
                style={{
                  color: "green",
                  fontSize: "1.2rem",
                  marginRight: "8px",
                }}
              />
              
              {service.description}
            </p>
            {service.items.map((item, idx) => (
              <p key={idx}>
                <MdKeyboardDoubleArrowRight
                  style={{
                    color: "green",
                    fontSize: "1.2rem",
                    marginRight: "8px",
                  }}
                />
                {item}
              </p>
            ))}
            <br />
            <br />
            <div className="knowmore-btn">
              <Link   onClick={() => setSelectedService(service)}>
                {" "}
                Know More{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {selectedService && (
        <ServiceDetails
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}