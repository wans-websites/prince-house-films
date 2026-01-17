import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiX } from "react-icons/bi";
import "./ServiceModal.css";
import MediaEmbed from "../MediaEmbed";

const ServiceModal = ({ isOpen, onClose, serviceData }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
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
          type: "cloudinary_video",
          embedPublicId: "IMG_9459_yplb1m",
          cloudName: "dlzstmm4e",
          thumbnail:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/c_fill,w_400,h_500,so_0.5/e_blur:500,q_auto/IMG_9459_yplb1m.jpg",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Brand Commercial",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9460_in27nw",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9458_iyqbut",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
      "Creative Content": [
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9458_iyqbut",
          cloudName: "dlzstmm4e",
          thumbnail:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/c_fill,w_400,h_500,so_0.5/e_blur:500,q_auto/IMG_9459_yplb1m.jpg",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Brand Commercial",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9462_oxhb9t",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9461_iktmk1",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_2492_nrejko",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9457_kpeuab",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9463_buc6tr",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
      "Motion Graphics": [
        {
          type: "cloudinary_video",
          embedPublicId: "Kara_330ml_1_kkhzrr",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "Vege_Wash_kektrg",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "1000254718_xjijny",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "KARA_coconut_ad_wwqamr",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "ste_ggjgds",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "Kara_Coconut_oil_2_gboknz",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
      "Graphic Design": [
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.10_fmouyf",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_1_zlwhi3",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.11_1_zlwhi3",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_1_zlwhi3",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.11_2_whgb2g",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_2_whgb2g",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.11_ywdd4u",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_ywdd4u",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
      "Event Coverage": [
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9466_dffpzd",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_8084_icevnc",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_7951_g58a5f",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
    };
    return contentMap[serviceTitle] || [];
  };

  const contentItems = getServiceContent(serviceData.title);

  const handleContentClick = (item) => {
    if (item.redirectUrl) {
      window.open(item.redirectUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="service-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="service-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className="service-modal-header">
              <div className="service-modal-header-left">
                <div className="service-modal-icon">{serviceData.icon}</div>
                <div>
                  <h2 className="service-modal-title">{serviceData.title}</h2>
                  <p className="service-modal-subtitle">
                    {contentItems.length} visual contents
                  </p>
                </div>
              </div>
              <button className="service-modal-close-button" onClick={onClose}>
                <BiX size={24} />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="service-modal-grid">
              {contentItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="service-modal-grid-item"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleContentClick(item)}
                  whileHover={{ scale: 0.99 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="service-modal-thumbnail">
                    <MediaEmbed item={item} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="service-modal-footer">
              <p className="service-modal-footer-note">
                Click on any content to view more
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
