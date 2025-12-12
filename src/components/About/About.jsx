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
          Prince House Films is a creative studio crafting cinematic and digital
          content. We partner with brands and creators to produce visually
          stunning films, commercials, and social content. Our approach blends
          technical skill with artistic direction from concept through
          distribution.
        </p>
        <a href="#contact" className="cta-button">
          Work With Us
        </a>
      </div>
    </section>
  );
};

export default About;
