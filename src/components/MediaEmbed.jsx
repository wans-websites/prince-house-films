import React from "react";

const MediaEmbed = ({ item }) => {
  // Auto-play muted parameters for video platforms
  const autoPlayMutedParams = "autoplay=1&muted=1&controls=0&loop=1";

  switch (item.type) {
    case "cloudinary_video":
      return (
        <div className="video-wrapper">
          <iframe
            src={`https://player.cloudinary.com/embed/?cloud_name=YOUR_CLOUD_NAME&public_id=${item.embedPublicId}&${autoPlayMutedParams}`}
            title={item.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      );

    case "instagram_embed":
      // Instagram embeds are fixed-height iframes. Auto-play is not supported.
      return (
        <div className="instagram-wrapper">
          <iframe
            src={item.embedUrl}
            title={item.title}
            frameBorder="0"
            scrolling="no"
            allowtransparency="true"
          ></iframe>
          <a
            href={item.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="view-original-link"
          >
            View on Instagram
          </a>
        </div>
      );

    case "vimeo_video":
    case "youtube_video":
      // Similar iframe structure for Vimeo/YouTube with autoplay params
      const videoUrl =
        item.type === "vimeo_video"
          ? `https://player.vimeo.com/video/${item.videoId}?${autoPlayMutedParams}&background=1`
          : `https://www.youtube.com/embed/${item.videoId}?${autoPlayMutedParams}&playlist=${item.videoId}`;

      return (
        <div className="video-wrapper">
          <iframe
            src={videoUrl}
            title={item.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      );

    case "image":
    default:
      return <img src={item.thumbnail} alt={item.title} loading="lazy" />;
  }
};

export default MediaEmbed;
