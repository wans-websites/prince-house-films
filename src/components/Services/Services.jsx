import { motion } from "framer-motion";
import { useState } from "react";
import "./Services.css";
import ServiceModal from "./ServiceModal"; // Add this import
import {
  BiCameraMovie,
  BiPen,
  BiVideoRecording,
  BiSlideshow,
  BiPalette,
} from "react-icons/bi";
import img1 from "../../assets/img/services/creativeContent.gif";
import event from "../../assets/img/services/event.gif";
import motionGraphic from "../../assets/img/services/motion.gif";
import cinematic from "../../assets/img/services/videography.gif";
import graphic from "../../assets/img/services/graphic.png";

const services = [
  {
    title: "Cinematic / Videography",
    text: "",
    icon: <BiCameraMovie />,
    bgImage: cinematic,
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
    title: "Motion Graphics",
    text: "Dynamic animations, explainer videos, and cinematic title sequences that bring concepts to life.",
    icon: <BiSlideshow />,
    bgImage: motionGraphic,
    hasBg: true,
  },
  {
    title: "Graphic Design",
    text: "Visual identity, branding, and design systems that communicate your brand's essence effectively.",
    icon: <BiPalette />,
    bgImage: graphic,
    hasBg: true,
  },
  {
    title: "Event Coverage",
    text: "Where Visual storytelling meets strategy",
    icon: <BiVideoRecording />,
    bgImage: event,
    hasBg: true,
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300); // Clear after animation
  };

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
                  i === 1 || i === 4 ? "featured" : ""
                }`}
                style={{ "--bento-bg": `url(${item.bgImage})` }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                // whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                // onClick={() => handleServiceClick(item)}
                role="button"
                tabIndex={0}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter" || e.key === " ") {
                //     handleServiceClick(item);
                //   }
                // }}
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

        {/* Service Modal */}
        <ServiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          serviceData={selectedService}
        />
      </div>
    </section>
  );
}
