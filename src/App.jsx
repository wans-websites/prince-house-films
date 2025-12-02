import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Counts from "./components/Counts/Counts";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/Preloader/Preloader";
import "./styles/global.css";
import "./styles/dark-theme.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Handle sticky header
    const handleScroll = () => {
      const hero = document.getElementById("hero-animated");
      const header = document.getElementById("header");

      if (hero && header) {
        const heroHeight = hero.offsetHeight;
        const scrollPosition = window.scrollY;

        // Header should become sticky when we've scrolled past the hero section
        // (when the header's normal position would be at the top)
        if (scrollPosition > heroHeight) {
          setIsHeaderSticky(true);
        } else {
          setIsHeaderSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load
    handleScroll();

    // Initialize scripts
    const initScripts = () => {
      // AOS
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
      }

      // GLightbox
      if (window.GLightbox) {
        window.GLightbox({
          selector: ".glightbox",
        });
      }

      // Scroll to top
      const scrollTop = document.querySelector(".scroll-top");
      if (scrollTop) {
        const toggleScrollTop = () => {
          if (window.scrollY > 100) {
            scrollTop.classList.add("active");
          } else {
            scrollTop.classList.remove("active");
          }
        };

        window.addEventListener("load", toggleScrollTop);
        window.addEventListener("scroll", toggleScrollTop);

        scrollTop.addEventListener("click", (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }

      // Mobile nav toggle
      const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
      const navbar = document.querySelector("#navbar");

      if (mobileNavToggle && navbar) {
        mobileNavToggle.addEventListener("click", function (e) {
          e.preventDefault();
          navbar.classList.toggle("navbar-mobile");
          this.classList.toggle("bi-list");
          this.classList.toggle("bi-x");
        });
      }
    };

    // Load external scripts
    const loadScripts = () => {
      // Check if scripts are already loaded
      if (!window.AOS) {
        const aosScript = document.createElement("script");
        aosScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js";
        document.body.appendChild(aosScript);
      }

      if (!window.GLightbox) {
        const glightboxScript = document.createElement("script");
        glightboxScript.src =
          "https://cdn.jsdelivr.net/npm/glightbox@3.2.0/dist/js/glightbox.min.js";
        document.body.appendChild(glightboxScript);
      }

      if (!window.Isotope) {
        const isotopeScript = document.createElement("script");
        isotopeScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/isotope-layout/3.0.6/isotope.pkgd.min.js";
        document.body.appendChild(isotopeScript);
      }

      // Check when scripts are loaded
      const checkScripts = setInterval(() => {
        if (window.AOS && window.GLightbox) {
          clearInterval(checkScripts);
          initScripts();
        }
      }, 100);
    };

    if (!loading) {
      loadScripts();
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader />}
      <Hero />
      <Header isSticky={isHeaderSticky} />
      <main id="main">
        <About />
        <Counts />
        {/* <Services />
        <Portfolio /> */}
      </main>
      {/* <Footer /> */}

      <a
        href="#"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default App;
