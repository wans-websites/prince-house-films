import React from "react";

const MediaEmbed = ({ item }) => {
  switch (item.type) {
    case "cloudinary_video":
      return (
        <div className="service-modal-video-wrapper">
          <iframe
            src={`https://player.cloudinary.com/embed/?cloud_name=${
              item.cloudName || "dlzstmm4e"
            }&public_id=${item.embedPublicId}&player%5Bfluid%5D=true&player%5Bcontrols%5D=false&player%5Bshow_jump_controls%5D=false&player%5Bautoplay_mode%5D=on-scroll&player%5Bloop%5D=true&player%5Bmuted%5D=true`}
            title={item.title}
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      );

    case "cloudinary_image":
      return (
        <div className="service-modal-image-wrapper">
          <img
            src={`https://res.cloudinary.com/${item.cloudName || "dlzstmm4e"}/image/upload/c_fill,w_1000,h_1000,g_auto/${item.embedPublicId}`}
            alt={item.title || "Content"}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      );

    case "instagram_embed":
      return (
        <div className="service-modal-instagram-wrapper">
          <iframe
            src={item.embedUrl}
            title={item.title}
            frameBorder="0"
            scrolling="no"
            allowtransparency="true"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      );

    case "image":
    default:
      return (
        <div className="service-modal-image-wrapper">
          <img
            src={item.thumbnail}
            alt={item.title || "Content"}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      );
  }
};

export default MediaEmbed;
