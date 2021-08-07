import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col, Row } from "reactstrap"
import SideBar from "../components/sideBar"
import logo from "../images/logo-nb.png"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="container pt-2">
      <Row>
        <Col md="8" className="mb-2">
          <div className="">
            <h3 className="text-left">About Us</h3>
            <p>
              In a fast paced world every youth's soul and being cries out for
              succor, knowledge and understanding. We are passionate to guide
              you through all life phases, spiritually, mentally, emotionally
              and physically with raw accurate truths and love to watch you
              evolve and BECOME!. This raw truth however is not from our head
              but from the "Word of God." This is our Only Truth and Manual. So
              as you learn from here, you will not just become your best, you
              will be who Jesus wants you to "Be".
            </p>
            <img
              src={logo}
              // style={{ width: "100%" }}
              alt="theyouthbeing"
              className="img-fluid"
            />
          </div>
        </Col>
        <Col md="4">
          <SideBar />
        </Col>
      </Row>
    </div>
  </Layout>
)

export default AboutPage
