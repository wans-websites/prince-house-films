import { motion } from "framer-motion";
import "./Objectives.css";
import {
  BiTargetLock,
  BiRocket,
  BiBulb,
  BiHeart,
  BiTrendingUp,
  BiGroup,
  BiAward,
} from "react-icons/bi";
import { useSanityData } from "../../lib/useSanityData";
import { objectivesQuery } from "../../lib/queries";
import { fallbackObjectives } from "../../lib/fallbacks";

const valueIconMap = {
  bulb: <BiBulb />,
  heart: <BiHeart />,
  "trending-up": <BiTrendingUp />,
  group: <BiGroup />,
};

export default function Objectives() {
  const { data } = useSanityData(objectivesQuery, {}, fallbackObjectives);

  const values = data.values;

  return (
    <section className="phf-section objectives-section" id="objectives">
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
        <p className="section-subtitle">
          {data.intro}
        </p>

        <div className="vision-mission-grid">
          <motion.div
            className="vision-card phf-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="card-icon">
              <BiTargetLock />
            </div>
            <h3 className="card-title">{data.vision.title}</h3>
            <p className="card-text">
              {data.vision.body}
            </p>
          </motion.div>

          <motion.div
            className="mission-card phf-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <div className="card-icon">
              <BiRocket />
            </div>
            <h3 className="card-title">{data.mission.title}</h3>
            <p className="card-text">
              {data.mission.body}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="values-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "32px",
              color: "var(--color-default)",
              textAlign: "center",
              margin: "80px 0 40px",
            }}
          >
            {data.valuesHeading}
          </h3>

          <div className="values-grid">
            {values.map((value, i) => (
              <motion.div
                key={i}
                className="value-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="value-icon">
                  {valueIconMap[value.iconKey]}
                </div>
                <h4 className="value-title">{value.title}</h4>
                <p className="value-desc">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
