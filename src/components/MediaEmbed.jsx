// src/components/MediaEmbed.jsx

import { useState, useRef, useEffect, useContext, createContext } from "react";
import { urlFor } from "../lib/sanity";
import {
  getVideoProvider,
  getVideoEmbedUrl,
  getVideoThumbnail,
} from "../lib/mediaUtils";

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

  // Release the native media pipeline before React removes the <video> node.
  // Without this, a video that is still loading when unmounted can leave the
  // DOM out of sync and React 18 throws removeChild NotFoundError.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    return () => {
      try {
        vid.pause();
        vid.removeAttribute("src");
        vid.load(); // forces the media pipeline to release
      } catch {
        /* Safari can throw on detached video; ignore */
      }
    };
  }, []);

  // Defer play until mounted and guard against detached refs.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || item.type !== "external_video") return;
    if (isPlaying) {
      const p = vid.play();
      if (p?.catch) p.catch(() => {});
    } else {
      try {
        vid.pause();
        vid.currentTime = 0;
      } catch {
        /* ignore */
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
    const provider = getVideoProvider(item.videoUrl);

    const renderViewMore = () =>
      item.redirectUrl ? (
        <div className="media-embed-view-more-button-container">
          <button
            className="media-embed-view-more-button"
            onClick={handleViewMoreClick}
          >
            View More
          </button>
        </div>
      ) : null;

    // YouTube / Vimeo → thumbnail + iframe
    if (provider === "youtube" || provider === "vimeo") {
      const thumb = getVideoThumbnail(item.videoUrl, provider);
      const fallbackThumb =
        provider === "youtube" && thumb
          ? thumb.replace("maxresdefault", "hqdefault")
          : thumb;
      const embedUrl = getVideoEmbedUrl(item.videoUrl, provider);

      return (
        <div
          className="media-embed-video-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {isPlaying ? (
            <iframe
              key={`iframe-${item.videoUrl}`}
              src={embedUrl}
              title={item.title || `${provider} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                position: "absolute",
                inset: 0,
              }}
            />
          ) : (
            <>
              <img
                src={thumb}
                alt={item.title || "Video thumbnail"}
                loading="lazy"
                onError={(e) => {
                  if (fallbackThumb && e.currentTarget.src !== fallbackThumb) {
                    e.currentTarget.src = fallbackThumb;
                  }
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                }}
              />
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
            </>
          )}
          {renderViewMore()}
        </div>
      );
    }

    // Direct video (mp4/webm/cloudinary/etc.) — keep existing behavior + Bug-1 safety
    return (
      <div
        className="media-embed-video-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <video
          key={`video-${item.videoUrl}`}
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
            inset: 0,
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

        {renderViewMore()}
      </div>
    );
  }

  return null;
};

export default MediaEmbed;
