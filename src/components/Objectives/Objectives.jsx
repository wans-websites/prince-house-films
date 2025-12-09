import { motion } from "framer-motion";
import "./Objectives.css";
import {
  BiTargetLock,
  BiRocket,
  BiBulb,
  BiHeart,
  BiTrendingUp,
  BiGroup,
  BiAward,
} from "react-icons/bi";

export default function Objectives() {
  const values = [
    {
      icon: <BiBulb />,
      title: "Innovation",
      desc: "Pushing creative boundaries with fresh ideas and cutting-edge techniques",
    },
    {
      icon: <BiHeart />,
      title: "Passion",
      desc: "Driven by genuine love for storytelling and visual excellence",
    },
    {
      icon: <BiTrendingUp />,
      title: "Excellence",
      desc: "Uncompromising quality in every frame and every project",
    },
    {
      icon: <BiGroup />,
      title: "Collaboration",
      desc: "Partnering closely with clients to achieve shared vision",
    },
  ];

  return (
    <section className="phf-section objectives-section" id="approach">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Vision & Mission
        </motion.h2>
        <p className="section-subtitle">
          At Prince House Films, we're driven by more than just producing
          content. We're committed to creating meaningful visual stories that
          inspire action and leave lasting impact.
        </p>

        <div className="vision-mission-grid">
          <motion.div
            className="vision-card phf-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="card-icon">
              <BiTargetLock />
            </div>
            <h3 className="card-title">Our Vision</h3>
            <p className="card-text">
              To become Africa's foremost creative production powerhouse,
              revolutionizing visual storytelling through innovation, cultural
              authenticity, and cinematic excellence. We envision a future where
              African narratives dominate global screens, inspiring generations
              and shaping perceptions worldwide.
            </p>
          </motion.div>

          <motion.div
            className="mission-card phf-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="card-icon">
              <BiRocket />
            </div>
            <h3 className="card-title">Our Mission</h3>
            <p className="card-text">
              To empower brands, organizations, and individuals with compelling
              visual stories that drive growth, foster emotional connections,
              and inspire meaningful action. Through technical mastery, creative
              innovation, and collaborative partnerships, we transform concepts
              into captivating cinematic experiences.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="values-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "32px",
              color: "var(--color-default)",
              textAlign: "center",
              margin: "80px 0 40px",
            }}
          >
            Our Core Values
          </h3>

          <div className="values-grid">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="value-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="value-icon">{value.icon}</div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-desc">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
