import React from "react";
import { motion } from "framer-motion";
import "./Footer.css";
import logo from "../../assets/img/phf_logo.png";

const Footer = () => {
  const socials = [
    {
      icon: "bi bi-instagram",
      href: "https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs",
    },
    {
      icon: "bi bi-youtube",
      href: "https://www.youtube.com/channel/UCOwyOyK5LqLbR9byJWxzT1w",
    },
    {
      icon: "bi bi-tiktok",
      href: "https://www.tiktok.com/@princehousefilms?_r=1&_t=ZS-93Two21vb3y",
    },
    // {
    //   icon: "bi bi-linkedin",
    //   href: "https://linkedin.com/company/princehousefilms",
    // },
    {
      icon: "bi bi-facebook",
      href: "https://www.facebook.com/Princehousefilms?mibextid=wwXIfr&rdid=aouG8uGzL9Uk0Kvw&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17PyRWjWCT%2F%3Fmibextid%3DwwXIfr%26ref%3D1#",
    },
  ];

  return (
    <footer className="phf-footer">
      <div className="footer-glow" />

      <div className="container">
        {/* Socials */}
        <motion.div
          className="footer-socials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img src={logo} alt="Prince House Films" />
          <div style={{ display: "flex", gap: 10 }}>
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={s.icon} />
              </motion.a>
            ))}
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} Prince House Films
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
