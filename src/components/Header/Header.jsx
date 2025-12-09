import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/img/phf_logo.png";

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
    { id: "counts", label: "Impact", path: "/impact" },
    { id: "services", label: "What We Do", path: "/services" },
    { id: "approach", label: "Our Approach", path: "/approach" },
    { id: "portfolio", label: "Portfolio", path: "/portfolio" },
    { id: "team", label: "The Team", path: "/team" },
    { id: "why-us", label: "Why Us", path: "/why-us" },
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

              <li className="d-lg-none mt-4">
                <a
                  href="/contact"
                  className="phf-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 24px",
                    background:
                      "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "50px",
                    fontWeight: "600",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 25px rgba(255, 4, 0, 0.3)",
                  }}
                  onClick={closeMobileNav}
                >
                  Start Project <i className="bi bi-arrow-right"></i>
                </a>
              </li>
            </ul>
            <i
              className={`bi ${
                mobileNavOpen ? "bi-x" : "bi-list"
              } mobile-nav-toggle d-lg-none`}
              onClick={toggleMobileNav}
            ></i>
          </nav>

          <a
            href="/contact"
            className="phf-btn d-none d-lg-flex"
            style={{
              alignItems: "center",
              gap: "10px",
              padding: "12px 28px",
              background:
                "linear-gradient(90deg, var(--color-primary), var(--color-primary-dark))",
              color: "white",
              textDecoration: "none",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "15px",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(255, 4, 0, 0.3)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 30px rgba(255, 4, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 25px rgba(255, 4, 0, 0.3)";
            }}
          >
            Start Project <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="navbar-mobile-backdrop" onClick={closeMobileNav} />
      )}
    </>
  );
};

export default Header;
