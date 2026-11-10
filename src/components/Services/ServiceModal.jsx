// src/components/Services/ServiceModal.jsx

import { useEffect, useMemo } from "react";
import { BiChevronRight, BiX } from "react-icons/bi";
import "./ServiceModal.css";
import MediaEmbed, { VideoPlayerProvider } from "../MediaEmbed";
import ErrorBoundary from "../ErrorBoundary";
import { useSanityData } from "../../lib/useSanityData";
import { siteSettingsQuery } from "../../lib/queries";
import { fallbackSiteSettings } from "../../lib/fallbacks";

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

  const { data: settings } = useSanityData(
    siteSettingsQuery,
    {},
    fallbackSiteSettings
  );

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

  return (
    <>
      <div className="service-modal-backdrop" onClick={onClose} />

      <div className="service-modal" key={serviceData._id}>
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
            <ErrorBoundary>
              {contentItems.map((item, index) => (
                <div
                  key={`${serviceData._id}-${index}-${
                    item.videoUrl ||
                    item.imageUrl ||
                    item.image?._ref ||
                    "img"
                  }`}
                  className="service-modal-grid-item"
                  data-item-type={item.type}
                >
                  <div className="service-modal-thumbnail">
                    <MediaEmbed item={item} index={index} />
                  </div>
                </div>
              ))}
            </ErrorBoundary>
          </div>
        </VideoPlayerProvider>

        <div className="service-modal-footer">
          <div className="service-modal-footer-cta">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="global-view-more-btn"
            >
              {settings.instagramCtaLabel} <BiChevronRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceModal;
