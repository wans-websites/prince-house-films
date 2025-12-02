import React from "react";

const Services = () => {
  const initiatives = [
    {
      id: 1,
      title: "Pandamiti initiative",
      image: "/assets/img/bird.jpeg",
      description:
        "The initiative aims to build a tree planting culture amongst communities and schools in different parts of Kenya.",
      link: "pandamiti.html",
      icon: "bi-activity",
    },
    {
      id: 2,
      title: "Rudi initiative",
      image: "/assets/img/rudi.jpeg",
      description:
        "Rudi aims to preserve and educate on African indigenous wildlife knowledge and practices through film and storytelling.",
      link: "https://rudi.wildnow.africa/",
      external: true,
      icon: "bi-broadcast",
    },
    {
      id: 3,
      title: "Sera initiative",
      image:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "The initiative is focused on influencing, formulating and implementing environmental laws to protect humans, animals, resources, and habitats",
      link: "sera.html",
      icon: "bi-easel",
    },
  ];

  return (
    <section id="services" className="services">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>WildNow Foundation</h2>
          <h2>Initiatives</h2>
          <p>We advocate, conserve and tell stories</p>
        </div>

        <div className="row gy-5">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="col-xl-4 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="service-item">
                <div className="img">
                  <img
                    src={initiative.image}
                    className="img-fluid"
                    alt={initiative.title}
                  />
                </div>
                <div className="details position-relative">
                  <div className="icon">
                    <i className={`bi ${initiative.icon}`}></i>
                  </div>
                  <a
                    href={initiative.link}
                    className="stretched-link"
                    target={initiative.external ? "_blank" : "_self"}
                    rel={initiative.external ? "noopener noreferrer" : ""}
                  >
                    <h3>{initiative.title}</h3>
                  </a>
                  <p>{initiative.description}</p>
                  <a
                    href={initiative.link}
                    className="read-more align-self-start"
                    style={{ color: "#ff0400" }}
                    target={initiative.external ? "_blank" : "_self"}
                    rel={initiative.external ? "noopener noreferrer" : ""}
                  >
                    <span>Read More</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
