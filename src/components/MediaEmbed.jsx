// src/components/MediaEmbed.jsx

import { useState, useRef, useEffect, useContext, createContext } from "react";
import { urlFor } from "../lib/sanity";

const VideoPlayerContext = createContext();

export const VideoPlayerProvider = ({ children }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const playVideo = (videoId) => setPlayingVideoId(videoId);

  const pauseVideo = (videoId) => {
    if (playingVideoId === videoId) {
      setPlayingVideoId(null);
    }
  };

  return (
    <VideoPlayerContext.Provider
      value={{ playingVideoId, playVideo, pauseVideo }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = () => useContext(VideoPlayerContext);

const MediaEmbed = ({ item, index }) => {
  const videoId = `${item.type}_${index}`;
  const { playingVideoId, playVideo, pauseVideo } = useVideoPlayer();
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const isPlaying = playingVideoId === videoId;

  useEffect(() => {
    if (videoRef.current && item.type === "external_video") {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, item.type]);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      pauseVideo(videoId);
    } else {
      playVideo(videoId);
    }
  };

  const handleViewMoreClick = (e) => {
    e.stopPropagation();
    if (item.redirectUrl) {
      window.open(item.redirectUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (item.type === "sanity_image" && item.image) {
    const imageUrl = urlFor(item.image)
      .width(800)
      .height(800)
      .fit("crop")
      .url();

    return (
      <div
        className="media-embed-image-wrapper"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <img
          src={imageUrl}
          alt={item.title || "Content"}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {item.redirectUrl && (
          <div className="media-embed-view-more-button-container">
            <button
              className="media-embed-view-more-button"
              onClick={handleViewMoreClick}
            >
              View More
            </button>
          </div>
        )}
      </div>
    );
  }

  if (item.type === "external_image" && item.imageUrl) {
    return (
      <div
        className="media-embed-image-wrapper"
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <img
          src={item.imageUrl}
          alt={item.title || "Content"}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {item.redirectUrl && (
          <div className="media-embed-view-more-button-container">
            <button
              className="media-embed-view-more-button"
              onClick={handleViewMoreClick}
            >
              View More
            </button>
          </div>
        )}
      </div>
    );
  }

  if (item.type === "external_video" && item.videoUrl) {
    return (
      <div
        className="media-embed-video-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <video
          ref={videoRef}
          src={item.videoUrl}
          loop
          playsInline
          preload="metadata"
          className="media-embed-cloudinary-video"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        {!isPlaying && (
          <div
            className="media-embed-play-button-overlay"
            onClick={handlePlayClick}
            style={{ opacity: isHovered ? 1 : 0.95 }}
          >
            <div className="media-embed-play-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {item.redirectUrl && (
          <div className="media-embed-view-more-button-container">
            <button
              className="media-embed-view-more-button"
              onClick={handleViewMoreClick}
            >
              View More
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default MediaEmbed;
