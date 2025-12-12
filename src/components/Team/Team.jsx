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

// Import your landscape group photo here
import teamGroupPhoto from "../../assets/img/team-group.jpeg";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John",
      role: "Founder & Videographer/Editor",
      bio: "Visionary storyteller with 10+ years in cinematic production. Leads creative direction for all projects.",
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
      role: "Drone Pilot",
      bio: "Strategic producer managing budgets, timelines, and client relationships across all projects.",
      expertise: ["Aerial Cinematography", "Drone Operations", "Safety"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      id: 3,
      name: "Calvin Claks",
      role: "Cinematographer, Gimbal Operator, D.O.P",
      bio: "Award-winning cinematographer specializing in commercial and documentary filmmaking.",
      expertise: ["Cinematography", "Lighting", "Camera Operation"],
      social: {
        linkedin: "#",
        instagram: "#",
        youtube: "#",
      },
    },
    {
      id: 4,
      name: "Ruth Matindi",
      role: "Content Creator/Editor",
      bio: "Creative editor with expertise in post-production and content strategy for digital platforms.",
      expertise: ["Video Editing", "Content Strategy", "Motion Graphics"],
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="team" className="team-section-single">
      <div className="team-glow-overlay"></div>

      <div className="container">
        {/* Header */}
        <motion.div
          className="team-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="team-title">Meet Our Creative Team</h2>
          <p className="team-subtitle">
            A passionate collective of storytellers, cinematographers, and
            innovators
          </p>
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
            style={{ backgroundImage: `url(${teamGroupPhoto})` }}
          >
            <div className="photo-overlay">
              <div className="photo-content">
                <motion.h3
                  className="photo-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  The Creative Minds
                </motion.h3>
                <motion.p
                  className="photo-description"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  United by passion, driven by innovation
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
