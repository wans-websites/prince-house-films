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
import { useSanityData } from "../../lib/useSanityData";
import { countsQuery } from "../../lib/queries";
import { fallbackCounts } from "../../lib/fallbacks";

const statIconMap = {
  "camera-movie": <BiCameraMovie />,
  trophy: <BiTrophy />,
  globe: <BiGlobe />,
  happy: <BiHappy />,
};
const statColorMap = {
  "camera-movie": "var(--color-primary)",
  trophy: "var(--color-cyan)",
  globe: "var(--color-green)",
  happy: "var(--color-purple)",
};
const achievementIconMap = {
  star: <BiStar />,
  world: <BiWorld />,
};

const Counts = () => {
  const [counts, setCounts] = useState({});

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const counted = useRef(false);
  const { data } = useSanityData(countsQuery, {}, fallbackCounts);

  const stats = (data.stats || []).map(stat => ({
    ...stat,
    number: counts[stat._key] || 0,
  }));

  const achievements = data.achievements || [];

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
    if (isVisible && !counted.current) {
      const initial = {};
      (data.stats || []).forEach(stat => {
        initial[stat._key] = 0;
      });
      setCounts(initial);
      counted.current = true;

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

      const durations = [2000, 2500, 2200, 1800];
      (data.stats || []).forEach((stat, i) => {
        animateCounter(0, stat.number, durations[i] || 2000, stat._key);
      });
    }
  }, [isVisible, data]);

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
          {data.sectionTitle}
        </motion.h2>

        {/* <p className="section-subtitle">
          A decade of cinematic excellence, measured by the stories we've told
          and the clients we've empowered through visual storytelling.
        </p> */}

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat._key}
              className="stat-item phf-card"
              style={{ "--stat-color": statColorMap[stat.iconKey] }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="stat-icon">
                {statIconMap[stat.iconKey]}
              </div>
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
              <div className="badge-icon">
                {achievementIconMap[achievement.iconKey]}
              </div>
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
