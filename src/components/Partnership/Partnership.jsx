import React from "react";
import { motion } from "framer-motion";
import "./Partnerships.css";
import {
  BiBuilding,
  BiMovie,
  BiGlobe,
  BiShield,
  BiTrendingUp,
  BiGroup,
} from "react-icons/bi";

const Partnerships = () => {
  const partners = [
    {
      name: "Netflix",
      category: "Streaming Platform",
      description: "Content distribution and production collaboration",
      logo: "N",
    },
    {
      name: "BBC Studios",
      category: "Broadcast Network",
      description: "Documentary production and content licensing",
      logo: "BBC",
    },
    {
      name: "National Geographic",
      category: "Media Network",
      description: "Documentary filmmaking and expedition coverage",
      logo: "NG",
    },
    {
      name: "MTV Africa",
      category: "Music Television",
      description: "Music video production and event coverage",
      logo: "MTV",
    },
    {
      name: "CNN International",
      category: "News Network",
      description: "News feature production and documentary segments",
      logo: "CNN",
    },
    {
      name: "Disney Africa",
      category: "Entertainment",
      description: "Family content production and brand campaigns",
      logo: "D",
    },
    {
      name: "YouTube Originals",
      category: "Digital Platform",
      description: "Original content production and distribution",
      logo: "YT",
    },
    {
      name: "United Nations",
      category: "Non-Profit",
      description: "Documentary storytelling for global initiatives",
      logo: "UN",
    },
  ];

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
        >
          Our Valued Partnerships
        </motion.h2>

        <p className="section-subtitle">
          We collaborate with leading brands, networks, and organizations to
          create impactful content that reaches global audiences and drives
          meaningful change.
        </p>

        <div className="partners-grid">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="partner-card phf-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
            >
              <div className="partner-logo">
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: "var(--color-default)",
                    opacity: 0.8,
                  }}
                >
                  {partner.logo}
                </span>
              </div>

              <h3 className="partner-name">{partner.name}</h3>
              <div className="partner-category">{partner.category}</div>
              <p className="partner-description">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="partnership-types"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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
            >
              <div className="type-icon">{type.icon}</div>
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
          style={{
            marginTop: "80px",
            textAlign: "center",
            padding: "50px",
            background:
              "linear-gradient(135deg, rgba(255, 4, 0, 0.1), rgba(13, 110, 253, 0.1))",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "32px",
              color: "var(--color-default)",
              margin: "0 0 16px 0",
            }}
          >
            Interested in Partnering With Us?
          </h3>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "18px",
              margin: "0 0 30px 0",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Whether you're a brand looking for consistent content, a network
            seeking production partners, or an organization with a story to
            tell, let's explore how we can create something extraordinary
            together.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/contact?type=partnership"
              className="cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 42px",
                background:
                  "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
                color: "white",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(255, 4, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 15px 35px rgba(255, 4, 0, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 30px rgba(255, 4, 0, 0.3)";
              }}
            >
              Discuss Partnership <i className="bi bi-handshake"></i>
            </a>

            <a
              href="/portfolio"
              className="cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 42px",
                background: "transparent",
                color: "var(--color-default)",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.background = "transparent";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              View Case Studies <i className="bi bi-folder2-open"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
