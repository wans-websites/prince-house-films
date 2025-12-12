import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./About.css";
import about1 from "../../assets/img/about1.png";
import about2 from "../../assets/img/about2.png";
import about3 from "../../assets/img/about3.png";

const About = () => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

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

      <div className="about-main">
        {/* MEDIA GRID */}
        <motion.div
          className="about-media"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="media-grid">
            {[about1, about2, about3].map((img, i) => (
              <motion.div
                key={i}
                className={`media-item media-${i}`}
                style={{
                  transform: `perspective(800px) rotateY(${
                    tilt.x / (i + 2)
                  }deg) rotateX(${tilt.y / (i + 2)}deg)`,
                  backgroundImage: `url(${img})`,
                }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className="media-glow"></div>
        </motion.div>

        {/* TEXT OVERLAY */}
        <motion.div
          className="about-text-overlay"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>
            Prince House Films is a creative studio crafting cinematic and
            digital content. We partner with brands and creators to produce
            visually stunning films, commercials, and social content. Our
            approach blends technical skill with artistic direction from concept
            through distribution.
          </p>
          <a href="#contact" className="cta-button">
            Work With Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
