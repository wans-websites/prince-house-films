import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiX } from "react-icons/bi";
import "./ServiceModal.css";

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

  // Sample content data - you can fetch this from API or separate data file
  const getServiceContent = (serviceTitle) => {
    const contentMap = {
      "Cinematic / Videography": [
        {
          type: "video",
          url: "https://instagram.com/p/sample1",
          thumbnail:
            "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://instagram.com/p/sample2",
          thumbnail:
            "https://images.unsplash.com/photo-1542751110-97427bbecf20?w-400&h=500&fit=crop",
        },
        {
          type: "video",
          url: "https://instagram.com/p/sample3",
          thumbnail:
            "https://images.unsplash.com/photo-1551796880-ddd03d8b43ac?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://youtube.com/watch/sample",
          thumbnail:
            "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://vimeo.com/sample",
          thumbnail:
            "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=500&fit=crop",
        },
        {
          type: "video",
          url: "https://instagram.com/p/sample6",
          thumbnail:
            "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=500&fit=crop",
        },
      ],
      "Creative Content": [
        {
          type: "video",
          url: "https://player.cloudinary.com/embed/?cloud_name=dlzstmm4e&public_id=IMG_9457_kpeuab",
          thumbnail:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1768637270/IMG_9457_kpeuab.mov",
        },
        {
          type: "video",
          url: "https://instagram.com/p/creative2",
          thumbnail:
            "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://instagram.com/p/creative3",
          thumbnail:
            "https://images.unsplash.com/photo-1611162616305-c69b3fa7a16b?w=400&h=500&fit=crop",
        },
      ],
      "Motion Graphics": [
        {
          type: "video",
          url: "https://vimeo.com/motion1",
          thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=500&fit=crop",
        },
        {
          type: "video",
          url: "https://youtube.com/watch/motion2",
          thumbnail:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://instagram.com/p/motion3",
          thumbnail:
            "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=500&fit=crop",
        },
      ],
      "Graphic Design": [
        {
          type: "image",
          url: "https://behance.net/project1",
          thumbnail:
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://dribbble.com/shots/design1",
          thumbnail:
            "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://instagram.com/p/design3",
          thumbnail:
            "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400&h=500&fit=crop",
        },
      ],
      "Event Coverage": [
        {
          type: "video",
          url: "https://youtube.com/watch/event1",
          thumbnail:
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=500&fit=crop",
        },
        {
          type: "image",
          url: "https://instagram.com/p/event2",
          thumbnail:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=500&fit=crop",
        },
        {
          type: "video",
          url: "https://vimeo.com/event3",
          thumbnail:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=500&fit=crop",
        },
      ],
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
                    <img
                      src={item.thumbnail}
                      alt={`${serviceData.title} content ${index + 1}`}
                      loading="lazy"
                    />
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
