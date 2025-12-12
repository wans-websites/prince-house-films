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

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeItem, setActiveItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "commercial", label: "Commercial" },
    { id: "documentary", label: "Documentary" },
    { id: "corporate", label: "Corporate" },
    { id: "social", label: "Social Media" },
    { id: "events", label: "Events" },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Wildlife Conservation Documentary",
      category: "documentary",
      description: "Award-winning documentary on African wildlife conservation",
      image:
        "https://images.unsplash.com/photo-1550358864-518f202c02ba?q=80&w=1200",
      client: "National Geographic",
      year: "2023",
      duration: "45 min",
      awards: ["Best Documentary 2023", "Wildlife Film Festival Winner"],
      details:
        "This groundbreaking documentary took us across 5 African countries over 18 months. We captured never-before-seen footage of endangered species and worked closely with conservation experts to tell a compelling story about biodiversity preservation.",
    },
    {
      id: 2,
      title: "Tech Startup Brand Film",
      category: "commercial",
      description: "Corporate brand film for Silicon Valley tech startup",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w-1200",
      client: "TechNova Inc.",
      year: "2024",
      duration: "3 min",
      awards: ["Best Brand Film", "Marketing Excellence Award"],
      details:
        "A sleek, futuristic brand film that established TechNova's identity in the competitive AI market. We utilized advanced CGI and motion graphics to visualize complex tech concepts.",
    },
    {
      id: 3,
      title: "Music Festival Coverage",
      category: "events",
      description: "Multi-camera live coverage of major music festival",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w-1200",
      client: "MTV Africa",
      year: "2023",
      duration: "120 min",
      awards: ["Best Event Coverage", "Live Production Award"],
      details:
        "Complete live production coverage of Africa's largest music festival. We deployed 12 camera crews, drone teams, and mobile production units to capture every moment.",
    },
    {
      id: 4,
      title: "Corporate Training Series",
      category: "corporate",
      description:
        "12-part training video series for multinational corporation",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
      client: "GlobalCorp",
      year: "2024",
      duration: "6 hours total",
      awards: ["Excellence in Corporate Media"],
      details:
        "Comprehensive training program filmed across 8 countries. Each episode was customized for local markets while maintaining consistent branding and messaging.",
    },
    {
      id: 5,
      title: "Social Media Campaign",
      category: "social",
      description: "Viral social media campaign for fashion brand",
      image:
        "https://images.unsplash.com/photo-1611746872915-64382b5c0e5a?q=80&w=1200",
      client: "UrbanStyle",
      year: "2024",
      duration: "30 sec episodes",
      awards: ["Viral Campaign Award", "Social Media Excellence"],
      details:
        "A 30-day social media campaign that generated over 50 million views. We produced 30 unique 30-second episodes, each with tailored content for different platforms.",
    },
    {
      id: 6,
      title: "Product Launch Film",
      category: "commercial",
      description: "Cinematic product launch for luxury automotive brand",
      image:
        "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200",
      client: "Luxury Motors",
      year: "2023",
      duration: "5 min",
      awards: ["Best Automotive Film", "Cinematography Award"],
      details:
        "A cinematic masterpiece shot over 3 continents. We captured the new luxury vehicle in stunning locations from Swiss Alps to Dubai deserts.",
    },
  ];

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
          Our Portolio
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
