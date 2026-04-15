// src/components/Hero/Hero.jsx
import { urlFor } from "../../lib/sanity";
import "./Hero.css";

const fallbackHero = {
  title: "Where visual storytelling",
  highlightedText: "meets strategy",
  ctaText: "Start Your Project",
  ctaLink: "#contact",
  backgroundType: "video",
  backgroundVideoUrl:
    "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/hero_tycjh1.mov",
};

const Hero = ({ data }) => {
  const hero = data || fallbackHero;

  const hasVideo = hero.backgroundType === "video" && hero.backgroundVideoUrl;

  const imageUrl =
    hero.backgroundType === "image" && hero.backgroundImage
      ? urlFor(hero.backgroundImage).width(1800).height(1200).fit("crop").url()
      : null;

  return (
    <section
      id="home"
      className="phf-section hero-section"
      style={
        !hasVideo && imageUrl
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {hasVideo && (
        <video autoPlay muted loop playsInline className="hero-video-bg">
          <source src={hero.backgroundVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="container hero-content">
        <h1 className="hero-main-title">
          {hero.title}{" "}
          <span className="hero-highlight">{hero.highlightedText}</span>
        </h1>

        <div className="hero-cta-buttons">
          <a href={hero.ctaLink} className="hero-primary-btn">
            {hero.ctaText} <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
