// src/components/Services/Services.jsx

import { useMemo, useState } from "react";
import "./Services.css";
import ServiceModal from "./ServiceModal";
import {
  BiPen,
  BiVideoRecording,
  BiSlideshow,
  BiPalette,
} from "react-icons/bi";
import { urlFor } from "../../lib/sanity";
import creativeContentGif from "../../assets/img/services/creativeContent.gif";
import motionGif from "../../assets/img/services/motion.gif";

const iconMap = {
  pen: <BiPen />,
  slideshow: <BiSlideshow />,
  palette: <BiPalette />,
  video: <BiVideoRecording />,
};

export default function Services({ services = [] }) {
  const [selectedService, setSelectedService] = useState(null);

  const mappedServices = useMemo(() => {
    return services.map((item) => {
      let bgImage = "";

      if (item.title === "Creative Content") {
        bgImage = creativeContentGif;
      } else if (item.title === "Motion Graphics") {
        bgImage = motionGif;
      } else if (item.backgroundType === "image" && item.backgroundImage) {
        bgImage = urlFor(item.backgroundImage)
          .width(1200)
          .height(900)
          .fit("crop")
          .url();
      } else {
        bgImage = item.backgroundVideoUrl || "";
      }

      return {
        ...item,
        iconElement: iconMap[item.icon] || <BiPen />,
        bgImage,
        hasBg: Boolean(bgImage),
      };
    });
  }, [services]);

  return (
    <section id="services" className="services-section">
      <div className="services-glow-overlay"></div>
      <div className="services-container">
        <h2 className="services-section-title">Our Creative Services</h2>

        <div className="services-bento-container">
          <div className="services-bento-grid">
            {mappedServices.map((item) => (
              <div
                key={item._id}
                className={`services-bento-item ${item.hasBg ? "services-has-bg" : ""} ${
                  item.featured ? "services-featured" : ""
                }`}
                style={{ "--services-bento-bg": `url(${item.bgImage})` }}
                onClick={() => setSelectedService(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedService(item);
                  }
                }}
              >
                <div className="services-bento-content">
                  <div>
                    <div className="services-bento-icon">
                      {item.iconElement}
                    </div>
                    <h3 className="services-bento-title">{item.title}</h3>
                  </div>
                  <p className="services-bento-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ServiceModal
          onClose={() => setSelectedService(null)}
          serviceData={selectedService}
        />
      </div>
    </section>
  );
}
