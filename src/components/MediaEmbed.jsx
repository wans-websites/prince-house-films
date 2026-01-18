import { useState, useRef, useEffect, useContext, createContext } from "react";

// Create a context to manage which video is playing globally
const VideoPlayerContext = createContext();

export const VideoPlayerProvider = ({ children }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const playVideo = (videoId) => {
    setPlayingVideoId(videoId);
  };

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
  const videoId = `${item.type}_${item.embedPublicId}_${index}`;
  const { playingVideoId, playVideo, pauseVideo } = useVideoPlayer();
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const isPlaying = playingVideoId === videoId;

  useEffect(() => {
    if (videoRef.current && item.type === "cloudinary_video") {
      const video = videoRef.current;

      if (isPlaying) {
        video.play().catch((e) => {
          console.log("Auto-play prevented:", e);
        });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isPlaying, item.type]);

  useEffect(() => {
    if (videoRef.current && item.type === "cloudinary_video") {
      const video = videoRef.current;

      const handlePlay = () => {
        if (!isPlaying) {
          playVideo(videoId);
        }
      };

      const handlePause = () => {
        if (isPlaying) {
          pauseVideo(videoId);
        }
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    }
  }, [isPlaying, videoId, playVideo, pauseVideo, item.type]);

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

  // Load thumbnail for videos
  useEffect(() => {
    if (item.type === "cloudinary_video") {
      const thumbnailUrl = getThumbnailUrl(item);
      const img = new Image();
      img.src = thumbnailUrl;
      img.onload = () => setThumbnailLoaded(true);
      img.onerror = () => {
        console.warn("Thumbnail failed to load, using fallback");
        setThumbnailLoaded(true); // Still show the video even if thumbnail fails
      };
    }
  }, [item]);

  const getThumbnailUrl = (item) => {
    if (item.thumbnail && item.thumbnail !== "your_thumbnail_url") {
      return item.thumbnail;
    }

    // Generate a proper Cloudinary thumbnail URL
    // Use c_fill to ensure it fills the container properly
    return `https://res.cloudinary.com/${item.cloudName || "dlzstmm4e"}/video/upload/c_fill,w_800,h_800,so_0/${item.embedPublicId}.jpg`;
  };

  const getVideoUrl = (item) => {
    // Add transformation to ensure video fills container
    return `https://res.cloudinary.com/${item.cloudName || "dlzstmm4e"}/video/upload/c_fill,w_800,h_800,f_auto,q_auto/${item.embedPublicId}`;
  };

  switch (item.type) {
    case "cloudinary_video":
      const videoUrl = getVideoUrl(item);
      const thumbnailUrl = getThumbnailUrl(item);

      return (
        <div
          className="service-modal-video-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Custom HTML5 Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={thumbnailUrl}
            loop
            playsInline
            preload="metadata"
            className="cloudinary-video-iframe"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              backgroundColor: thumbnailLoaded ? "transparent" : "#111",
              opacity: thumbnailLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            onLoadedData={() => setThumbnailLoaded(true)}
          />

          {/* Fallback thumbnail while video loads */}
          {!thumbnailLoaded && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                backgroundColor: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="custom-play-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Play/Pause Overlay */}
          {!isPlaying && thumbnailLoaded && (
            <div
              className="custom-play-button-overlay"
              onClick={handlePlayClick}
              style={{
                opacity: isHovered ? 1 : 0.95,
                transition: "opacity 0.3s ease",
              }}
            >
              <div className="custom-play-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Pause indicator when playing and hovered */}
          {isPlaying && isHovered && (
            <div
              className="custom-play-button-overlay"
              onClick={handlePlayClick}
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                opacity: 1,
              }}
            >
              <div
                className="custom-play-button"
                style={{ background: "rgba(255, 255, 255, 0.9)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff2a26">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </div>
            </div>
          )}

          {/* View More Button */}
          <div className="view-more-button-container">
            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      );

    case "cloudinary_image":
      return (
        <div
          className="service-modal-image-wrapper"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <img
            src={`https://res.cloudinary.com/${item.cloudName || "dlzstmm4e"}/image/upload/c_fill,w_800,h_800,g_auto/${item.embedPublicId}`}
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

          {/* View More Button for Images */}
          <div className="view-more-button-container">
            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      );

    case "instagram_embed":
      return (
        <div
          className="service-modal-instagram-wrapper"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <iframe
            src={item.embedUrl}
            title={item.title}
            frameBorder="0"
            scrolling="no"
            allowtransparency="true"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />

          {/* View More Button for Instagram */}
          <div className="view-more-button-container">
            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      );

    case "image":
    default:
      return (
        <div
          className="service-modal-image-wrapper"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <img
            src={item.thumbnail}
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

          {/* View More Button for Default Images */}
          <div className="view-more-button-container">
            <button className="view-more-button" onClick={handleViewMoreClick}>
              View More
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      );
  }
};

export default MediaEmbed;
