import React from "react"

const Footer = () => {
  return (
    <div className="site-footer">
      <h4 className="text-center">
        {" "}
        copyright&copy;{new Date().getFullYear()} <span>The YouthBeing</span>{" "}
        all rights reserved
      </h4>
      <p className="text-center"> Follow us on social media</p>
      <div className="footer-social-links">
        <ul className="social-links-list">
          <li className="mr-4">
            <a
              href="https://www.facebook.com/The-Youth-Being-106023814431186/"
              className="facebook"
              style={{ color: "#4267B2" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://youtube.com/channel/UCXyVdy5HHesVj3HS3Jm304A"
              style={{ color: "#FF0000" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </li>

          <li className="mr-4">
            <a
              href="https://www.instagram.com/__t_y_b_?r=nametag"
              className="instagram"
              style={{ color: "#bc2a8d" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.linkedin.com/in/theyouthbeing-tyb-6a1222219"
              style={{ color: "#0077b5" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
