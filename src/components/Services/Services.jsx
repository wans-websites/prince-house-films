// src/components/Services/Services.jsx

import { useMemo, useState } from "react";
import "./Services.css";
import ServiceModal from "./ServiceModal";
import {
  BiPen,
  BiVideoRecording,
  BiSlideshow,
  BiPalette,
} from "react-icons/bi";
import { urlFor } from "../../lib/sanity";
import { getYouTubeId } from "../../lib/mediaUtils";
import motionGif from "../../assets/img/services/motion.gif";
import { useSanityData } from "../../lib/useSanityData";
import { servicesSectionQuery } from "../../lib/queries";
import { fallbackServicesSection } from "../../lib/fallbacks";

// Services removed from the rendered bento. Document IDs are the primary
// identification method; normalized titles are the fallback.
const EXCLUDED_SERVICE_IDS = new Set([
  "service-creative",
  "service-event",
  "service-graphic",
]);

const EXCLUDED_SERVICE_TITLES = new Set([
  "creative content",
  "event coverage",
  "graphic design",
]);

const isExcludedService = (item) => {
  if (!item) return true;
  if (EXCLUDED_SERVICE_IDS.has(item._id)) return true;
  const title = (item.title || "").trim().toLowerCase();
  return EXCLUDED_SERVICE_TITLES.has(title);
};

const iconMap = {
  pen: <BiPen />,
  slideshow: <BiSlideshow />,
  palette: <BiPalette />,
  video: <BiVideoRecording />,
};

const YOUTUBE_THUMB = (url) => {
  const id = getYouTubeId(url);
  // hqdefault.jpg always exists for every public YouTube video; maxresdefault
  // 404s for many uploads and would render blank inside a CSS background.
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

export default function Services({ services = [] }) {
  const [selectedService, setSelectedService] = useState(null);
  const { data: sectionData } = useSanityData(
    servicesSectionQuery,
    {},
    fallbackServicesSection
  );

  const mappedServices = useMemo(() => {
    const visible = services.filter((item) => !isExcludedService(item));

    // Place the featured card first so the bento composition is stable
    // regardless of Sanity document ordering or orderRank values.
    const featuredItem = visible.find((item) => item.featured);
    const ordered = featuredItem
      ? [featuredItem, ...visible.filter((item) => item !== featuredItem)]
      : visible;

    return ordered.map((item) => {
      let bgImage = "";

      // Title-match preserved as fallback for docs that haven't
      // filled localFallbackKey yet (existing docs have 'none').
      const fallbackKey =
        item.localFallbackKey && item.localFallbackKey !== "none"
          ? item.localFallbackKey
          : item.title === "Motion Graphics" ? "motion"
          : "none";
      if (fallbackKey === "motion") {
        bgImage = motionGif;
      } else if (item.backgroundType === "image" && item.backgroundImage) {
        bgImage = urlFor(item.backgroundImage)
          .width(1200)
          .height(900)
          .fit("crop")
          .url();
      } else {
        const raw = item.backgroundVideoUrl || "";
        // YouTube watch/shorts/youtu.be URLs are HTML pages, not images — swap to
        // the static thumbnail so the bento card actually shows something.
        bgImage = YOUTUBE_THUMB(raw) || raw;
      }

      return {
        ...item,
        iconElement: iconMap[item.icon] || <BiPen />,
        bgImage,
        hasBg: Boolean(bgImage),
      };
    });
  }, [services]);

  return (
    <section id="services" className="services-section">
      <div className="services-glow-overlay"></div>
      <div className="services-container">
        <h2 className="services-section-title">{sectionData.sectionTitle}</h2>

        <div className="services-bento-container">
          <div className="services-bento-grid">
            {mappedServices.map((item) => (
              <div
                key={item._id}
                className={`services-bento-item ${item.hasBg ? "services-has-bg" : ""} ${
                  item.featured ? "services-featured" : ""
                }`}
                style={{ "--services-bento-bg": `url(${item.bgImage})` }}
                aria-label={`View ${item.title} details`}
                onClick={() => setSelectedService(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedService(item);
                  }
                }}
              >
                <div className="services-bento-content">
                  <div>
                    <div className="services-bento-icon">
                      {item.iconElement}
                    </div>
                    <h3 className="services-bento-title">{item.title}</h3>
                  </div>
                  <p className="services-bento-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ServiceModal
          onClose={() => setSelectedService(null)}
          serviceData={selectedService}
        />
      </div>
    </section>
  );
}
