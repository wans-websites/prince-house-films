import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronRight, BiX } from "react-icons/bi";
import "./ServiceModal.css";
import MediaEmbed, { VideoPlayerProvider } from "../MediaEmbed";

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
      "Creative Content": [
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9459_yplb1m",
          cloudName: "dlzstmm4e",
          thumbnail:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/c_fill,w_400,h_500,so_0.5/e_blur:500,q_auto/IMG_9459_yplb1m.jpg",
          redirectUrl:
            "https://www.instagram.com/reel/DAyOtJ7IZj4/?igsh=N3ZjajVlNjVrY3Ro",
          title: "Brand Commercial",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9460_in27nw",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DBLWhicogNb/?igsh=djNyYmltZjZqdzZz",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9458_iyqbut",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/C5f0e85oSK-/?igsh=MXNhbmxubGNiYWhqbQ==",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9462_oxhb9t",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DHIazr6oFDJ/?igsh=YzVud2F3Y3Y5cXdp",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9461_iktmk1",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DGxFvJUoDQb/?igsh=MWU5eGxrdTZpejlmdQ==",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_2492_nrejko",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DReIWw6jJVS/?igsh=YzZiZWJnMmVwaHRy",
          title: "Another Project",
          platform: "Instagram",
        },

        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9463_buc6tr",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DReIWw6jJVS/?igsh=YzZiZWJnMmVwaHRy",
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
          redirectUrl:
            "https://www.instagram.com/reel/DBD1eoAKzKW/?igsh=em5nMWNicWo1Mmg3",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_8084_icevnc",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DSiGmsvjLOA/?igsh=ejd4eDF5c2prOGpu",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_7951_g58a5f",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DSfPD9IDHeC/?igsh=NnNseDA4a3M1dTZh",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "ezyZip_p3a45w",
          cloudName: "dlzstmm4e",
          thumbnail: "https://res.cloudinary.com/dlzstmm4e/video/upload/c_fill,w_400,h_300/ezyZip_p3a45w.jpg",
          redirectUrl: "https://www.instagram.com/reel/XXXXX/", // optional
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "ezyZip-2_y7hvbg", // just the public ID
          cloudName: "dlzstmm4e",
          thumbnail: "https://res.cloudinary.com/dlzstmm4e/video/upload/c_fill,w_400,h_300/ezyZip-2_y7hvbg.jpg",
          redirectUrl: "https://www.instagram.com/reel/XXXXX/", // optional
          title: "Another Project",
          platform: "Instagram",
        }
      ],
    };
    return contentMap[serviceTitle] || [];
  };

  const contentItems = getServiceContent(serviceData.title);
  const isGraphicDesign = serviceData.title === "Graphic Design";
  console.log("serviceData.title: ", serviceData.title);

  const showGlobalViewMore =
    serviceData.title === "Creative Content" ||
    serviceData.title === "Motion Graphics";

  const instagramLink =
    "https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs";

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
            data-service-type={isGraphicDesign ? "graphic-design" : "default"}
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
            <VideoPlayerProvider>
              <div className="service-modal-grid">
                {contentItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="service-modal-grid-item"
                    data-item-type={item.type}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 0.99 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="service-modal-thumbnail">
                      <MediaEmbed item={item} index={index} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </VideoPlayerProvider>

            {/* Modal Footer */}
            {/* Modal Footer */}
            <div className="service-modal-footer">
              {showGlobalViewMore ? (
                <div className="service-modal-footer-cta">
                  <a
                    href={instagramLink}
                    target="_self"
                    className="global-view-more-btn"
                  >
                    View Full Portfolio on Instagram{" "}
                    <BiChevronRight size={24} />
                  </a>
                </div>
              ) : (
                <p className="service-modal-footer-note">
                  {isGraphicDesign
                    ? "Previewing design works"
                    : "Click any item to preview full content"}
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
