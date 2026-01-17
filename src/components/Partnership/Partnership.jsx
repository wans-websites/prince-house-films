import React from "react";
import { motion } from "framer-motion";
import "./Partnership.css";

// Import all partner images
import partners from "./partnerImages";

// Import only the icons we actually use
import { BiBuilding, BiMovie, BiGlobe } from "react-icons/bi";

const Partnerships = () => {
  const partnershipTypes = [
    {
      icon: <BiBuilding />,
      title: "Brand Partnerships",
      description:
        "Long-term collaborations with brands for consistent content production",
      features: [
        "Monthly content production",
        "Brand integration",
        "Performance analytics",
        "Strategic planning",
      ],
    },
    {
      icon: <BiMovie />,
      title: "Production Collaboration",
      description: "Joint film and documentary projects with shared resources",
      features: [
        "Equipment sharing",
        "Talent collaboration",
        "Post-production facilities",
        "Distribution networks",
      ],
    },
    {
      icon: <BiGlobe />,
      title: "Distribution Partnerships",
      description: "Content distribution through established media networks",
      features: [
        "Global reach",
        "Multiple platforms",
        "Revenue sharing",
        "Marketing support",
      ],
    },
  ];

  return (
    <section id="partnerships" className="phf-section partnerships-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Valued Partnerships
        </motion.h2>

        {/* Partners Infinite Scroll Slider */}
        <div className="partners-slider-container">
          <div className="partners-track">
            {/* First set of partners */}
            {partners.map((partner, i) => (
              <motion.div
                key={`first-${i}`}
                className="partner-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
              >
                <img
                  src={partner.img}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                />
              </motion.div>
            ))}

            {/* Duplicate for seamless loop */}
            {partners.map((partner, i) => (
              <motion.div
                key={`second-${i}`}
                className="partner-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                viewport={{ once: true }}
              >
                <img
                  src={partner.img}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="partnership-types"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {partnershipTypes.map((type, i) => (
            <motion.div
              key={i}
              className="partnership-type"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              viewport={{ once: true }}
            >
              {/* <div className="type-icon">{type.icon}</div> */}
              <h3 className="type-title">{type.title}</h3>
              <p className="type-description">{type.description}</p>
              <ul className="type-features">
                {type.features.map((feature, j) => (
                  <li key={j}>
                    <i className="bi bi-check-circle"></i> {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="section-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Interested in Partnering With Us?</h3>
          <p>
            Whether you're a brand looking for consistent content, a network
            seeking production partners, or an organization with a story to
            tell, let's explore how we can create something extraordinary
            together.
          </p>
          <div className="cta-buttons">
            <a href="/contact?type=partnership" className="cta-button primary">
              Discuss Partnership <i className="bi bi-handshake"></i>
            </a>
            <a href="/portfolio" className="cta-button secondary">
              View Case Studies <i className="bi bi-folder2-open"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
