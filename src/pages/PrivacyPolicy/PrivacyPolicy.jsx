// src/pages/PrivacyPolicy/PrivacyPolicy.jsx

import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <section className="privacy-policy-page">
      <div className="privacy-policy-glow" />

      <div className="container privacy-policy-container">
        <div className="privacy-policy-topbar">
          <Link to="/" className="privacy-policy-back">
            <i className="bi bi-arrow-left"></i>
            Back to Home
          </Link>
        </div>

        <div className="privacy-policy-card">
          <div className="privacy-policy-header">
            <p className="privacy-policy-eyebrow">Legal</p>
            <h1>Privacy Policy for Prince House Films</h1>
            <div className="privacy-policy-meta">
              <span>
                <strong>Effective Date:</strong> 15/04/2026
              </span>
              <span>
                <strong>Last Updated:</strong> 15/04/2026
              </span>
            </div>
          </div>

          <div className="privacy-policy-body">
            <p>
              At Prince House Films, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, and safeguard your information when you visit
              our website, engage with us on social media platforms such as
              Facebook, Instagram, LinkedIn, or contact us directly.
            </p>

            <p>
              By using our website, pages, or services, you agree to the terms
              of this Privacy Policy.
            </p>

            <div className="privacy-policy-section">
              <h2>1. Information We Collect</h2>
              <p>We may collect the following information:</p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Business name</li>
                <li>Project details or inquiries</li>
                <li>Billing information (where applicable)</li>
                <li>
                  Website usage data (cookies, analytics, device information)
                </li>
                <li>
                  Social media interactions (messages, comments, form
                  submissions)
                </li>
              </ul>
            </div>

            <div className="privacy-policy-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Respond to inquiries and requests</li>
                <li>Provide quotations and services</li>
                <li>Manage projects and client communication</li>
                <li>Improve our website and services</li>
                <li>
                  Send updates, offers, or promotional content (only where
                  permitted)
                </li>
                <li>Run advertising and remarketing campaigns</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="privacy-policy-section">
              <h2>3. Cookies &amp; Tracking Technologies</h2>
              <p>
                Our website and social media platforms may use cookies, pixels,
                and similar technologies (such as Facebook Pixel or analytics
                tools) to improve user experience, understand traffic, and
                deliver relevant advertising.
              </p>
              <p>You can disable cookies through your browser settings.</p>
            </div>

            <div className="privacy-policy-section">
              <h2>4. Sharing of Information</h2>
              <p>
                We do not sell your personal information. We may share
                information with trusted third-party providers only when
                necessary, such as:
              </p>
              <ul>
                <li>Payment processors</li>
                <li>Website hosting providers</li>
                <li>Analytics services</li>
                <li>Advertising platforms</li>
                <li>Legal or regulatory authorities where required by law</li>
              </ul>
            </div>

            <div className="privacy-policy-section">
              <h2>5. Data Security</h2>
              <p>
                We take reasonable measures to protect your personal information
                from unauthorized access, misuse, or loss. However, no online
                platform is 100% secure.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2>6. Third-Party Platforms</h2>
              <p>
                Our services may link to or operate through third-party
                platforms such as Facebook, Instagram, LinkedIn, YouTube, or
                WhatsApp. Your use of those platforms is also subject to their
                own privacy policies.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2>7. Your Rights</h2>
              <p>Depending on your location, you may have rights to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
              <p>To make such requests, contact us using the details below.</p>
            </div>

            <div className="privacy-policy-section">
              <h2>8. Retention of Data</h2>
              <p>
                We keep your information only as long as necessary to provide
                services, meet legal obligations, and resolve disputes.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2>9. Children’s Privacy</h2>
              <p>
                Our services are not directed to children under 13, and we do
                not knowingly collect personal information from children without
                appropriate consent.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Updated
                versions will be posted on our website and platforms with a
                revised effective date.
              </p>
            </div>

            <div className="privacy-policy-section">
              <h2>11. Contact Us</h2>
              <p>
                <strong>Prince House Films</strong>
              </p>
              <p>Email: info@princehousefilms.com</p>
              <p>Phone: 0715130028</p>
              <p>Website: www.princehousefilms.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
