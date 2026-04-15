// src/components/Services/ServiceModal.jsx

import { useEffect, useMemo } from "react";
import { BiChevronRight, BiX } from "react-icons/bi";
import "./ServiceModal.css";
import MediaEmbed, { VideoPlayerProvider } from "../MediaEmbed";

const ServiceModal = ({ onClose, serviceData }) => {
  useEffect(() => {
    if (!serviceData) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [serviceData, onClose]);

  const contentItems = useMemo(() => {
    if (!serviceData?.mediaItems?.length) return [];

    return serviceData.mediaItems.map((item) => ({
      type:
        item.type === "video"
          ? "external_video"
          : item.image
            ? "sanity_image"
            : "external_image",
      title: item.title || "",
      image: item.image || null,
      imageUrl: item.imageUrl || "",
      videoUrl: item.videoUrl || "",
      redirectUrl: item.externalUrl || "",
    }));
  }, [serviceData]);

  if (!serviceData) return null;

  const instagramLink =
    "https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs";

  return (
    <>
      <div className="service-modal-backdrop" onClick={onClose} />

      <div className="service-modal">
        <div className="service-modal-header">
          <div className="service-modal-header-left">
            <div className="service-modal-icon">{serviceData.iconElement}</div>
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

        <VideoPlayerProvider>
          <div className="service-modal-grid">
            {contentItems.map((item, index) => (
              <div
                key={`${serviceData._id}-${index}`}
                className="service-modal-grid-item"
                data-item-type={item.type}
              >
                <div className="service-modal-thumbnail">
                  <MediaEmbed item={item} index={index} />
                </div>
              </div>
            ))}
          </div>
        </VideoPlayerProvider>

        <div className="service-modal-footer">
          <div className="service-modal-footer-cta">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="global-view-more-btn"
            >
              View Full Portfolio on Instagram <BiChevronRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceModal;
