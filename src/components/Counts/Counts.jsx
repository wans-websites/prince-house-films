import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "./Counts.css";
import {
  BiCameraMovie,
  BiTrophy,
  BiGlobe,
  BiHappy,
  BiStar,
  BiWorld,
} from "react-icons/bi";

const Counts = () => {
  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    clients: 0,
    satisfaction: 0,
  });

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.current) {
            setIsVisible(true);
            counted.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateCounter = (start, end, duration, key) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          setCounts((prev) => ({ ...prev, [key]: value }));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };

      animateCounter(0, 10, 2000, "years");
      animateCounter(0, 200, 2500, "projects");
      animateCounter(0, 150, 2200, "clients");
      animateCounter(0, 98, 1800, "satisfaction");
    }
  }, [isVisible]);

  const stats = [
    {
      key: "years",
      number: counts.years,
      suffix: "+",
      label: "Years of Excellence",
      description: "A decade of cinematic storytelling mastery",
      color: "var(--color-primary)",
      icon: <BiCameraMovie />,
    },
    {
      key: "projects",
      number: counts.projects,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful film and video productions",
      color: "var(--color-cyan)",
      icon: <BiTrophy />,
    },
    {
      key: "clients",
      number: counts.clients,
      suffix: "+",
      label: "Happy Clients",
      description: "Brands and organizations served globally",
      color: "var(--color-green)",
      icon: <BiGlobe />,
    },
    {
      key: "satisfaction",
      number: counts.satisfaction,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Consistent 5-star reviews and referrals",
      color: "var(--color-purple)",
      icon: <BiHappy />,
    },
  ];

  const achievements = [
    {
      icon: <BiStar />,
      title: "Premium Quality",
      description: "Broadcast standard",
    },
    {
      icon: <BiWorld />,
      title: "Global Reach",
      description: "International projects",
    },
  ];

  return (
    <section
      id="counts"
      className="phf-section counts-section"
      ref={sectionRef}
    >
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Impact in Numbers
        </motion.h2>

        <p className="section-subtitle">
          A decade of cinematic excellence, measured by the stories we've told
          and the clients we've empowered through visual storytelling.
        </p>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              className="stat-item phf-card"
              style={{ "--stat-color": stat.color }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="stat-number" data-suffix={stat.suffix}>
                {stat.number}
              </h3>
              <h4 className="stat-label">{stat.label}</h4>
              <p className="stat-description">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="achievement-badges"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              className="achievement-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="badge-icon">{achievement.icon}</div>
              <div className="badge-text">
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Counts;
