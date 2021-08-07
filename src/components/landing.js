import React from "react"
import { Card, CardBody, CardTitle, CardImg, CardText } from "reactstrap"
import values from "../images/values.jpg"
import vision from "../images/vision.jpg"
import mission from "../images/mission-n.jpeg"

const Landing = () => {
  return (
    <React.Fragment>
      <Card className="mb-4 ">
        <CardImg src={vision} />
        <CardBody>
          <CardTitle>
            <strong
              className="px-2 rounded"
              style={{
                color: "#fff",
                background: "#663399",
              }}
            >
              VISION STATEMENT
            </strong>
          </CardTitle>
          <CardText>
            To be recognized as a global organization that is actively involved
            in the empowerment of the youths in Africa and beyond to enable them
            to BECOME who they've been created to be.
          </CardText>
        </CardBody>
      </Card>
      <Card className="mb-4">
        <CardImg src={mission} bottom />
        <CardBody>
          <CardTitle>
            <strong
              className="px-2 rounded"
              style={{
                color: "#fff",
                background: "#663399",
              }}
            >
              MISION STATEMENT
            </strong>
          </CardTitle>
          <CardText>
            We provide Truth and Valuable knowledge about Life and all that
            pertains to it through any and every platform available thereby
            instilling the right mindset.
          </CardText>
        </CardBody>
      </Card>
      <Card className="mb-4">
        <CardImg src={values} bottom />
        <CardBody>
          <CardTitle>
            <strong
              className="px-2 rounded"
              style={{
                color: "#fff",
                background: "#663399",
              }}
            >
              CORE VALUES
            </strong>
          </CardTitle>
          <ul>
            <li>- Authenticity</li>
            <li>- Knowledge</li>
            <li>- Vision</li>
            <li>
              - Partnerships and Collaboration with brands/organizations that
              share similar vision
            </li>
            <li>- Integrity</li>
            <li>- Team Work</li>
            <li>- Excellence</li>
          </ul>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle
            className="px-2 rounded text-center"
            style={{
              color: "#fff",
              background: "#663399",
            }}
          >
            See us on social media
          </CardTitle>
          <ul className="social-links-list d-flex justify-content-center">
            <li className="mr-4">
              <a
                href="https://www.facebook.com/The-Youth-Being-106023814431186/"
                className="facebook"
                style={{ color: "#4267B2" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f fa-2x"></i>
              </a>
            </li>
            <li className="mr-4">
              <a
                href="https://youtube.com/channel/UCXyVdy5HHesVj3HS3Jm304A"
                className="instagram"
                style={{ color: "#FF0000" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x"></i>
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
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </li>
            <li className="mr-4">
              <a
                href="https://www.linkedin.com/in/theyouthbeing-tyb-6a1222219"
                style={{ color: "#0077b5" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </li>
          </ul>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Landing
