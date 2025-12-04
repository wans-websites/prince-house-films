import React, { useState } from "react";
import { motion } from "framer-motion";
import "./GetInTouch.css";
import {
  BiEnvelope,
  BiPhone,
  BiMap,
  BiCalendar,
  BiChat,
  BiCheckCircle,
} from "react-icons/bi";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
    budget: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const projectTypes = [
    { id: "commercial", label: "Commercial" },
    { id: "documentary", label: "Documentary" },
    { id: "corporate", label: "Corporate" },
    { id: "events", label: "Events" },
    { id: "social", label: "Social Media" },
    { id: "other", label: "Other" },
  ];

  const budgetRanges = [
    { id: "under-5k", label: "Under $5,000" },
    { id: "5k-20k", label: "$5,000 - $20,000" },
    { id: "20k-50k", label: "$20,000 - $50,000" },
    { id: "50k-plus", label: "$50,000+" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  const handleBudgetSelect = (budget) => {
    setFormData((prev) => ({ ...prev, budget }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setLoading(false);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        message: "",
        budget: "",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <BiEnvelope />,
      title: "Email Us",
      content: "info@princehousefilms.com",
      link: "mailto:info@princehousefilms.com",
      linkText: "Send Message",
    },
    {
      icon: <BiPhone />,
      title: "Call Us",
      content: "+254 700 000 000",
      link: "tel:+254700000000",
      linkText: "Call Now",
    },
    {
      icon: <BiMap />,
      title: "Visit Us",
      content: "Nairobi, Kenya",
      link: "https://maps.google.com",
      linkText: "Get Directions",
    },
  ];

  return (
    <section id="contact" className="phf-section getintouch-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Create Something Extraordinary
        </motion.h2>

        <p className="section-subtitle">
          Ready to bring your vision to life? Share your project details with
          us, and let's start the conversation about how we can help you achieve
          your cinematic goals.
        </p>

        <div className="contact-container">
          <div className="contact-info">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                className="info-card phf-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="info-icon">{info.icon}</div>
                <div className="info-content">
                  <h3>{info.title}</h3>
                  <p>{info.content}</p>
                  <a
                    href={info.link}
                    className="info-link"
                    target={info.link.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      info.link.startsWith("http") ? "noopener noreferrer" : ""
                    }
                  >
                    {info.linkText} <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="info-card phf-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 4, 0, 0.1), rgba(13, 110, 253, 0.05))",
              }}
            >
              <div className="info-icon">
                <BiChat />
              </div>
              <div className="info-content">
                <h3>Quick Response Time</h3>
                <p>
                  We respond to all inquiries within 24 hours. For urgent
                  matters, please call us directly.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "14px",
                    marginTop: "20px",
                  }}
                >
                  <BiCalendar /> Response time: 24 hours
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!submitted ? (
              <>
                <h3 className="form-title">Start Your Project</h3>
                <p className="form-subtitle">
                  Fill out the form below, and our team will get back to you
                  with a customized proposal within 24 hours.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      className="form-input"
                      placeholder="Company / Organization"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label
                      style={{
                        display: "block",
                        color: "var(--color-default)",
                        marginBottom: "15px",
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      Project Type *
                    </label>
                    <div className="project-type-select">
                      {projectTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`type-option ${
                            formData.projectType === type.id ? "selected" : ""
                          }`}
                          onClick={() => handleProjectTypeSelect(type.id)}
                        >
                          {type.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label
                      style={{
                        display: "block",
                        color: "var(--color-default)",
                        marginBottom: "15px",
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      Estimated Budget
                    </label>
                    <div className="project-type-select">
                      {budgetRanges.map((range) => (
                        <div
                          key={range.id}
                          className={`type-option ${
                            formData.budget === range.id ? "selected" : ""
                          }`}
                          onClick={() => handleBudgetSelect(range.id)}
                        >
                          {range.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements... *"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Project Details{" "}
                        <i className="bi bi-arrow-right"></i>
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: "13px",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    By submitting this form, you agree to our Privacy Policy and
                    consent to being contacted by Prince House Films.
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                className="form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">
                  <BiCheckCircle />
                </div>
                <h3>Thank You!</h3>
                <p>
                  Your project details have been submitted successfully. Our
                  team will review your information and get back to you within
                  24 hours with a customized proposal.
                </p>
                <button
                  className="submit-button"
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: "30px" }}
                >
                  Submit Another Project <i className="bi bi-plus-circle"></i>
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="contact-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: "80px",
            padding: "50px",
            background:
              "linear-gradient(135deg, rgba(255, 4, 0, 0.1), rgba(13, 110, 253, 0.1))",
            borderRadius: "24px",
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "32px",
              color: "var(--color-default)",
              margin: "0 0 16px 0",
            }}
          >
            Not Sure Where to Start?
          </h3>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "18px",
              margin: "0 0 30px 0",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Schedule a free 30-minute consultation call with our creative
            director to discuss your vision, goals, and how we can help bring
            your project to life.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://calendly.com/princehousefilms/consultation"
              className="cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 42px",
                background:
                  "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
                color: "white",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(255, 4, 0, 0.3)",
              }}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 15px 35px rgba(255, 4, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 30px rgba(255, 4, 0, 0.3)";
              }}
            >
              <BiCalendar /> Schedule Free Consultation
            </a>

            <a
              href="tel:+254700000000"
              className="cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 42px",
                background: "transparent",
                color: "var(--color-default)",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.background = "transparent";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              <BiPhone /> Call Now: +254 700 000 000
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInTouch;
