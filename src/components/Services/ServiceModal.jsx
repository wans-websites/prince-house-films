// src/components/Services/ServiceModal.jsx

import { useEffect, useMemo } from "react";
import { BiChevronRight, BiX } from "react-icons/bi";
import "./ServiceModal.css";
import MediaEmbed, { VideoPlayerProvider } from "../MediaEmbed";

const ServiceModal = ({ onClose, serviceData }) => {
  useEffect(() => {
    if (!serviceData) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [serviceData, onClose]);

  const contentItems = useMemo(() => {
    if (!serviceData?.mediaItems?.length) return [];

    return serviceData.mediaItems.map((item) => ({
      type:
        item.type === "video"
          ? "external_video"
          : item.image
            ? "sanity_image"
            : "external_image",
      title: item.title || "",
      image: item.image || null,
      imageUrl: item.imageUrl || "",
      videoUrl: item.videoUrl || "",
      redirectUrl: item.externalUrl || "",
    }));
  }, [serviceData]);

<<<<<<< HEAD
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9463_buc6tr",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DReIWw6jJVS/?igsh=YzZiZWJnMmVwaHRy",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
      "Motion Graphics": [
        {
          type: "cloudinary_video",
          embedPublicId: "Kara_330ml_1_kkhzrr",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "Vege_Wash_kektrg",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "1000254718_xjijny",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "KARA_coconut_ad_wwqamr",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "ste_ggjgds",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "Kara_Coconut_oil_2_gboknz",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
      "Graphic Design": [
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.10_fmouyf",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_1_zlwhi3",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.11_1_zlwhi3",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_1_zlwhi3",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.11_2_whgb2g",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_2_whgb2g",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_image",
          embedPublicId: "WhatsApp_Image_2026-01-16_at_07.59.11_ywdd4u",
          cloudName: "dlzstmm4e",
          thumbnail: "WhatsApp_Image_2026-01-16_at_07.59.11_ywdd4u",
          redirectUrl: "https://www.instagram.com/princehouse_films/",
          title: "Another Project",
          platform: "Instagram",
        },
      ],
      "Event Coverage": [
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_9466_dffpzd",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DBD1eoAKzKW/?igsh=em5nMWNicWo1Mmg3",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_8084_icevnc",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DSiGmsvjLOA/?igsh=ejd4eDF5c2prOGpu",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
          embedPublicId: "IMG_7951_g58a5f",
          cloudName: "dlzstmm4e",
          thumbnail: "your_thumbnail_url",
          redirectUrl:
            "https://www.instagram.com/reel/DSfPD9IDHeC/?igsh=NnNseDA4a3M1dTZh",
          title: "Another Project",
          platform: "Instagram",
        },
        {
          type: "cloudinary_video",
<<<<<<< HEAD
          embedPublicId: "ezyZip_p3a45w",
=======
          embedPublicId: "ezyZip-2_y7hvbg",
>>>>>>> bf08669 (chore: added a file)
          cloudName: "dlzstmm4e",
          thumbnail: "https://res.cloudinary.com/dlzstmm4e/video/upload/c_fill,w_400,h_300/ezyZip_p3a45w.jpg",
          redirectUrl: "https://www.instagram.com/reel/XXXXX/", // optional
          title: "Another Project",
          platform: "Instagram",
        },
<<<<<<< HEAD
        {
          type: "cloudinary_video",
          embedPublicId: "ezyZip-2_y7hvbg", // just the public ID
          cloudName: "dlzstmm4e",
          thumbnail: "https://res.cloudinary.com/dlzstmm4e/video/upload/c_fill,w_400,h_300/ezyZip-2_y7hvbg.jpg",
          redirectUrl: "https://www.instagram.com/reel/XXXXX/", // optional
          title: "Another Project",
          platform: "Instagram",
        }
=======
        // {
        //   type: "cloudinary_video",
        //   embedPublicId: "IMG_9457_kpeuab",
        //   cloudName: "dlzstmm4e",
        //   thumbnail: "your_thumbnail_url",
        //   redirectUrl:
        //     "https://www.instagram.com/reel/DSfPD9IDHeC/?igsh=NnNseDA4a3M1dTZh",
        //   title: "Another Project",
        //   platform: "Instagram",
        // },
>>>>>>> bf08669 (chore: added a file)
      ],
    };
    return contentMap[serviceTitle] || [];
  };

  const contentItems = getServiceContent(serviceData.title);
  const isGraphicDesign = serviceData.title === "Graphic Design";
  console.log("serviceData.title: ", serviceData.title);

  const showGlobalViewMore =
    serviceData.title === "Creative Content" ||
    serviceData.title === "Motion Graphics";
=======
  if (!serviceData) return null;
>>>>>>> 3580417 (add sanity to hero and services)

  const instagramLink =
    "https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs";

  return (
    <>
      <div className="service-modal-backdrop" onClick={onClose} />

      <div className="service-modal">
        <div className="service-modal-header">
          <div className="service-modal-header-left">
            <div className="service-modal-icon">{serviceData.iconElement}</div>
            <div>
              <h2 className="service-modal-title">{serviceData.title}</h2>
              <p className="service-modal-subtitle">
                {contentItems.length} visual contents
              </p>
            </div>
          </div>

          <button className="service-modal-close-button" onClick={onClose}>
            <BiX size={24} />
          </button>
        </div>

        <VideoPlayerProvider>
          <div className="service-modal-grid">
            {contentItems.map((item, index) => (
              <div
                key={`${serviceData._id}-${index}`}
                className="service-modal-grid-item"
                data-item-type={item.type}
              >
                <div className="service-modal-thumbnail">
                  <MediaEmbed item={item} index={index} />
                </div>
              </div>
            ))}
          </div>
        </VideoPlayerProvider>

        <div className="service-modal-footer">
          <div className="service-modal-footer-cta">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="global-view-more-btn"
            >
              View Full Portfolio on Instagram <BiChevronRight size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceModal;
