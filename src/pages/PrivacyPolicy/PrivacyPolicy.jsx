// src/pages/PrivacyPolicy/PrivacyPolicy.jsx

import { Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import "./PrivacyPolicy.css";
import { useSanityData } from "../../lib/useSanityData";
import { privacyPolicyQuery } from "../../lib/queries";
import { fallbackPrivacyPolicy } from "../../lib/fallbacks";
import { siteSettingsQuery } from "../../lib/queries";
import { fallbackSiteSettings } from "../../lib/fallbacks";

const privacySerializers = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

const PrivacyPolicy = () => {
  const { data } = useSanityData(
    privacyPolicyQuery,
    {},
    fallbackPrivacyPolicy
  );
  const { data: settings } = useSanityData(
    siteSettingsQuery,
    {},
    fallbackSiteSettings
  );

  return (
    <section className="privacy-policy-page">
      <div className="privacy-policy-glow" />

      <div className="container privacy-policy-container">
        <div className="privacy-policy-topbar">
          <Link to="/" className="privacy-policy-back">
            <i className="bi bi-arrow-left"></i>
            {data.backToHomeLabel}
          </Link>
        </div>

        <div className="privacy-policy-card">
          <div className="privacy-policy-header">
            <p className="privacy-policy-eyebrow">{data.eyebrow}</p>
            <h1>{data.title}</h1>
            <div className="privacy-policy-meta">
              <span>
                <strong>Effective Date:</strong> {data.effectiveDate}
              </span>
              <span>
                <strong>Last Updated:</strong> {data.lastUpdated}
              </span>
            </div>
          </div>

          <div className="privacy-policy-body">
            <PortableText value={data.body} components={privacySerializers} />

            <div className="privacy-policy-section">
              <h2>11. Contact Us</h2>
              <p>
                <strong>{settings.brandName}</strong>
              </p>
              <p>Email: {settings.email}</p>
              <p>Phone: {settings.phone}</p>
              <p>Website: www.princehousefilms.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
