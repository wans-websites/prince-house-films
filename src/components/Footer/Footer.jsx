import React from "react";

const Footer = () => {
  return (
    <section id="footer" className="text-center" style={{ zIndex: 1888 }}>
      <div className="container">
        <div className="socials-media text-center">
          <ul className="list-unstyled">
            <li>
              <a href="https://www.facebook.com/wildnowfoundation">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/WildnowF">
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/wildnowfoundation/">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCOwyOyK5LqLbR9byJWxzT1w">
                <i className="bi bi-youtube"></i>
              </a>
            </li>
          </ul>
        </div>

        <p>&copy; Copyrights WildNow. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
