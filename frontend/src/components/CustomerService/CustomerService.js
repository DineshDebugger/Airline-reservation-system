import React, { useState } from "react";
import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./customerservice.css";

export default class CustomerService extends React.Component {
  state = {
    name: "",
    email: "",
    feedback: "",
    rating: 0,
    hoverRating: 0,
    formSubmitted: false
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRatingChange = (value) => {
    this.setState({ rating: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.email && this.state.feedback) {
      this.setState({ formSubmitted: true });
      setTimeout(() => {
        this.form.reset();
        this.setState({
          name: "",
          email: "",
          feedback: "",
          rating: 0,
          formSubmitted: false
        });
      }, 3000);
    }
  };

  render() {
    const { name, email, feedback, rating, hoverRating, formSubmitted } = this.state;

    return (
      <div className="customer-service-container">
        {/* Header */}
        <div className="cs-header">
          <h1>Customer Service</h1>
          <p>We'd love to hear from you! Send us your feedback.</p>
        </div>

        <div className="cs-content">
          {/* Feedback Form Card */}
          <div className="cs-form-card">
            <h2>Send Feedback</h2>
            <form ref={(form) => (this.form = form)} onSubmit={this.handleSubmit}>
              <div className="form-group">
                {/* <label htmlFor="name">Full Name</label> */}
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="email">Email Address</label> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="feedback">Your Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Tell us what you think about our service..."
                  value={feedback}
                  onChange={this.handleInputChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label style={{ marginTop: '24px' }}>Rate Your Experience</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="star"
                      onClick={() => this.handleRatingChange(star)}
                      onMouseEnter={() => this.setState({ hoverRating: star })}
                      onMouseLeave={() => this.setState({ hoverRating: 0 })}
                      style={{
                        color:
                          (hoverRating || rating) >= star
                            ? "#FFD700"
                            : "#ddd",
                        cursor: "pointer",
                        fontSize: "28px",
                        marginRight: "10px"
                      }}
                    >
                      <FaStar />
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="btn-submit">
                  Submit Feedback
                </button>
                <button type="reset" className="btn-clear">
                  Clear
                </button>
              </div>

              {formSubmitted && (
                <div className="success-message">
                  ✓ Thank you! We appreciate your feedback.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information Card */}
          <div className="cs-contact-card">
            <h2>Contact Us</h2>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h4>Email</h4>
                <p>
                  <a href="mailto:dineshiairlines@gmail.com">
                    dineshiairlines@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <h4>Phone</h4>
                <p>
                  <a href="tel:+919677934637">+91 9677934637</a>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h4>Address</h4>
                <p>91-Z/19, Delhi, 110001</p>
              </div>
            </div>

            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h4>Report an Issue</h4>
                <a href="mailto:dineshrvd1403@gmail.com" className="report-link">
                  → Send Report Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// arigato
