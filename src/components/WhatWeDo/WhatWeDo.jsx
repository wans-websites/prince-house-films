import { motion } from "framer-motion";
import "./WhatWeDo.css";
import {
  BiCameraMovie,
  BiPen,
  BiVideoRecording,
  BiSlideshow,
  BiPalette,
  BiRocket,
} from "react-icons/bi";
import { FaFilm, FaPlayCircle, FaEdit } from "react-icons/fa";
import img1 from "../../assets/img/service1.JPG";

const services = [
  {
    title: "Cinematic Videography",
    text: "Professional film production for commercials, corporate films, and events with cinematic quality and emotional storytelling.",
    icon: <BiCameraMovie />,
    bgImage:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=800",
    hasBg: false,
  },
  {
    title: "Creative Content",
    text: "Engaging digital content designed for social media, campaigns, and brand storytelling that captures attention.",
    icon: <BiPen />,
    bgImage: img1,
    hasBg: true,
  },
  {
    title: "Documentary Production",
    text: "Authentic storytelling that informs, educates, and inspires audiences with real-life narratives.",
    icon: <FaFilm />,
    bgImage:
      "https://images.unsplash.com/photo-1601933470928-cacb3d78ad6b?q=80&w=800",
    hasBg: false,
  },
  {
    title: "Live Streaming",
    text: "Professional multi-platform live broadcasts for events, launches, and conferences with studio-quality production.",
    icon: <FaPlayCircle />,
    bgImage:
      "https://images.unsplash.com/photo-1581090700227-3f99b85ee1c9?q=80&w=800",
    hasBg: false,
  },
  {
    title: "Motion Graphics",
    text: "Dynamic animations, explainer videos, and cinematic title sequences that bring concepts to life.",
    icon: <BiSlideshow />,
    bgImage:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=800",
    hasBg: true,
  },
  {
    title: "Graphic Design",
    text: "Visual identity, branding, and design systems that communicate your brand's essence effectively.",
    icon: <BiPalette />,
    bgImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
    hasBg: false,
  },
  {
    title: "Social Media Strategy",
    text: "Comprehensive digital strategy, content management, and growth solutions for consistent online presence.",
    icon: <BiRocket />,
    bgImage:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7a16b?q=80&w=800",
    hasBg: false,
  },
  {
    title: "Event Coverage",
    text: "Complete professional coverage of corporate events, launches, and celebrations with cinematic flair.",
    icon: <BiVideoRecording />,
    bgImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800",
    hasBg: true,
  },
  {
    title: "Post-Production",
    text: "Expert editing, color grading, sound design, and visual effects to perfect your final product.",
    icon: <FaEdit />,
    bgImage:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800",
    hasBg: false,
  },
];

export default function WhatWeDo() {
  return (
    <section id="services" className="phf-section whatwedo-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Creative Services
        </motion.h2>
        <p className="section-subtitle">
          We offer a full spectrum of film and media production services, from
          concept to final delivery. Each project receives our signature blend
          of creativity, technical excellence, and storytelling passion.
        </p>

        <div className="bento-container">
          <div className="bento-grid">
            {services.map((item, i) => (
              <motion.div
                key={i}
                className={`bento-item ${item.hasBg ? "has-bg" : ""} ${
                  i === 1 || i === 4 || i === 7 ? "featured" : ""
                }`}
                style={{ "--bento-bg": `url(${item.bgImage})` }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <div className="bento-content">
                  <div>
                    <div className="bento-icon">{item.icon}</div>
                    <h3 className="bento-title">{item.title}</h3>
                  </div>
                  <p className="bento-text">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* 
        <motion.div
          className="section-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: "60px", textAlign: "center" }}
        >
          <p
            style={{
              color: "var(--color-gray)",
              fontSize: "18px",
              marginBottom: "20px",
            }}
          >
            Ready to bring your vision to life?
          </p>
          <a
            href="/contact"
            className="phf-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
              color: "white",
              textDecoration: "none",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "16px",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(255, 4, 0, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 12px 30px rgba(255, 4, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 25px rgba(255, 4, 0, 0.3)";
            }}
          >
            Start Your Project{" "}
            <i className="bi bi-arrow-right" style={{ fontSize: "18px" }}></i>
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
