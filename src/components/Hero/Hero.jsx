import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section
      id="hero-animated"
      className="hero-animated d-flex align-items-center"
    >
      <div
        className="container d-flex flex-column justify-content-center align-items-center text-center position-relative"
        data-aos="zoom-out"
      ></div>
    </section>
  );
};

export default Hero;
