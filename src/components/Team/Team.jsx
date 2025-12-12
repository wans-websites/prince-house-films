import React from "react";
import { motion } from "framer-motion";
import "./Team.css";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaAward,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";
import tito from "../../assets/img/tito.JPG";
import calvin from "../../assets/img/calvin.JPG";
import ruth from "../../assets/img/ruth.JPG";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John",
      role: "Founder & Videographer/Editor",
      bio: "Visionary storyteller with 10+ years in cinematic production. Leads creative direction for all projects.",
      image: "",
      expertise: ["Cinematography", "Creative Direction", "Storytelling"],
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      name: "Tito Gatitu",
      role: " Drone pilot",
      bio: "Strategic producer managing budgets, timelines, and client relationships across all projects.",
      image: tito,
      expertise: ["Production", "Budgeting", "Client Management"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 3,
      name: "Calvin Claks ",
      role: "Cimenatographer, gimbal operator , D.O.P",
      bio: "Award-winning cinematographer specializing in commercial and documentary filmmaking.",
      image: calvin,
      expertise: ["Cinematography", "Lighting", "Camera Operation"],
      social: {
        linkedin: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      id: 4,
      name: "Ruth Matindi ",
      role: "Content Creator/ Editor",
      bio: "Award-winning cinematographer specializing in commercial and documentary filmmaking.",
      image: ruth,
      expertise: ["Cinematography", "Lighting", "Camera Operation"],
      social: {
        linkedin: "#",
        instagram: "#",
        youtube: "#",
      },
    },
  ];

  const teamStats = [
    { number: "50+", label: "Industry Awards" },
    { number: "200+", label: "Projects Delivered" },
    { number: "150+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
  ];

  const teamValues = [
    {
      icon: <FaLightbulb />,
      title: "Creative Innovation",
      description:
        "Constantly pushing boundaries with fresh ideas and innovative approaches to storytelling.",
    },
    {
      icon: <FaHandshake />,
      title: "Collaborative Spirit",
      description:
        "Working closely with clients and team members to achieve shared creative vision.",
    },
    {
      icon: <FaAward />,
      title: "Excellence in Execution",
      description:
        "Committed to delivering the highest quality work in every aspect of production.",
    },
  ];

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "linkedin":
        return <FaLinkedinIn />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      case "youtube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  return (
    <section id="team" className="phf-section team-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Creative Team
        </motion.h2>

        <p className="section-subtitle">
          A diverse team of award-winning filmmakers, designers, and strategists
          who bring passion, expertise, and creativity to every project.
          Together, we transform visions into cinematic realities.
        </p>

        <div className="team-grid-seven">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              className="team-member phf-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <div
                className="member-image"
                style={{ backgroundImage: `url(${member.image})` }}
              />

              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <div className="member-role">{member.role}</div>
                <p className="member-bio">{member.bio}</p>

                <div className="member-expertise">
                  {member.expertise.map((skill, j) => (
                    <span key={j} className="expertise-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="member-social">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="social-icon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getSocialIcon(platform)}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          className="team-stats"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {teamStats.map((stat, i) => (
            <div key={i} className="stat-item">
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div> */}

        {/* <motion.div
          className="team-values"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {teamValues.map((value, i) => (
            <motion.div
              key={i}
              className="value-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </motion.div>
          ))}
        </motion.div> */}

        {/* <motion.div
          className="section-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            marginTop: "80px",
            textAlign: "center",
            padding: "50px",
            background:
              "linear-gradient(135deg, rgba(255, 4, 0, 0.1), rgba(13, 110, 253, 0.1))",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "32px",
              color: "var(--color-default)",
              margin: "0 0 16px 0",
            }}
          >
            Want to Join Our Team?
          </h3>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "18px",
              margin: "0 0 30px 0",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            We're always looking for talented creatives to join our growing
            team. If you're passionate about storytelling and have skills in
            film production, design, or strategy, we'd love to hear from you.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/careers"
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
              View Open Positions <i className="bi bi-briefcase"></i>
            </a>

            <a
              href="/contact?type=career"
              className="cta-button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 42px",
                background: "transparent",
                color: "var(--color-default)",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                fontSize: "16px",
                transition: "all 0.3s ease",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                e.target.style.borderColor = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.background = "transparent";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              Send Your Portfolio <i className="bi bi-send"></i>
            </a>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Team;
