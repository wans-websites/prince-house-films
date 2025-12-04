import { motion } from "framer-motion";
import "./WhyUs.css";
import {
  BiStar,
  BiCheckShield,
  BiTime,
  BiUserVoice,
  BiTrendingUp,
  BiAward,
  BiCamera,
  BiVideo,
} from "react-icons/bi";
import { FaCrown, FaUsers } from "react-icons/fa";

const advantages = [
  {
    icon: <BiStar />,
    title: "Creative Excellence",
    description:
      "We don't just produce content—we craft cinematic experiences. Our team of award-winning creatives brings fresh perspectives, innovative ideas, and artistic vision to every project.",
    color: "var(--color-primary)",
    features: [
      "Award-winning creative team",
      "Innovative storytelling approaches",
      "Artistic cinematic vision",
      "Fresh perspectives on every project",
    ],
  },
  {
    icon: <BiCheckShield />,
    title: "Professional Quality",
    description:
      "Broadcast-level production standards with state-of-the-art equipment. From 8K cinema cameras to professional lighting and sound, we deliver premium quality that stands out.",
    color: "var(--color-cyan)",
    features: [
      "State-of-the-art equipment",
      "Broadcast-level production standards",
      "Professional-grade post-production",
      "Quality assurance at every stage",
    ],
  },
  {
    icon: <BiTime />,
    title: "Timely Delivery",
    description:
      "Efficient workflows and deadline-driven processes ensure your project is delivered on time, every time. We respect your timeline while maintaining our quality standards.",
    color: "var(--color-green)",
    features: [
      "Efficient production workflows",
      "Deadline-driven project management",
      "Clear milestone tracking",
      "On-time delivery guarantee",
    ],
  },
  {
    icon: <BiUserVoice />,
    title: "Client-Centered Approach",
    description:
      "Your vision is our priority. We maintain transparent communication, welcome your feedback, and ensure you're involved in every creative decision throughout the process.",
    color: "var(--color-purple)",
    features: [
      "Transparent communication",
      "Collaborative decision-making",
      "Regular progress updates",
      "Flexible to client feedback",
    ],
  },
];

const stats = [
  { number: "200+", label: "Projects Completed" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "50+", label: "Industry Awards" },
  { number: "24/7", label: "Support Available" },
];

export default function WhyUs() {
  return (
    <section className="phf-section whyus-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Prince House Films
        </motion.h2>
        <p className="section-subtitle">
          In a crowded market of content creators, we stand apart through our
          unique blend of cinematic artistry, technical excellence, and
          client-focused partnership. Here's what makes us different.
        </p>

        <div className="advantages-grid">
          {advantages.map((advantage, i) => (
            <motion.div
              key={i}
              className="advantage-card phf-card"
              style={{ "--card-color": advantage.color }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="advantage-icon">{advantage.icon}</div>
              <h3 className="advantage-title">{advantage.title}</h3>
              <p className="advantage-description">{advantage.description}</p>

              <div className="advantage-features">
                {advantage.features.map((feature, j) => (
                  <div key={j} className="feature-item">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="comparison-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="comparison-title">
            The Prince House Films Difference
          </h3>

          <div className="comparison-grid">
            <div className="comparison-column us-column">
              <h4 style={{ "--column-color": "var(--color-primary)" }}>
                With Us
              </h4>
              <div className="comparison-list">
                <div className="comparison-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Strategic creative planning for maximum impact</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Cinematic production quality on every project</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Dedicated project manager and creative team</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Comprehensive post-production with color grading</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Ongoing support and performance analysis</span>
                </div>
              </div>
            </div>

            <div className="comparison-column others-column">
              <h4 style={{ "--column-color": "var(--color-gray)" }}>
                With Others
              </h4>
              <div className="comparison-list">
                <div className="comparison-item">
                  <i className="bi bi-x-circle"></i>
                  <span>Basic video production without strategy</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-x-circle"></i>
                  <span>Standard quality with limited creative input</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-x-circle"></i>
                  <span>Minimal communication and support</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-x-circle"></i>
                  <span>Basic editing without cinematic polish</span>
                </div>
                <div className="comparison-item">
                  <i className="bi bi-x-circle"></i>
                  <span>Project ends at delivery with no follow-up</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="stats-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="final-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: "60px",
            textAlign: "center",
            padding: "40px",
            background:
              "linear-gradient(135deg, rgba(255, 4, 0, 0.1), rgba(13, 110, 253, 0.1))",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
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
            Ready to Experience the Difference?
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
            Join our growing list of satisfied clients who have transformed
            their visual storytelling with Prince House Films. Let's create
            something extraordinary together.
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
              href="/contact"
              className="phf-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                background:
                  "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
                color: "white",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "17px",
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
              Start Your Project{" "}
              <i className="bi bi-arrow-right" style={{ fontSize: "20px" }}></i>
            </a>
            <a
              href="/portfolio"
              className="phf-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                background: "transparent",
                color: "var(--color-default)",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "17px",
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
              View Our Work{" "}
              <i className="bi bi-play-circle" style={{ fontSize: "20px" }}></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
