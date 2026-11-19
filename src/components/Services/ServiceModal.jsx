// src/components/Services/ServiceModal.jsx

import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { BiChevronRight, BiX } from "react-icons/bi";
import "./ServiceModal.css";
import MediaEmbed, { VideoPlayerProvider } from "../MediaEmbed";
import ErrorBoundary from "../ErrorBoundary";
import { useSanityData } from "../../lib/useSanityData";
import { siteSettingsQuery, errorBoundaryQuery } from "../../lib/queries";
import { fallbackSiteSettings, fallbackErrorBoundary } from "../../lib/fallbacks";

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

  const { data: errorBoundaryData } = useSanityData(
    errorBoundaryQuery,
    {},
    fallbackErrorBoundary
  );

  const contentItems = useMemo(() => {
    if (!serviceData?.mediaItems?.length) return [];

    return serviceData.mediaItems.map((item) => ({
      type:
        item.type === "video"
          ? item.videoFile
            ? "sanity_video"
            : "external_video"
          : item.image
            ? "sanity_image"
            : "external_image",
      title: item.title || "",
      alt: item.alt || "",
      image: item.image || null,
      imageUrl: item.imageUrl || "",
      videoUrl: item.videoUrl || "",
      videoFile: item.videoFile || null,
      videoPoster: item.videoPoster || null,
      videoPosterUrl: item.videoPosterUrl || "",
      duration: item.duration || "",
      redirectUrl: item.externalUrl || "",
    }));
  }, [serviceData]);

  if (!serviceData) return null;

  // Rendered into <body>: the section ancestors set position/z-index, which
  // would trap this fixed overlay under the fixed header.
  return createPortal(
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
            <ErrorBoundary fallbackText={errorBoundaryData?.fallbackText}>
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
    </>,
    document.body
  );
};

export default ServiceModal;
