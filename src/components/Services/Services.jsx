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

// A fixed display order keeps the bento composition independent of Sanity
// document ordering and orderRank values.
const SERVICE_ORDER = [
  "hotels & resorts",
  "real estate",
  "events",
  "retail & shopping malls",
  "motion graphics",
];

const BENTO_AREAS = ["featured", "side1", "side2", "bottom1", "bottom2"];

const ICON_MAP = {
  pen: <BiPen />,
  slideshow: <BiSlideshow />,
  palette: <BiPalette />,
  video: <BiVideoRecording />,
};

const normalizeTitle = (title) =>
  String(title || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

const isExcludedService = (item) => {
  if (!item) return true;
  if (EXCLUDED_SERVICE_IDS.has(item._id)) return true;
  return EXCLUDED_SERVICE_TITLES.has(normalizeTitle(item.title));
};

const YOUTUBE_THUMB = (url) => {
  const id = getYouTubeId(url);
  // hqdefault.jpg always exists for every public YouTube video; maxresdefault
  // 404s for many uploads and would render blank inside a CSS background.
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

// A CSS background pointing at an HTML page (Instagram reel, YouTube watch URL)
// renders as a broken layer, so only real image URLs are accepted.
const isImageUrl = (url) =>
  /\.(jpe?g|png|gif|webp|avif|svg)(\?.*)?$/i.test(url) ||
  /res\.cloudinary\.com\/.*\/image\/upload/i.test(url);

export default function Services({ services = [] }) {
  const [selectedService, setSelectedService] = useState(null);
  const { data: sectionData } = useSanityData(
    servicesSectionQuery,
    {},
    fallbackServicesSection
  );

  const bentoServices = useMemo(() => {
    const visible = services
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !isExcludedService(item))
      .sort((a, b) => {
        const rankA = SERVICE_ORDER.indexOf(normalizeTitle(a.item.title));
        const rankB = SERVICE_ORDER.indexOf(normalizeTitle(b.item.title));
        const orderA = rankA === -1 ? Number.MAX_SAFE_INTEGER : rankA;
        const orderB = rankB === -1 ? Number.MAX_SAFE_INTEGER : rankB;
        return orderA - orderB || a.index - b.index;
      })
      .map(({ item }) => item);

    const featuredItem = visible.find((item) => item.featured) || visible[0];
    const ordered = featuredItem
      ? [featuredItem, ...visible.filter((item) => item !== featuredItem)]
      : visible;

    return ordered.slice(0, BENTO_AREAS.length).map((item, index) => {
      let bgImage = "";

      // Title matching is kept as a fallback for documents that never filled
      // localFallbackKey.
      const fallbackKey =
        item.localFallbackKey && item.localFallbackKey !== "none"
          ? item.localFallbackKey
          : normalizeTitle(item.title) === "motion graphics"
            ? "motion"
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
        const raw = String(item.backgroundVideoUrl || "").trim();
        const candidate = YOUTUBE_THUMB(raw) || raw;
        bgImage = isImageUrl(candidate) ? candidate : "";
      }

      return {
        ...item,
        title: String(item.title || "").trim(),
        area: BENTO_AREAS[index],
        iconElement: ICON_MAP[item.icon] || <BiPen />,
        bgImage,
        hasBg: Boolean(bgImage),
      };
    });
  }, [services]);

  const handleKeyDown = (event, item) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedService(item);
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="services-glow-overlay"></div>
      <div className="services-container">
        <h2 className="services-section-title">{sectionData.sectionTitle}</h2>

        {bentoServices.length > 0 && (
          <div className="services-bento-grid">
            {bentoServices.map((item) => (
              <div
                key={item._id}
                className={[
                  "services-bento-item",
                  `services-area-${item.area}`,
                  item.hasBg ? "services-has-bg" : "",
                  item.area === "featured" ? "services-featured" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={
                  item.hasBg
                    ? { "--services-bento-bg": `url("${item.bgImage}")` }
                    : undefined
                }
                aria-label={`View ${item.title} details`}
                onClick={() => setSelectedService(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => handleKeyDown(event, item)}
              >
                <div className="services-bento-content">
                  <div className="services-bento-head">
                    <div className="services-bento-icon">{item.iconElement}</div>
                    <h3 className="services-bento-title">{item.title}</h3>
                  </div>
                  <p className="services-bento-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <ServiceModal
          onClose={() => setSelectedService(null)}
          serviceData={selectedService}
        />
      </div>
    </section>
  );
}
