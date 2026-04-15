// src/components/About/About.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  const containerRef = useRef(null);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <motion.h2
        className="about-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Who We Are
      </motion.h2>

      <div className="container about-main text-center">
        <p>
          Prince House Films is a full-service creative production company
          specializing in visual storytelling. We help brands, businesses and
          organizations bring their ideas to life through high-quality video
          production, creative content, and digital media solutions. With a
          passion for excellence and innovation, we transform concepts into
          powerful visuals that inspire, engage, and connect with audiences
        </p>
        <a href="#contact" className="cta-button">
          Work With Us
        </a>
      </div>
    </section>
  );
};

export default About;
