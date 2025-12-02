import React, { useEffect } from "react";
import "./Preloader.css";

const Preloader = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("loaded");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader">
      <video id="background-video" autoPlay loop muted>
        <source src="/assets/img/WildNowLogovideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Preloader;
