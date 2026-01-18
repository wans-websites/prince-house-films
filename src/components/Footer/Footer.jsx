import React from "react";
import { motion } from "framer-motion";
import "./Footer.css";
import logo from "../../assets/img/phf_logo.png";

const Footer = () => {
  const socials = [
    {
      icon: "bi bi-instagram",
      href: "https://www.instagram.com/princehouse_films/",
    },
    {
      icon: "bi bi-youtube",
      href: "https://www.youtube.com/channel/UCOwyOyK5LqLbR9byJWxzT1w",
    },
    {
      icon: "bi bi-linkedin",
      href: "https://linkedin.com/company/princehousefilms",
    },
    {
      icon: "bi bi-facebook",
      href: "https://www.facebook.com/PrinceHouseFilms",
    },
  ];

  return (
    <footer className="phf-footer">
      <div className="footer-glow" />

      <div className="container">
        {/* Brand */}
        <div className="footer-main-grid">
          {/* Brand */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={logo} alt="Prince House Films" />
            <p>
              A full-service creative production company specializing in visual
              storytelling.
            </p>
          </motion.div>

          {/* Info */}
          <motion.div
            className="footer-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4>Contact</h4>
            <span>
              <i className="bi bi-geo-alt" /> Nairobi, Kenya
            </span>
            <span>
              <i className="bi bi-envelope" /> info@princehousefilms.com
            </span>
            <span>
              <i className="bi bi-phone" /> +254 701 914 626
            </span>
          </motion.div>

          {/* Links */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4>Explore</h4>
            <a href="/">
              <i className="bi bi-arrow-right-short" /> Home
            </a>
            <a href="/about">
              <i className="bi bi-arrow-right-short" /> About
            </a>
            <a href="/services">
              <i className="bi bi-arrow-right-short" /> Services
            </a>
            <a href="/portfolio">
              <i className="bi bi-arrow-right-short" /> Portfolio
            </a>
            <a href="/contact">
              <i className="bi bi-arrow-right-short" /> Contact
            </a>
          </motion.div>
        </div>

        {/* Socials */}
        <motion.div
          className="footer-socials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={s.icon} />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} Prince House Films
        </div>
      </div>
    </footer>
  );
};

export default Footer;
