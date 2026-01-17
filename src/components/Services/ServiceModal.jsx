import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiX } from "react-icons/bi";
import "./ServiceModal.css";
import MediaEmbed from "../MediaEmbed";

const ServiceModal = ({ isOpen, onClose, serviceData }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !serviceData) return null;

  const getServiceContent = (serviceTitle) => {
    const contentMap = {
      "Cinematic / Videography": [
        {
          type: "cloudinary_video", // Specific type for your Cloudinary videos
          embedPublicId: "IMG_9457_kpeuab", // Your Cloudinary public ID
          thumbnail:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1768637270/IMG_9457_kpeuab.mov",
          title: "Brand Commercial",
        },
        {
          type: "instagram_embed",
          embedUrl: "https://www.instagram.com/p/Ct4lWygNJ4P/embed", // Real Instagram embed URL
          postUrl: "https://instagram.com/p/Ct4lWygNJ4P", // Link to the actual post
          title: "Instagram Reel",
        },
        {
          type: "vimeo_video",
          videoId: "824804225", // Vimeo video ID
          title: "Showcase Video",
        },
      ],
      // ... other services
    };
    return contentMap[serviceTitle] || [];
  };

  const contentItems = getServiceContent(serviceData.title);

  const handleContentClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="service-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="service-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="header-left">
                <div className="modal-icon">{serviceData.icon}</div>
                <div>
                  <h2 className="modal-title">{serviceData.title}</h2>
                  <p className="modal-subtitle">
                    {contentItems.length} visual contents
                  </p>
                </div>
              </div>
              <button className="close-button" onClick={onClose}>
                <BiX size={24} />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="modal-content-grid">
              {contentItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="grid-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleContentClick(item.url)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="item-thumbnail">
                    <MediaEmbed item={item} />
                    {item.type === "video" && (
                      <div className="video-indicator">
                        <div className="play-icon">▶</div>
                      </div>
                    )}
                  </div>
                  <div className="item-overlay">
                    <span className="item-type">{item.type}</span>
                    <span className="view-link">View →</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <p className="footer-note">
                Click on any content to view it on its original platform
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
