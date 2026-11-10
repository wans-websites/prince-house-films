//src/components/Footer/Footer.jsx

import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/img/phf_logo.png";
import { useSanityData } from "../../lib/useSanityData";
import { footerQuery } from "../../lib/queries";
import { fallbackFooter } from "../../lib/fallbacks";
import { urlFor } from "../../lib/sanity";

const Footer = () => {
  const { data } = useSanityData(footerQuery, {}, fallbackFooter);

  const socials = data.socials || [];

  return (
    <footer className="phf-footer">
      <div className="footer-glow" />

      <div className="container">
        <div className="footer-socials">
          <img src={data.logo ? urlFor(data.logo).url() : logo} alt={data.logoAlt} />

          <div className="footer-social-icons">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={s.iconClass} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-legal-links">
          <Link to={data.privacyLink}>{data.privacyLabel}</Link>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} {data.copyrightText}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
