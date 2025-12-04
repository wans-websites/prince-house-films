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

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const filters = [
    { id: "all", label: "All" },
    { id: "behind-scenes", label: "Behind the Scenes" },
    { id: "production", label: "Production" },
    { id: "events", label: "Events" },
    { id: "locations", label: "Locations" },
    { id: "equipment", label: "Equipment" },
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Wildlife Documentary Shoot",
      category: "behind-scenes",
      description: "Capturing rare wildlife moments in Maasai Mara",
      image:
        "https://images.unsplash.com/photo-1550358864-518f202c02ba?q=80&w=1200",
      date: "2023",
      location: "Maasai Mara, Kenya",
      type: "photo",
    },
    {
      id: 2,
      title: "Studio Production Setup",
      category: "production",
      description: "Professional studio setup for commercial shoot",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
      date: "2024",
      location: "Nairobi Studio",
      type: "photo",
    },
    {
      id: 3,
      title: "Music Festival Coverage",
      category: "events",
      description: "Multi-camera setup for live festival broadcast",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
      date: "2023",
      location: "Carnivore Grounds, Nairobi",
      type: "video",
    },
    {
      id: 4,
      title: "Mountain Documentary Location",
      category: "locations",
      description: "Shooting in challenging mountain terrain",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
      date: "2023",
      location: "Mount Kenya",
      type: "photo",
    },
    {
      id: 5,
      title: "Cinema Camera Setup",
      category: "equipment",
      description: "Professional cinema camera rig for film shoot",
      image:
        "https://images.unsplash.com/photo-1563297007-0686b7003af7?q=80&w=1200",
      date: "2024",
      location: "Production Set",
      type: "photo",
    },
    {
      id: 6,
      title: "Corporate Event Coverage",
      category: "events",
      description: "Live streaming setup for corporate conference",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
      date: "2024",
      location: "KICC, Nairobi",
      type: "video",
    },
    {
      id: 7,
      title: "Post-Production Suite",
      category: "production",
      description: "Color grading and editing workstation",
      image:
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200",
      date: "2024",
      location: "Post-Production Studio",
      type: "photo",
    },
    {
      id: 8,
      title: "Drone Cinematography",
      category: "equipment",
      description: "Aerial shots for commercial production",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200",
      date: "2023",
      location: "Coastal Region",
      type: "video",
    },
    {
      id: 9,
      title: "Interview Setup",
      category: "behind-scenes",
      description: "Professional interview lighting and audio setup",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
      date: "2024",
      location: "Documentary Set",
      type: "photo",
    },
  ];

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
          transition={{ duration: 0.6 }}
        >
          Behind the Scenes Gallery
        </motion.h2>

        <p className="section-subtitle">
          Take a look at the passion, precision, and creativity that goes into
          every Prince House Films production. From breathtaking locations to
          intricate setups.
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
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onClick={() => openLightbox(item)}
            >
              <div
                className="gallery-image"
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
          transition={{ delay: 0.6 }}
        >
          <a href="/full-gallery" className="view-more-btn">
            View More in Gallery <i className="bi bi-images"></i>
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
