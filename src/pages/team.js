import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col, Row } from "reactstrap"
import SideBar from "../components/sideBar"

const TeamPage = () => (
  <Layout>
    <SEO title="Team" />
    <div className="container pt-2">
      <Row>
        <Col md="8">
          <div className="">
            <h3 className="text-left">Our Team</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              neque, quas, dolor voluptatum quae at dignissimos, tempore
              recusandae quaerat iste harum. Accusantium, repudiandae optio non
              quis corrupti quasi praesentium nesciunt.
            </p>
          </div>
        </Col>
        <Col md="4">
          <SideBar />
        </Col>
      </Row>
    </div>
  </Layout>
)

export default TeamPage
