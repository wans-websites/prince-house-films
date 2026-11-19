import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Portfolio.css";
import {
  BiPlayCircle,
  BiCalendar,
  BiCamera,
  BiEdit,
  BiGlobe,
  BiAward,
} from "react-icons/bi";
import { useSanityData } from "../../lib/useSanityData";
import {
  portfolioSectionQuery,
  portfolioItemsQuery,
} from "../../lib/queries";
import {
  fallbackPortfolioSection,
  fallbackPortfolioItems,
} from "../../lib/fallbacks";
import MediaEmbed from "../MediaEmbed";

// Cards must stay visible once revealed: without `once`, a card that scrolls
// back out of view animates to opacity 0 and leaves an empty grid cell behind.
const REVEAL = { once: true, amount: 0.15 };

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeItem, setActiveItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: section } = useSanityData(
    portfolioSectionQuery,
    {},
    fallbackPortfolioSection
  );
  const { data: items } = useSanityData(
    portfolioItemsQuery,
    {},
    fallbackPortfolioItems
  );

  const filters = (section.categories || [])
    .filter((cat) => cat && cat.label)
    .map((cat) => ({
      id: cat.label === "All Projects" ? "all" : cat.label.toLowerCase(),
      label: cat.label,
    }));

  const portfolioItems = items || [];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const openModal = (item) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveItem(null);
  };

  // Lock page scrolling while the modal is open and restore the previous value
  // on close, including when the component unmounts mid-open.
  useEffect(() => {
    if (!modalOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return undefined;
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [modalOpen]);

  const handleCardKeyDown = (event, item) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(item);
    }
  };

  return (
    <section id="portfolio" className="phf-section portfolio-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL}
          transition={{ duration: 0.6 }}
        >
          {section.sectionTitle}
        </motion.h2>

        <div className="portfolio-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`filter-btn ${
                activeFilter === filter.id ? "active" : ""
              }`}
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="portfolio-item phf-card"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={REVEAL}
              transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.06 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} project details`}
              onClick={() => openModal(item)}
              onKeyDown={(event) => handleCardKeyDown(event, item)}
            >
              <div
                className="portfolio-image"
                role="img"
                aria-label={item.coverAlt || item.title}
                style={{ backgroundImage: `url("${item.image}")` }}
              />

              <div className="portfolio-overlay">
                <span className="portfolio-category">{item.category}</span>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-description">{item.description}</p>
                <span className="portfolio-link">
                  View Project <i className="bi bi-arrow-right"></i>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && activeItem && (
          <motion.div
            className="portfolio-modal active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.title} project details`}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
                aria-label="Close project details"
              >
                <i className="bi bi-x"></i>
              </button>

              <div className="modal-body">
                <div
                  className="modal-image"
                  style={{ backgroundImage: `url("${activeItem.image}")` }}
                />

                <div className="modal-info">
                  <h3>{activeItem.title}</h3>
                  <p>{activeItem.details}</p>

                  {activeItem.mediaItems && activeItem.mediaItems.length > 0 && (
                    <div className="modal-media-items">
                      {activeItem.mediaItems.map((media, idx) => (
                        <div key={media._key} className="modal-media-item">
                          <MediaEmbed item={media} index={idx} />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="modal-details">
                    <div className="detail-item">
                      <h4>
                        <BiCalendar /> Year
                      </h4>
                      <p>{activeItem.year}</p>
                    </div>

                    <div className="detail-item">
                      <h4>
                        <BiCamera /> Duration
                      </h4>
                      <p>{activeItem.duration}</p>
                    </div>

                    <div className="detail-item">
                      <h4>
                        <BiGlobe /> Client
                      </h4>
                      <p>{activeItem.client}</p>
                    </div>

                    <div className="detail-item">
                      <h4>
                        <BiEdit /> Category
                      </h4>
                      <p>
                        {activeItem.category.charAt(0).toUpperCase() +
                          activeItem.category.slice(1)}
                      </p>
                    </div>
                  </div>

                  {activeItem.awards && activeItem.awards.length > 0 && (
                    <div className="modal-awards">
                      <h4>
                        <BiAward /> Awards &amp; Recognition
                      </h4>
                      <ul>
                        {activeItem.awards.map((award, i) => (
                          <li key={i}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a
                    href={`/project/${activeItem.id}`}
                    className="cta-button modal-cta"
                  >
                    <BiPlayCircle /> Watch Film
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
