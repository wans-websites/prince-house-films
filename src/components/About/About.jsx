import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./About.css";
import about1 from "../../assets/img/about1.png";
import about2 from "../../assets/img/about2.png";
import about3 from "../../assets/img/about3.png";
import { BiCameraMovie, BiAward, BiUserVoice, BiRocket } from "react-icons/bi";

const About = () => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const highlights = [
    {
      icon: <BiCameraMovie />,
      title: "Cinematic Excellence",
      description: "Professional film production with cinematic quality",
    },
    {
      icon: <BiAward />,
      title: "Award-Winning Team",
      description: "Recognized for creativity and technical mastery",
    },
    {
      icon: <BiUserVoice />,
      title: "Client Partnership",
      description: "Collaborative approach with transparent communication",
    },
    {
      icon: <BiRocket />,
      title: "Strategic Impact",
      description: "Content that drives measurable business results",
    },
  ];

  return (
    <section
      id="about"
      className="phf-section about-section"
      ref={containerRef}
    >
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="about-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Who We Are
        </motion.h2>

        <p className="about-subtitle">
          Prince House Films: Cinematic Storytelling & Visual Strategy
        </p>

        <div className="about-content">
          <div className="about-text">
            <motion.p
              className="about-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Prince House Films is a boutique full-service creative production
              studio specializing in cinematic storytelling, branded video, and
              immersive digital content. We partner with visionary brands,
              nonprofits, agencies, and creators to craft high-impact films,
              social-first content, commercials, and documentary shorts.
            </motion.p>

            <motion.p
              className="about-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Using industry-leading production, direction, and post-production
              techniques, we transform ideas into compelling visual experiences
              that increase engagement, grow audiences, and drive measurable
              results. Our team blends technical expertise, artistic direction,
              and strategic thinking, from concept and script through shooting,
              color grading, motion design, and distribution strategy.
            </motion.p>

            <div className="about-highlights">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="highlight-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="highlight-icon">{item.icon}</div>
                  <div className="highlight-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/contact"
              className="cta-button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project <i className="bi bi-arrow-right"></i>
            </motion.a>
          </div>

          <div
            className="about-media"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="photo-grid">
              <motion.div
                className="photo photo-a"
                style={{
                  transform: `perspective(800px) rotateY(${
                    tilt.x / 2
                  }deg) rotateX(${tilt.y / 2}deg)`,
                  backgroundImage: `url(${about3})`,
                }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />

              <motion.div
                className="photo photo-b"
                style={{
                  transform: `perspective(800px) rotateY(${
                    tilt.x / 3
                  }deg) rotateX(${tilt.y / 3}deg)`,
                  backgroundImage: `url(${about1})`,
                }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />

              <motion.div
                className="photo photo-c"
                style={{
                  transform: `perspective(800px) rotateY(${
                    tilt.x / 4
                  }deg) rotateX(${tilt.y / 4}deg)`,
                  backgroundImage: `url(${about2})`,
                }}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </div>
            <div className="media-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
