import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/img/phf_logo.png";
const Header = ({ isSticky }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <header id="header" className={`header ${isSticky ? "sticked" : ""}`}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a
          href="https://www.wildnow.africa"
          className="logo d-flex align-items-center scrollto me-auto me-lg-0"
        >
          <img src={logo} alt="Prince House Films logo" />
        </a>

        <nav
          id="navbar"
          className={`navbar ${mobileNavOpen ? "navbar-mobile" : ""}`}
        >
          <ul>
            <li>
              <a className="nav-link scrollto active" href="#hero-animated">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="about.html">
                Who we are
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="about.html">
                What we do
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="about.html">
                Who we are
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="about.html">
                Our Objective
              </a>
            </li>

            <li>
              <a className="nav-link scrollto" href="alphabet.html">
                Our Approach
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="alphabet.html">
                The Team
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="alphabet.html">
                Why Us
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="alphabet.html">
                Portfolios
              </a>
            </li>
            <li>
              <a className="nav-link scrollto" href="alphabet.html">
                Gallery
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
      </div>
    </header>
  );
};

export default Header;
