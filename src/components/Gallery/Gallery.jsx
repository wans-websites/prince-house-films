import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";
import {
  BiPlayCircle,
  BiCamera,
  BiCalendar,
  BiMap,
  BiVideo,
} from "react-icons/bi"; // Changed BiLocation to BiMap
import { useSanityData } from "../../lib/useSanityData";
import {
  gallerySectionQuery,
  galleryItemsQuery,
} from "../../lib/queries";
import {
  fallbackGallerySection,
  fallbackGalleryItems,
} from "../../lib/fallbacks";
import MediaEmbed from "../MediaEmbed";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const { data: section } = useSanityData(
    gallerySectionQuery,
    {},
    fallbackGallerySection
  );
  const { data: items } = useSanityData(
    galleryItemsQuery,
    {},
    fallbackGalleryItems
  );

  const filters = (section.categories || []).map((cat) => ({
    id: cat.label === "All" ? "all" : cat.label.toLowerCase().replace(/\s+/g, "-"),
    label: cat.label,
  }));

  const galleryItems = items || [];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = (item) => {
    setActiveImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section id="gallery" className="phf-section gallery-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          {section.sectionTitle}
        </motion.h2>

        <p className="section-subtitle">
          {section.intro}
        </p>

        <div className="gallery-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`gallery-filter ${
                activeFilter === filter.id ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="gallery-item phf-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.05 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onClick={() => openLightbox(item)}
            >
              <div
                className="gallery-image"
                role="img"
                aria-label={item.coverAlt || item.title}
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <div className="gallery-overlay">
                <span className="gallery-category">
                  {item.category.replace("-", " ")}
                </span>
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-description">{item.description}</p>
              </div>

              {item.type === "video" && (
                <div className="gallery-play">
                  <BiPlayCircle />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="gallery-view-more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.6 }}
        >
          <a href={section.viewMoreLink} className="view-more-btn">
            {section.viewMoreLabel} <i className="bi bi-images"></i>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && activeImage && (
          <motion.div
            className="gallery-lightbox active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-close" onClick={closeLightbox}>
                <i className="bi bi-x"></i>
              </div>

              <div
                className="lightbox-image"
                style={{ backgroundImage: `url(${activeImage.image})` }}
              />

              {activeImage.mediaItems && activeImage.mediaItems.length > 0 && (
                <div
                  className="lightbox-media-items"
                  style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}
                >
                  {activeImage.mediaItems.map((media, idx) => (
                    <div
                      key={media._key}
                      className="lightbox-media-item"
                      style={{
                        width: "calc(50% - 5px)",
                        aspectRatio: "1",
                        position: "relative",
                      }}
                    >
                      <MediaEmbed item={media} index={idx} />
                    </div>
                  ))}
                </div>
              )}

              <div className="lightbox-info">
                <h3>{activeImage.title}</h3>
                <p>{activeImage.description}</p>

                <div className="lightbox-details">
                  <span>
                    <BiCalendar /> {activeImage.date}
                  </span>
                  <span>
                    <BiMap /> {activeImage.location}
                  </span>{" "}
                  {/* Changed from BiLocation to BiMap */}
                  <span>
                    <BiCamera /> {activeImage.category.replace("-", " ")}
                  </span>
                  <span>
                    <BiVideo />{" "}
                    {activeImage.type === "video" ? "Video" : "Photo"}
                  </span>
                </div>

                {activeImage.type === "video" && (
                  <a
                    href={`/watch/${activeImage.id}`}
                    className="cta-button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 32px",
                      background:
                        "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "50px",
                      fontWeight: "600",
                      fontSize: "15px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 8px 25px rgba(255, 4, 0, 0.3)",
                      marginTop: "20px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 12px 30px rgba(255, 4, 0, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(255, 4, 0, 0.3)";
                    }}
                  >
                    <BiPlayCircle /> Watch Video
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
