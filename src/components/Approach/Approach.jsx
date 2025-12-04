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

const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We begin by deeply understanding your vision, audience, and objectives. Through collaborative workshops and research, we develop a comprehensive creative strategy that aligns with your goals and resonates with your target audience.",
    color: "var(--color-primary)",
    bg: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
    features: [
      "Creative Brief",
      "Audience Analysis",
      "Goal Setting",
      "Strategy Development",
    ],
  },
  {
    number: "02",
    title: "Concept & Planning",
    description:
      "Our creative team transforms strategy into compelling concepts. We develop scripts, storyboards, shot lists, and production plans that bring your story to life with cinematic vision and technical precision.",
    color: "var(--color-cyan)",
    bg: "linear-gradient(135deg, var(--color-cyan), var(--color-teal))",
    features: [
      "Script Writing",
      "Storyboarding",
      "Pre-Visualization",
      "Production Planning",
    ],
  },
  {
    number: "03",
    title: "Production & Filming",
    description:
      "Using professional cinema cameras, advanced lighting, and expert crew, we capture stunning visuals that tell your story with emotional impact. We maintain open communication throughout to ensure creative alignment.",
    color: "var(--color-green)",
    bg: "linear-gradient(135deg, var(--color-green), var(--color-teal))",
    features: [
      "Cinematic Capture",
      "Professional Lighting",
      "Audio Recording",
      "Direction",
    ],
  },
  {
    number: "04",
    title: "Post-Production",
    description:
      "Our editors, colorists, and sound designers work their magic to craft the final product. From editing to color grading, sound design to visual effects, we polish every detail to perfection.",
    color: "var(--color-purple)",
    bg: "linear-gradient(135deg, var(--color-purple), var(--color-indigo))",
    features: ["Editing", "Color Grading", "Sound Design", "Visual Effects"],
  },
  {
    number: "05",
    title: "Delivery & Impact",
    description:
      "We deliver final assets in all required formats and provide distribution guidance. Our partnership continues with performance analysis and support to maximize your content's impact.",
    color: "var(--color-orange)",
    bg: "linear-gradient(135deg, var(--color-orange), var(--color-yellow))",
    features: [
      "Final Delivery",
      "Format Optimization",
      "Distribution Strategy",
      "Performance Analysis",
    ],
  },
];

const showcaseItems = [
  {
    icon: <FaLightbulb />,
    title: "Innovative Thinking",
    description:
      "Fresh perspectives and creative solutions for every project challenge",
  },
  {
    icon: <FaHandshake />,
    title: "Client Partnership",
    description:
      "Collaborative approach with transparent communication at every stage",
  },
  {
    icon: <BiPlayCircle />,
    title: "Quality Assurance",
    description:
      "Rigorous quality checks ensuring broadcast-ready final products",
  },
];

export default function Approach() {
  return (
    <section className="phf-section approach-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Creative Process
        </motion.h2>
        <p className="section-subtitle">
          From initial concept to final delivery, our proven 5-step process
          ensures every project receives the attention to detail, creative
          excellence, and strategic thinking it deserves.
        </p>

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
              <div className="showcase-icon">{item.icon}</div>
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
            "Every great film begins with a great story. Our process ensures
            your story is told with the creativity, precision, and passion it
            deserves."
          </p>
          <p
            style={{
              color: "var(--color-primary)",
              fontSize: "18px",
              marginTop: "16px",
              fontWeight: "600",
            }}
          >
            — Prince House Films Team
          </p>
        </motion.div>
      </div>
    </section>
  );
}
