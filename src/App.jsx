import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Partnerships from "./components/Partnership/Partnership";
import Team from "./components/Team/Team";
import GetInTouch from "./components/GetInTouch/GetInTouch";
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
    }, 1500);

    // Handle sticky header
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Initialize scroll to top button
    const scrollTop = document.querySelector(".scroll-top");
    if (scrollTop) {
      const toggleScrollTop = () => {
        scrollTop.classList.toggle("active", window.scrollY > 300);
      };

      window.addEventListener("scroll", toggleScrollTop);

      scrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {loading && <Preloader />}

      <Hero />
      <Header isSticky={isHeaderSticky} />

      <main id="main">
        <About />
        <Services />
        <Partnerships />
        <Team />
        <GetInTouch />
      </main>

      <Footer />

      <a href="#" className="scroll-top">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

export default App;
