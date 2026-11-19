import { motion } from "framer-motion";
import "./Approach.css";
import {
  BiSearchAlt,
  BiPencil,
  BiCamera,
  BiEdit,
  BiCheckCircle,
  BiPlayCircle,
} from "react-icons/bi";
import { FaLightbulb, FaHandshake } from "react-icons/fa";
import { useSanityData } from "../../lib/useSanityData";
import { approachQuery } from "../../lib/queries";
import { fallbackApproach } from "../../lib/fallbacks";

const showcaseIconMap = {
  lightbulb: <FaLightbulb />,
  handshake: <FaHandshake />,
  "play-circle": <BiPlayCircle />,
};

export default function Approach() {
  const { data } = useSanityData(approachQuery, {}, fallbackApproach);

  const processSteps = data.steps;
  const showcaseItems = data.showcase;

  return (
    <section className="phf-section approach-section" id="approach">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {data.sectionTitle}
        </motion.h2>
        {/* <p className="section-subtitle">
          From initial concept to final delivery, our proven 5-step process
          ensures every project receives the attention to detail, creative
          excellence, and strategic thinking it deserves.
        </p> */}

        <div className="process-container">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="step-number"
                style={{
                  "--step-bg": step.bg,
                  "--step-color": step.color,
                }}
              >
                {step.number}
              </div>

              <motion.div
                className="step-content phf-card"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <h3
                  className="step-title"
                  style={{ "--step-color": step.color }}
                >
                  {step.title}
                  <i
                    className="bi bi-arrow-right"
                    style={{ color: step.color }}
                  ></i>
                </h3>
                <p className="step-description">{step.description}</p>

                <div className="step-features">
                  {step.features.map((feature, j) => (
                    <span
                      key={j}
                      className="feature-tag"
                      style={{ "--step-color": step.color }}
                    >
                      <i className="bi bi-check-circle"></i> {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="creative-showcase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {showcaseItems.map((item, i) => (
            <motion.div
              key={i}
              className="showcase-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="showcase-icon">
                {showcaseIconMap[item.iconKey] || showcaseIconMap.lightbulb}
              </div>
              <h4 className="showcase-title">{item.title}</h4>
              <p className="showcase-desc">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="process-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: "60px",
            padding: "30px",
            background:
              "linear-gradient(135deg, rgba(255, 4, 0, 0.1), rgba(13, 110, 253, 0.1))",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "20px",
              lineHeight: "1.6",
              margin: "0",
              fontStyle: "italic",
            }}
          >
            {data.processNote}
          </p>
          <p
            style={{
              color: "var(--color-primary)",
              fontSize: "18px",
              marginTop: "16px",
              fontWeight: "600",
            }}
          >
            {data.processNoteAttribution}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
