import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import {
  BiPlayCircle,
  BiCameraMovie,
  BiAward,
  BiCheckShield,
  BiTimer,
} from "react-icons/bi";

const Hero = () => {
  const scrollToContent = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: <BiCameraMovie />,
      title: "Cinematic Production",
      description: "Hollywood-quality visuals",
    },
    {
      icon: <BiAward />,
      title: "Award-Winning",
      description: "Industry recognized excellence",
    },
    {
      icon: <BiCheckShield />,
      title: "Guaranteed Quality",
      description: "Broadcast-ready results",
    },
    {
      icon: <BiTimer />,
      title: "Fast Delivery",
      description: "On-time, every time",
    },
  ];

  const trustLogos = [
    { name: "Netflix", icon: "N" },
    { name: "BBC", icon: "BBC" },
    { name: "Disney", icon: "D" },
    { name: "National Geographic", icon: "NG" },
    { name: "MTV", icon: "MTV" },
  ];

  return (
    <section id="home" className="phf-section hero-section">
      <div className="glow-overlay"></div>

      {/* Optional video background */}
      <video
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-film-reel-spinning-1938-large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-main-title">
            Transform Your Vision Into{" "}
            <span className="hero-highlight">Cinematic Reality</span>
          </h1>

          <p className="hero-subtitle">
            Prince House Films is an award-winning production studio
            specializing in cinematic storytelling, commercial filmmaking, and
            digital content that captivates audiences and drives real results.
            From concept to screen, we bring stories to life with technical
            mastery and creative passion.
          </p>

          <div className="hero-cta-buttons">
            <motion.a
              href="/contact"
              className="hero-primary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Start Your Project <i className="bi bi-arrow-right"></i>
            </motion.a>

            <motion.a
              href="/portfolio"
              className="hero-secondary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <BiPlayCircle /> View Our Work
            </motion.a>
          </div>

          <motion.div
            className="hero-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {features.map((feature, i) => (
              <div key={i} className="hero-feature">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-text">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="trust-label">Trusted by Industry Leaders</div>
            <div className="trust-logos">
              {trustLogos.map((logo, i) => (
                <div key={i} className="trust-logo">
                  {logo.icon}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={scrollToContent}
        style={{ cursor: "pointer" }}
      >
        <span>Explore Our Story</span>
        <i className="bi bi-chevron-down"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
