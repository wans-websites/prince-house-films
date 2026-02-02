import { motion } from "framer-motion";
import "./Partnerships.css";

import partners from "./partnerImages";

import {
  BiBuilding,
  BiChevronRight,
  BiRocket,
  BiStar,
  BiCheckCircle,
} from "react-icons/bi";

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
      color: "#FF2A26",
      accent: "#FF6B66",
    },
  ];

  return (
    <section id="partnerships" className="partnerships-section">
      {/* Animated Background Elements */}
      <div className="partnerships-background">
        <div className="partnerships-orb partnerships-orb-1"></div>
        <div className="partnerships-orb partnerships-orb-2"></div>
        <div className="partnerships-orb partnerships-orb-3"></div>
        <div className="partnerships-grid"></div>
      </div>

      <div className="partnerships-container">
        {/* Header with animated elements */}
        <motion.div
          className="partnerships-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="partnerships-badge">
            <BiRocket className="partnerships-badge-icon" />
            <span>Strategic Alliances</span>
          </div>
          <motion.h2
            className="partnerships-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Valued{" "}
            <span className="partnerships-title-gradient">Partnerships</span>
          </motion.h2>
          <motion.p
            className="partnerships-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Building lasting relationships that drive creative excellence and
            mutual success
          </motion.p>
        </motion.div>

        {/* Infinite Partner Logos Carousel */}
        <div className="partnerships-carousel-wrapper">
          <div className="partnerships-carousel-track">
            {[...partners, ...partners].map((partner, i) => (
              <motion.div
                key={i}
                className="partnerships-carousel-item"
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="partnerships-carousel-card">
                  <div className="partnerships-carousel-glow"></div>
                  <img
                    src={partner.img}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                  />
                  <div className="partnerships-carousel-overlay">
                    <span>{partner.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Partnership Types - 3D Card Effect */}
        <div className="partnerships-types-wrapper">
          <div className="partnerships-types-grid">
            {partnershipTypes.map((type, i) => (
              <motion.div
                key={i}
                className="partnerships-type-card"
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -15,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                viewport={{ once: true }}
                style={{
                  "--type-color": type.color,
                  "--type-accent": type.accent,
                }}
              >
                {/* Card Background Effects */}
                <div className="partnerships-type-glow"></div>
                <div className="partnerships-type-pattern"></div>

                {/* Icon Container with Floating Animation */}
                <motion.div
                  className="partnerships-type-icon-container"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="partnerships-type-icon-wrapper">
                    {type.icon}
                    <div className="partnerships-type-icon-ring"></div>
                    <div className="partnerships-type-icon-dots">
                      {[...Array(8)].map((_, dotIndex) => (
                        <div
                          key={dotIndex}
                          className="partnerships-type-icon-dot"
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="partnerships-type-title">
                  {type.title}
                  <div className="partnerships-type-title-underline"></div>
                </h3>

                <p className="partnerships-type-description">
                  {type.description}
                </p>

                {/* Features List with Animated Checkmarks */}
                <ul className="partnerships-type-features">
                  {type.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + j * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="partnerships-type-feature-icon"
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BiCheckCircle />
                      </motion.div>
                      <span>{feature}</span>
                      <motion.div
                        className="partnerships-type-feature-line"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.7 + j * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Action Button */}
                <motion.button
                  className="partnerships-type-action"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Partnership</span>
                  <BiChevronRight className="partnerships-type-action-icon" />
                  <div className="partnerships-type-action-sparkle">
                    <BiStar />
                  </div>
                </motion.button>

                {/* Decorative Elements */}
                <div className="partnerships-type-corner partnerships-type-corner-tl"></div>
                <div className="partnerships-type-corner partnerships-type-corner-tr"></div>
                <div className="partnerships-type-corner partnerships-type-corner-bl"></div>
                <div className="partnerships-type-corner partnerships-type-corner-br"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Counter Section */}
        {/* <motion.div
          className="partnerships-stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="partnerships-stats-grid">
            <div className="partnerships-stat">
              <div className="partnerships-stat-icon">
                <BiShieldAlt />
              </div>
              <div className="partnerships-stat-content">
                <motion.div
                  className="partnerships-stat-number"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  50+
                </motion.div>
                <div className="partnerships-stat-label">
                  Active Partnerships
                </div>
              </div>
            </div>

            <div className="partnerships-stat">
              <div className="partnerships-stat-icon">
                <BiTrendingUp />
              </div>
              <div className="partnerships-stat-content">
                <motion.div
                  className="partnerships-stat-number"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  98%
                </motion.div>
                <div className="partnerships-stat-label">Success Rate</div>
              </div>
            </div>

            <div className="partnerships-stat">
              <div className="partnerships-stat-icon">
                <BiSolidBolt />
              </div>
              <div className="partnerships-stat-content">
                <motion.div
                  className="partnerships-stat-number"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  24/7
                </motion.div>
                <div className="partnerships-stat-label">
                  Support & Collaboration
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Enhanced CTA Section */}
        {/* <motion.div
          className="partnerships-cta"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="partnerships-cta-background"></div>

          <div className="partnerships-cta-content">
            <div className="partnerships-cta-badge">
              <BiStar />
              <span>Let's Create Together</span>
            </div>

            <h3 className="partnerships-cta-title">
              Ready to Elevate Your Brand with{" "}
              <span className="partnerships-cta-highlight">
                Cinematic Excellence
              </span>
              ?
            </h3>

            <p className="partnerships-cta-description">
              Whether you're a brand looking for consistent content, a network
              seeking production partners, or an organization with a story to
              tell, let's explore how we can create something extraordinary
              together.
            </p>

            <div className="partnerships-cta-buttons">
              <motion.a
                href="/contact?type=partnership"
                className="partnerships-cta-button partnerships-cta-button-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Discuss Partnership</span>
                <div className="partnerships-cta-button-icon">
                  <BiChevronRight />
                </div>
                <div className="partnerships-cta-button-glow"></div>
              </motion.a>

              <motion.a
                href="/portfolio"
                className="partnerships-cta-button partnerships-cta-button-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Case Studies</span>
                <div className="partnerships-cta-button-icon">
                  <BiChevronRight />
                </div>
              </motion.a>
            </div>
          </div>

          <div className="partnerships-cta-float partnerships-cta-float-1"></div>
          <div className="partnerships-cta-float partnerships-cta-float-2"></div>
          <div className="partnerships-cta-float partnerships-cta-float-3"></div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Partnerships;
