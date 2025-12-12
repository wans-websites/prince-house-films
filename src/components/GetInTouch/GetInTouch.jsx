import React from "react";
import { motion } from "framer-motion";
import "./GetInTouch.css";
import {
  BiEnvelope,
  BiPhone,
  BiMap,
  BiCalendar,
  BiChat,
  BiLogoInstagram,
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLinkExternal,
} from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";

const GetInTouch = () => {
  const contactInfo = [
    {
      icon: <BiMap />,
      title: "Location",
      content: "Nairobi, Kenya",
      link: "https://maps.google.com/?q=Nairobi+Kenya",
      linkText: "Directions",
      external: true,
    },
    {
      icon: <BiEnvelope />,
      title: "Email",
      content: "princehousefilms@gmail.com",
      link: "mailto:princehousefilms@gmail.com",
      linkText: "Email Us",
      external: false,
    },
    {
      icon: <BiPhone />,
      title: "Phone",
      content: "+254 701 914 626",
      link: "tel:+254701914626",
      linkText: "Call Now",
      external: false,
    },
  ];

  const socialMedia = [
    {
      platform: "Instagram",
      handle: "@princehouse_films",
      icon: <BiLogoInstagram />,
      link: "https://instagram.com/princehouse_films",
      color: "#E1306C",
    },
    {
      platform: "Facebook",
      handle: "Prince House Films",
      icon: <BiLogoFacebook />,
      link: "https://facebook.com/PrinceHouseFilms",
      color: "#1877F2",
    },
    {
      platform: "TikTok",
      handle: "@princehousefilms",
      icon: <FaTiktok />,
      link: "https://tiktok.com/@princehousefilms",
      color: "#000000",
    },
    {
      platform: "LinkedIn",
      handle: "Prince House Films",
      icon: <BiLogoLinkedin />,
      link: "https://linkedin.com/company/prince-house-films",
      color: "#0A66C2",
    },
  ];

  return (
    <section id="contact" className="phf-section getintouch-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Have a Project In Mind?</h2>
          <p className="section-subtitle">
            Ready to bring your vision to life? Connect with us through any
            channel.
          </p>
        </motion.div>

        <div className="contact-container">
          {/* Main Contact Grid - More Compact */}
          <div className="main-contact-grid">
            {/* Contact Cards Row */}
            <div className="contact-cards-row">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  className="compact-card phf-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="compact-icon">{info.icon}</div>
                  <div className="compact-content">
                    <h3>{info.title}</h3>
                    <p>{info.content}</p>
                    <a
                      href={info.link}
                      className="compact-link"
                      target={info.external ? "_blank" : "_self"}
                      rel={info.external ? "noopener noreferrer" : ""}
                    >
                      {info.linkText}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media - Compact Grid */}
            <motion.div
              className="social-media-compact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="social-header">
                <BiChat className="social-header-icon" />
                <h3>Follow Us</h3>
              </div>
              <div className="social-grid-compact">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className="social-item-compact"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ "--social-color": social.color }}
                  >
                    <div
                      className="social-icon-compact"
                      style={{ color: social.color }}
                    >
                      {social.icon}
                    </div>
                    <span className="social-platform-compact">
                      {social.platform}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section - Compact */}
          <motion.div
            className="cta-section-compact"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="cta-card-compact">
              <div className="cta-icon-compact">
                <BiCalendar />
              </div>
              <div className="cta-content">
                <h3 className="cta-title-compact">Free 30-Min Consultation</h3>
                <p className="cta-desc-compact">
                  Discuss your project with our creative director
                </p>
                <div className="cta-buttons-compact">
                  <motion.a
                    href="https://calendly.com/princehousefilms/consultation"
                    className="cta-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <BiCalendar /> Book Now
                  </motion.a>
                  <motion.a
                    href="tel:+254701914626"
                    className="cta-btn-secondary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <BiPhone /> Call
                  </motion.a>
                </div>
                <div className="cta-note">
                  <BiChat /> 24-hour response
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="quick-contact-info">
              <h4>Contact Summary</h4>
              <div className="contact-info-grid">
                <div className="contact-item">
                  <span className="contact-label">📍 Nairobi, Kenya</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">
                    📧 princehousefilms@gmail.com
                  </span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">📞 +254 701 914 626</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">⏱️ 24-hour response</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
