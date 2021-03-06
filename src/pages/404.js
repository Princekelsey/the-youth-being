import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import { Row, Col } from "reactstrap"
import SideBar from "../components/sideBar"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <div className="container pt-2">
      <Row>
        <Col md="8">
          <div className="mb-2">
            <h3 className="text-left">Ooops! Page Found </h3>
            <p>
              Is either the page your looking for doesn&#39;t exist or there is
              no post in this category yet. My Bad.
            </p>
            <Link
              className="btn btn-sm rounded-pill btn-main text-uppercase"
              to="/"
            >
              {" "}
              Go Back To Home
            </Link>
          </div>
        </Col>
        <Col md="4">
          <SideBar />
        </Col>
      </Row>
    </div>
  </Layout>
)

export default NotFoundPage
