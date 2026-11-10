// src/components/GetInTouch/GetInTouch.jsx
import { motion } from "framer-motion";
import "./GetInTouch.css";
import {
  BiEnvelope,
  BiPhone,
  BiMap,
  BiCalendar,
  BiChat,
  BiLogoInstagram,
  BiLogoFacebook,
  BiLogoLinkedin,
} from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";
import { useSanityData } from "../../lib/useSanityData";
import { getInTouchQuery } from "../../lib/queries";
import { fallbackGetInTouch } from "../../lib/fallbacks";

const contactIconMap = {
  map: <BiMap />,
  envelope: <BiEnvelope />,
  phone: <BiPhone />,
};

const socialIconMap = {
  BiLogoInstagram: <BiLogoInstagram />,
  BiLogoFacebook: <BiLogoFacebook />,
  FaTiktok: <FaTiktok />,
  BiLogoLinkedin: <BiLogoLinkedin />,
};

const GetInTouch = () => {
  const { data } = useSanityData(getInTouchQuery, {}, fallbackGetInTouch);

  const contactInfo = data.contactDetails || [];
  const socialMedia = data.socials || [];

  return (
    <section id="contact" className="phf-section getintouch-section">
      <div className="glow-overlay"></div>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{data.sectionTitle}</h2>
          <p className="section-subtitle">
            {data.intro}
          </p>
        </motion.div>

        <div className="contact-container">
          {/* Main Contact Grid - More Compact */}
          <div className="main-contact-grid">
            {/* Contact Cards Row */}
            <div className="contact-cards-row">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  className="compact-card phf-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="compact-icon">
                    {contactIconMap[info.iconKey]}
                  </div>
                  <div className="compact-content">
                    <h3>{info.title}</h3>
                    <p>{info.content}</p>
                    <a
                      href={info.link}
                      className="compact-link"
                      target={info.external ? "_blank" : "_self"}
                      rel={info.external ? "noopener noreferrer" : ""}
                    >
                      {info.linkText}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media - Compact Grid */}
            <motion.div
              className="social-media-compact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="social-header">
                <BiChat className="social-header-icon" />
                <h3>{data.socialsHeading}</h3>
              </div>
              <div className="social-grid-compact">
                {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="social-item-compact"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ "--social-color": social.color }}
                    >
                      <div
                        className="social-icon-compact"
                        style={{ color: social.color }}
                      >
                        {socialIconMap[social.iconClass]}
                      </div>
                    <span className="social-platform-compact">
                      {social.platform}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section - Compact */}
          <motion.div
            className="cta-section-compact"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="cta-card-compact">
              <div className="cta-icon-compact">
                <BiCalendar />
              </div>
              <div className="cta-content">
                <h3 className="cta-title-compact">{data.ctaTitle}</h3>
                <p className="cta-desc-compact">
                  {data.ctaDescription}
                </p>
                <div className="cta-buttons-compact">
                  <motion.a
                    href={data.consultationUrl}
                    className="cta-btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <BiCalendar /> {data.bookNowLabel}
                  </motion.a>
                  <motion.a
                    href={data.callUrl}
                    className="cta-btn-secondary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <BiPhone /> {data.callLabel}
                  </motion.a>
                </div>
                <div className="cta-note">
                  <BiChat /> {data.ctaNote}
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
