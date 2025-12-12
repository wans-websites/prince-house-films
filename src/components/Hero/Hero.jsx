import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import { BiCameraMovie, BiCheckShield, BiTimer } from "react-icons/bi";

const Hero = () => {
  const features = [
    {
      icon: <BiCameraMovie />,
      title: "Cinematic Production",
      description: "Hollywood-quality visuals",
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

  return (
    <section id="home" className="phf-section hero-section">
      <div className="container hero-content">
        {/* MAIN TITLE ANIMATION */}
        <motion.h1
          className="hero-main-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          Transform Your Vision Into{" "}
          <span className="hero-highlight">Cinematic Reality</span>
        </motion.h1>

        {/* CTA BUTTON ANIMATION */}
        <motion.div
          className="hero-cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            className="hero-primary-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Start Your Project <i className="bi bi-arrow-right"></i>
          </motion.a>
        </motion.div>

        {/* FEATURES ANIMATION (STAGGERED) */}
        <motion.div
          className="hero-features"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.15,
                duration: 0.6,
                delay: 0.4,
              },
            },
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="hero-feature"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
