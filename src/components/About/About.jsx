import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./About.css";
import about1 from "../../assets/img/about1.png";
import about2 from "../../assets/img/about2.png";
import about3 from "../../assets/img/about3.png";

const TextBlock = ({ title, subtitle, paragraph }) => (
  <>
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h1>

    <motion.h3
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.12 }}
    >
      {subtitle}
    </motion.h3>

    <motion.p
      className="mt-4 lead"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.24 }}
    >
      {paragraph}
    </motion.p>
  </>
);

const About = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
        });
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [controls]);

  function handleMouseMove(e) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18; // -9 .. 9
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10; // -5 .. 5
    setTilt({ x, y });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const title = "Who We Are";
  const subtitle =
    "Prince House Films: Cinematic Storytelling & Visual Strategy";

  const paragraph = `Prince House Films is a boutique full-service creative production studio specializing in cinematic storytelling, branded video, and immersive digital content. We partner with visionary brands, nonprofits, agencies, and creators to craft high-impact films, social-first content, commercials, and documentary shorts. Using industry-leading production, direction, and post-production techniques, we transform ideas into compelling visual experiences that increase engagement, grow audiences, and drive measurable results.

  Our team blends technical expertise, artistic direction, and strategic thinking, from concept and script through shooting, color grading, motion design, and distribution strategy. We prioritize originality, authenticity, and storytelling that resonates across platforms. Whether you need a brand film, product launch video, event coverage or a social series, Prince House Films brings clarity, passion, and cinematic craft to every project. Reach out to collaborate, let’s tell something unforgettable.`;

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <div className="about-wrapper">
        <div
          className="about-row"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label="About Prince House Films"
        >
          <div className="about-left">
            <TextBlock
              title={title}
              subtitle={subtitle}
              paragraph={paragraph}
            />
          </div>

          <div className="about-right">
            <motion.div
              className="photo-grid"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.08 },
                },
              }}
              initial="hidden"
              animate={controls}
            >
              <motion.div
                className="photo photo-a"
                style={{
                  transform: `perspective(800px) rotateY(${
                    tilt.x / 2
                  }deg) rotateX(${tilt.y / 2}deg) translateZ(8px)`,
                  backgroundImage: `url(${about3})`,
                }}
                whileHover={{ scale: 1.02 }}
                aria-hidden
              />

              <motion.div
                className="photo photo-b"
                style={{
                  transform: `perspective(800px) rotateY(${
                    tilt.x / 3
                  }deg) rotateX(${tilt.y / 3}deg) translateZ(4px)`,
                  backgroundImage: `url(${about1})`,
                }}
                whileHover={{ scale: 1.02 }}
                aria-hidden
              />

              <motion.div
                className="photo photo-c"
                style={{
                  transform: `perspective(800px) rotateY(${
                    tilt.x / 4
                  }deg) rotateX(${tilt.y / 4}deg)`,
                  backgroundImage: `url(${about2})`,
                }}
                whileHover={{ scale: 1.02 }}
                aria-hidden
              />
            </motion.div>

            <div className="glow" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
