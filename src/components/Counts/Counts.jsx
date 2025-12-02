import React, { useEffect, useState, useRef } from "react";

const Counts = () => {
  const [counts, setCounts] = useState({
    trees: 0,
    members: 0,
    schools: 0,
  });

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.current) {
            setIsVisible(true);
            counted.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate counters
      const animateCounter = (start, end, duration, callback) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          callback(value);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };

      animateCounter(0, 10, 4000, (value) => {
        setCounts((prev) => ({ ...prev, trees: value }));
      });

      animateCounter(0, 200, 2000, (value) => {
        setCounts((prev) => ({ ...prev, members: value }));
      });

      animateCounter(0, 20, 1000, (value) => {
        setCounts((prev) => ({ ...prev, schools: value }));
      });
    }
  }, [isVisible]);

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section id="counts" className="counts" ref={sectionRef}>
      <div className="container">
        <div className="text-center">
          <h3
            style={{ color: "white", position: "relative", zIndex: 2 }}
            className="mb-4"
          >
            What we have achieved so far
          </h3>
        </div>

        <div className="row counters position-relative">
          <div className="col-lg-4 col-12 text-center">
            <span
              className="purecounter"
              style={{
                fontSize: "44px",
                fontWeight: "700",
                display: "block",
                color: "#ff0400",
                fontFamily: '"Dosis", sans-serif',
              }}
            >
              {formatNumber(counts.trees)}
            </span>
            <p>Years crafting stories</p>
          </div>

          <div className="col-lg-4 col-12 text-center">
            <span
              className="purecounter"
              style={{
                fontSize: "44px",
                fontWeight: "700",
                display: "block",
                color: "#ff0400",
                fontFamily: '"Dosis", sans-serif',
              }}
            >
              {formatNumber(counts.members)}
            </span>
            <p>Projects Done</p>
          </div>

          <div className="col-lg-4 col-12 text-center">
            <span
              className="purecounter"
              style={{
                fontSize: "44px",
                fontWeight: "700",
                display: "block",
                color: "#ff0400",
                fontFamily: '"Dosis", sans-serif',
              }}
            >
              Global
            </span>
            <p>Clients & festivals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counts;
