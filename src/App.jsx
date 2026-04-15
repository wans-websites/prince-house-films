// src/App.jsx

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Partnerships from "./components/Partnership/Partnership";
import Team from "./components/Team/Team";
import GetInTouch from "./components/GetInTouch/GetInTouch";
import Footer from "./components/Footer/Footer";
import Preloader from "./components/Preloader/Preloader";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { sanityClient } from "./lib/sanity";
import { heroQuery, servicesQuery } from "./lib/queries";
import "./styles/global.css";
import "./styles/dark-theme.css";

function HomePage({
  loading,
  isHeaderSticky,
  showScrollTop,
  heroData,
  servicesData,
  handleScrollTop,
}) {
  return (
    <>
      {loading && <Preloader />}

      <Hero data={heroData} />
      <Header isSticky={isHeaderSticky} />

      <main id="main">
        <About />
        <Services services={servicesData} />
        <Partnerships />
        <Team />
        <GetInTouch />
      </main>

      <Footer />

      <a
        href="#top"
        className={`scroll-top ${showScrollTop ? "active" : ""}`}
        onClick={handleScrollTop}
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}

function PolicyPage() {
  return (
    <>
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        const [hero, services] = await Promise.all([
          sanityClient.fetch(heroQuery),
          sanityClient.fetch(servicesQuery),
        ]);

        if (!isMounted) return;

        setHeroData(hero || null);
        setServicesData(Array.isArray(services) ? services : []);
      } catch (error) {
        console.error("Failed to load Sanity content:", error);
      } finally {
        if (!isMounted) return;
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 800);
      }
    };

    const handleScroll = () => {
      const y = window.scrollY;
      setIsHeaderSticky(y > 100);
      setShowScrollTop(y > 300);
    };

    loadContent();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              loading={loading}
              isHeaderSticky={isHeaderSticky}
              showScrollTop={showScrollTop}
              heroData={heroData}
              servicesData={servicesData}
              handleScrollTop={handleScrollTop}
            />
          }
        />
        <Route path="/privacy-policy" element={<PolicyPage />} />
      </Routes>
    </>
  );
}

export default App;
