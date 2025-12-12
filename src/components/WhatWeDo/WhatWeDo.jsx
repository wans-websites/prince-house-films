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
import documentary from "../../assets/img/documentary.gif";
import event from "../../assets/img/event.gif";
import cinematic from "../../assets/img/cinematic.gif";
import graphic from "../../assets/img/graphic.gif";
import stream from "../../assets/img/stream.gif";

const services = [
  {
    title: "Cinematic Videography",
    text: "",
    icon: <BiCameraMovie />,
    bgImage: event,
    hasBg: true,
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
    bgImage: cinematic,
    hasBg: true,
  },
  {
    title: "Live Streaming",
    text: "Professional multi-platform live broadcasts for events, launches, and conferences with studio-quality production.",
    icon: <FaPlayCircle />,
    bgImage: stream,
    hasBg: true,
  },
  {
    title: "Motion Graphics",
    text: "Dynamic animations, explainer videos, and cinematic title sequences that bring concepts to life.",
    icon: <BiSlideshow />,
    bgImage: graphic,
    hasBg: true,
  },
  {
    title: "Graphic Design",
    text: "Visual identity, branding, and design systems that communicate your brand's essence effectively.",
    icon: <BiPalette />,
    bgImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800",
    hasBg: true,
  },
  // {
  //   title: "Social Media Strategy",
  //   text: "Comprehensive digital strategy, content management, and growth solutions for consistent online presence.",
  //   icon: <BiRocket />,
  //   bgImage:
  //     "https://images.unsplash.com/photo-1611162616305-c69b3fa7a16b?q=80&w=800",
  //   hasBg: true,
  // },
  {
    title: "Event Coverage",
    text: "Complete professional coverage of corporate events, launches, and celebrations with cinematic flair.",
    icon: <BiVideoRecording />,
    bgImage: documentary,
    hasBg: true,
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
      </div>
    </section>
  );
}
