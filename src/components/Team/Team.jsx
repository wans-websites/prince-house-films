// src/components/Team/Team.jsx
import { motion } from "framer-motion";
import "./Team.css";
import { useSanityData } from "../../lib/useSanityData";
import { teamQuery } from "../../lib/queries";
import { fallbackTeam } from "../../lib/fallbacks";
import { urlFor } from "../../lib/sanity";

// Import your landscape group photo here
import teamGroupPhoto from "../../assets/img/team.jpg";

const Team = () => {
  const { data } = useSanityData(teamQuery, {}, fallbackTeam);
  return (
    <section id="team" className="team-section-single">
      <div className="team-glow-overlay"></div>

      <div className="">
        {/* Header */}
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="team-title">{data.sectionTitle}</h2>
          <p className="team-subtitle">{data.intro}</p>
        </motion.div>

        {/* Main Group Photo */}
        <motion.div
          className="team-group-photo-section"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="team-group-photo"
            style={{ backgroundImage: `url(${data.groupPhoto ? urlFor(data.groupPhoto).url() : teamGroupPhoto})` }}
          >
            <div className="photo-overlay">
              <div className="photo-content">
                <motion.h3
                  className="photo-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {data.groupPhotoTitle}
                </motion.h3>
                <motion.p
                  className="photo-description"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {data.groupPhotoDescription}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
