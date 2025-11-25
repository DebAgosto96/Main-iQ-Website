import React, { useState } from "react";
import "./ContactUs.css";
import VideoBG from "../components/VideoBG";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <VideoBG src="/Contact.mp4" />

      <div className="contactForm-container">
        <h2 className="contactForm-heading">Contact Us</h2>

        <form className="contactForm-wrapper" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="contactForm-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="contactForm-input"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="contactForm-textarea"
          ></textarea>

          <button type="submit" className="contactForm-button">
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
