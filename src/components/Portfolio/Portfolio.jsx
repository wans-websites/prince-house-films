import React from "react";

const Portfolio = () => {
  const alphabetItems = [
    {
      letter: "A",
      title: "Antelope",
      image:
        "https://images.pexels.com/photos/1499596/pexels-photo-1499596.jpeg",
      video: "https://www.youtube.com/watch?v=LHsq9y2PibM",
      top: "30%",
    },
    {
      letter: "B",
      title: "Baboon",
      image:
        "https://images.pexels.com/photos/2825904/pexels-photo-2825904.jpeg",
      video: "https://youtube.com/shorts/6IoaSfRx-lM",
      top: "30%",
    },
    {
      letter: "C",
      title: "Crocodile",
      image:
        "https://images.pexels.com/photos/60644/nile-crocodile-crocodylus-niloticus-zoo-60644.jpeg",
      video: "https://www.youtube.com/watch?v=JAyjYMqWm5A",
      top: "0",
    },
    {
      letter: "D",
      title: "Dolphine",
      image: "https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg",
      video: "https://youtube.com/shorts/OTBrtHGKTms",
      top: "0",
    },
    {
      letter: "E",
      title: "Eagle",
      image:
        "https://images.pexels.com/photos/48132/eagle-bird-predator-detail-48132.jpeg",
      video: "https://www.youtube.com/watch?v=DTJeMph9h70",
      top: "30%",
    },
    {
      letter: "F",
      title: "Flamingo",
      image:
        "https://images.pexels.com/photos/3864706/pexels-photo-3864706.jpeg",
      video: "https://www.youtube.com/watch?v=gReQlnaUKNs",
      top: "30%",
    },
    {
      letter: "G",
      title: "Gorilla",
      image:
        "https://images.pexels.com/photos/6696250/pexels-photo-6696250.jpeg",
      video: "https://www.youtube.com/watch?v=BxUpjlzUumQ",
      top: "0",
    },
    {
      letter: "H",
      title: "Hare",
      image:
        "https://images.pexels.com/photos/2576780/pexels-photo-2576780.jpeg",
      video: "https://youtube.com/shorts/x52NBY0-IvI",
      top: "0",
    },
  ];

  return (
    <section id="portfolio" className="portfolio" data-aos="fade-up">
      <div className="container">
        <div className="section-header">
          <h2>Alphabet Series</h2>
          <p>Watch WildNow short fun facts</p>
        </div>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="200">
        <div
          className="portfolio-isotope"
          data-portfolio-filter=".filter-ah"
          data-portfolio-layout="masonry"
          data-portfolio-sort="original-order"
        >
          <ul className="portfolio-flters">
            <li data-filter=".filter-ah" className="filter-active">
              <a href="alphabet.html" className="btn-getstarted">
                Watch All
              </a>
            </li>
          </ul>

          <div className="row g-0 portfolio-container">
            {alphabetItems.map((item, index) => (
              <div
                key={index}
                className="col-xl-3 col-lg-4 col-md-6 portfolio-item filter-ah"
              >
                <img src={item.image} className="img-fluid" alt={item.title} />
                <h1
                  style={{
                    color: "rgba(255, 255, 255, 0.787)",
                    fontSize: "200px",
                    position: "absolute",
                    top: item.top,
                    left: "36%",
                  }}
                >
                  {item.letter}
                </h1>
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <a
                    href={item.video}
                    className="glightbox btn-watch-video d-flex align-items-center"
                  >
                    <i className="bi bi-play-circle"></i>
                    <span></span>
                  </a>
                  <a
                    style={{ marginTop: "3px" }}
                    href={item.image}
                    title={item.title}
                    data-gallery="portfolio-gallery"
                    className="glightbox preview-link"
                  >
                    <i className="bi bi-zoom-in"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
