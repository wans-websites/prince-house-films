import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Footer.css";
import logo from "../../assets/img/phf_logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription
      console.log("Subscribed:", email);
      setEmail("");
      alert("Thank you for subscribing to our newsletter!");
    }
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Our Team", href: "/team" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Videography", href: "/services#videography" },
        { label: "Content Creation", href: "/services#content" },
        { label: "Documentaries", href: "/services#documentaries" },
        { label: "Live Streaming", href: "/services#live" },
        { label: "Motion Graphics", href: "/services#motion" },
        { label: "Social Media", href: "/services#social" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: "bi bi-facebook",
      href: "https://www.facebook.com/PrinceHouseFilms",
    },
    { icon: "bi bi-twitter", href: "https://twitter.com/PrinceHouseFilms" },
    {
      icon: "bi bi-instagram",
      href: "https://www.instagram.com/princehousefilms/",
    },
    {
      icon: "bi bi-youtube",
      href: "https://www.youtube.com/channel/UCOwyOyK5LqLbR9byJWxzT1w",
    },
    {
      icon: "bi bi-linkedin",
      href: "https://linkedin.com/company/princehousefilms",
    },
  ];

  const bottomLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <footer id="footer" className="phf-section footer-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column footer-logo">
            <img src={logo} alt="Prince House Films" />
            <p>
              Prince House Films is an award-winning production studio
              specializing in cinematic storytelling, commercial filmmaking, and
              digital content that captivates audiences and drives real results.
            </p>
          </div>

          {footerLinks.map((column, i) => (
            <motion.div
              key={i}
              className="footer-column footer-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href}>
                      <i className="bi bi-chevron-right"></i> {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            className="footer-column footer-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>Contact Info</h3>
            <p>
              <i className="bi bi-geo-alt"></i> Nairobi, Kenya
            </p>
            <p>
              <i className="bi bi-envelope"></i> info@princehousefilms.com
            </p>
            <p>
              <i className="bi bi-phone"></i> +254 701 914 626
            </p>
            <p>
              <i className="bi bi-clock"></i> Mon - Fri: 9:00 AM - 6:00 PM
            </p>
          </motion.div>
        </div>

        <motion.div
          className="footer-social"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="social-title">Follow Our Journey</h4>
          <div className="social-icons">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="footer-bottom">
          {/* <motion.div
            className="footer-newsletter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Stay Updated</h3>
            <p>
              Subscribe to our newsletter for the latest projects and insights.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </motion.div>

          <div className="footer-links-bottom">
            {bottomLinks.map((link, i) => (
              <a key={i} href={link.href}>
                {link.label}
              </a>
            ))}
          </div> */}

          <p className="footer-copyright">
            © {new Date().getFullYear()} Prince House Films. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
