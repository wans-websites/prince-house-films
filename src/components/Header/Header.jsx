import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/img/phf_word_logo.png";

const Header = ({ isSticky }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
    document.body.style.overflow = !mobileNavOpen ? "hidden" : "auto";
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
    document.body.style.overflow = "auto";
  };

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "Who We Are", path: "/about" },
    { id: "services", label: "What We Do", path: "/services" },
    { id: "partnerships", label: "partnerships", path: "/partnerships" },
    { id: "team", label: "The Team", path: "/team" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentPath = window.location.pathname;
      const sections = document.querySelectorAll("section[id]");

      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      if (current) {
        setActiveLink(current);
      } else if (currentPath === "/") {
        setActiveLink("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header id="header" className={`header ${isSticky ? "sticked" : ""}`}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center me-auto">
            <img src={logo} alt="Prince House Films" />
          </a>

          <nav
            id="navbar"
            className={`navbar ${mobileNavOpen ? "navbar-mobile" : ""}`}
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className={`nav-link scrollto ${
                      activeLink === item.id ? "active" : ""
                    }`}
                    href={item.path}
                    onClick={(e) => {
                      if (item.path.startsWith("/")) {
                        e.preventDefault();
                        if (item.path === "/") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          const element = document.getElementById(item.id);
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                        setActiveLink(item.id);
                        closeMobileNav();
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="d-flex align-items-center">
            <i
              className={`bi ${
                mobileNavOpen ? "bi-x" : "bi-list"
              } mobile-nav-toggle`}
              onClick={toggleMobileNav}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            ></i>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="navbar-mobile-backdrop" onClick={closeMobileNav} />
      )}
    </>
  );
};

export default Header;
