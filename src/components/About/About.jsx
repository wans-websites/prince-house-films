// src/components/About/About.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import "./About.css";
import { useSanityData } from "../../lib/useSanityData";
import { aboutQuery } from "../../lib/queries";
import { fallbackAbout } from "../../lib/fallbacks";

const About = () => {
  const containerRef = useRef(null);
  const { data } = useSanityData(aboutQuery, {}, fallbackAbout);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <motion.h2
        className="about-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {data.title}
      </motion.h2>

      <div className="container about-main text-center">
        <p>
          {data.body}
        </p>
        <a href={data.ctaLink} className="cta-button">
          {data.ctaText}
        </a>
      </div>
    </section>
  );
};

export default About;
