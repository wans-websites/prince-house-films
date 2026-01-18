import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css";
import logo from "../../assets/img/phf_logo.png";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    // Video delay for dramatic effect
    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 800);

    // Complete after 3 seconds
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(videoTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    if (isComplete) {
      document.body.style.overflow = "auto";
      const preloader = document.getElementById("preloader");
      if (preloader) {
        setTimeout(() => {
          preloader.style.display = "none";
        }, 1000);
      }
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isComplete]);

  const glowVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.5,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.cos(i * 0.5) * 100,
      y: Math.sin(i * 0.5) * 100,
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut",
      },
    }),
  };

  const loadingTextVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          className="preloader-container"
        >
          {/* Animated Background Grid */}
          <div className="preloader-grid"></div>

          {/* Central Glow Effect */}
          <motion.div
            className="preloader-central-glow"
            variants={glowVariants}
            animate="animate"
          />

          {/* Animated Particles */}
          <div className="preloader-particles">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="preloader-particle"
                custom={i}
                variants={particleVariants}
                initial="initial"
                animate="animate"
                style={{
                  "--particle-color": `hsl(${i * 30}, 100%, 65%)`,
                }}
              />
            ))}
          </div>

          {/* Main Content Container */}
          <div className="preloader-content">
            {/* Logo Container */}
            <div className="preloader-logo-container">
              <motion.div
                className="preloader-logo-ring preloader-logo-ring-outer"
                variants={glowVariants}
                animate="animate"
              />
              <motion.div
                className="preloader-logo-ring preloader-logo-ring-middle"
                variants={glowVariants}
                animate="animate"
                style={{ animationDirection: "reverse" }}
              />
              <motion.div
                className="preloader-logo-ring preloader-logo-ring-inner"
                variants={glowVariants}
                animate="animate"
              />

              <motion.div
                className="preloader-logo-main"
                variants={logoVariants}
                initial="initial"
                animate="animate"
              >
                {/* Logo img */}
                <img src={logo} className="preloader-logo-img" />

                {/* Logo Icon */}
                <div className="preloader-logo-icon">
                  <svg viewBox="0 0 100 100" className="preloader-logo-svg">
                    <path
                      d="M50 20 L80 50 L50 80 L20 50 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M35 35 L65 65 M65 35 L35 65"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <div className="preloader-floating-elements">
                <div className="preloader-floating-element preloader-floating-element-1"></div>
                <div className="preloader-floating-element preloader-floating-element-2"></div>
                <div className="preloader-floating-element preloader-floating-element-3"></div>
                <div className="preloader-floating-element preloader-floating-element-4"></div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="preloader-progress-section">
              {/* Loading Text */}
              <motion.div
                className="preloader-loading-text"
                variants={loadingTextVariants}
                animate="animate"
              >
                <span className="preloader-loading-dot preloader-loading-dot-1">
                  •
                </span>
                <span className="preloader-loading-dot preloader-loading-dot-2">
                  •
                </span>
                <span className="preloader-loading-dot preloader-loading-dot-3">
                  •
                </span>
                <span>Loading </span>
                <span className="preloader-loading-dot preloader-loading-dot-4">
                  •
                </span>
                <span className="preloader-loading-dot preloader-loading-dot-5">
                  •
                </span>
                <span className="preloader-loading-dot preloader-loading-dot-6">
                  •
                </span>
              </motion.div>

              {/* Progress Bar */}
              <div className="preloader-progress-container">
                <div className="preloader-progress-track">
                  <motion.div
                    className="preloader-progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="preloader-progress-glow"></div>
                    <div className="preloader-progress-sparkles">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="preloader-progress-sparkle"
                          style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Progress Percentage */}
                <div className="preloader-progress-percentage">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {progress}%
                  </motion.span>
                </div>
              </div>

              {/* Loading Details */}
              <div className="preloader-loading-details">
                <div className="preloader-loading-detail">
                  <span className="preloader-loading-label">
                    Initializing Visuals
                  </span>
                  <span className="preloader-loading-status">
                    {progress > 20 ? "✓" : progress > 10 ? "⚡" : "..."}
                  </span>
                </div>
                <div className="preloader-loading-detail">
                  <span className="preloader-loading-label">
                    Loading Assets
                  </span>
                  <span className="preloader-loading-status">
                    {progress > 50 ? "✓" : progress > 30 ? "⚡" : "..."}
                  </span>
                </div>
                <div className="preloader-loading-detail">
                  <span className="preloader-loading-label">
                    Preparing Experience
                  </span>
                  <span className="preloader-loading-status">
                    {progress > 80 ? "✓" : progress > 60 ? "⚡" : "..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Background (if enabled) */}
            <AnimatePresence>
              {showVideo && (
                <motion.div
                  className="preloader-video-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ duration: 1 }}
                >
                  <video
                    className="preloader-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src="/assets/img/WildNowLogovideo.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="preloader-video-overlay"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ambient Light */}
          <div className="preloader-ambient-light preloader-ambient-light-1"></div>
          <div className="preloader-ambient-light preloader-ambient-light-2"></div>
          <div className="preloader-ambient-light preloader-ambient-light-3"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
