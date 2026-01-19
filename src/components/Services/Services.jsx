import { motion } from "framer-motion";
import { useState } from "react";
import "./Services.css";
import ServiceModal from "./ServiceModal";
import {
  BiPen,
  BiVideoRecording,
  BiSlideshow,
  BiPalette,
} from "react-icons/bi";
import img1 from "../../assets/img/services/creativeContent.gif";
import event from "../../assets/img/services/event.gif";
import motionGraphic from "../../assets/img/services/motion.gif";
import graphic from "../../assets/img/services/graphic.png";

const services = [
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
    <section id="services" className="services-section">
      <div className="services-glow-overlay"></div>
      <div className="services-container">
        <motion.h2
          className="services-section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Creative Services
        </motion.h2>

        <div className="services-bento-container">
          <div className="services-bento-grid">
            {services.map((item, i) => (
              <motion.div
                key={i}
                className={`services-bento-item ${item.hasBg ? "services-has-bg" : ""} ${
                  i === 0 || i === 3 ? "services-featured" : ""
                }`}
                style={{ "--services-bento-bg": `url(${item.bgImage})` }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                onClick={() => handleServiceClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleServiceClick(item);
                  }
                }}
              >
                <div className="services-bento-content">
                  <div>
                    <div className="services-bento-icon">{item.icon}</div>
                    <h3 className="services-bento-title">{item.title}</h3>
                  </div>
                  <p className="services-bento-text">{item.text}</p>
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
