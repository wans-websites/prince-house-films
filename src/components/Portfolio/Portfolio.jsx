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

  const filters = (section.categories || []).map((cat) => ({
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
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section id="portfolio" className="phf-section portfolio-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {section.sectionTitle}
        </motion.h2>
        {/* 
        <p className="section-subtitle">
          Explore our award-winning portfolio of films, documentaries,
          commercials, and digital content that showcases our creative vision
          and technical excellence.
        </p> */}

        <div className="portfolio-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${
                activeFilter === filter.id ? "active" : ""
              }`}
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onClick={() => openModal(item)}
            >
              <div
                className="portfolio-image"
                role="img"
                aria-label={item.coverAlt || item.title}
                style={{ backgroundImage: `url(${item.image})` }}
              />

              <div className="portfolio-overlay">
                <span className="portfolio-category">{item.category}</span>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-description">{item.description}</p>
                <a
                  href="#"
                  className="portfolio-link"
                  onClick={(e) => e.preventDefault()}
                >
                  View Project <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        {/* 
        <motion.div
          className="section-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: "80px", textAlign: "center" }}
        >
          <p
            style={{
              color: "var(--color-gray)",
              fontSize: "18px",
              marginBottom: "30px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Want to see more? Explore our complete portfolio of over 200
            successful projects.
          </p>

          <a
            href="/full-portfolio"
            className="cta-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 42px",
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
              color: "white",
              textDecoration: "none",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "16px",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 30px rgba(255, 4, 0, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 15px 35px rgba(255, 4, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 30px rgba(255, 4, 0, 0.3)";
            }}
          >
            View Full Portfolio <i className="bi bi-collection"></i>
          </a>
        </motion.div> */}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && activeItem && (
          <motion.div
            className="portfolio-modal active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-close" onClick={closeModal}>
                <i className="bi bi-x"></i>
              </div>

              <div className="modal-body">
                <div
                  className="modal-image"
                  style={{ backgroundImage: `url(${activeItem.image})` }}
                />

                <div className="modal-info">
                  <h3>{activeItem.title}</h3>
                  <p>{activeItem.details}</p>

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
                        <BiAward /> Awards & Recognition
                      </h4>
                      <ul
                        style={{
                          color: "rgba(255, 255, 255, 0.7)",
                          fontSize: "14px",
                          paddingLeft: "20px",
                        }}
                      >
                        {activeItem.awards.map((award, i) => (
                          <li key={i}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a
                    href={`/project/${activeItem.id}`}
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
                      marginTop: "30px",
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
