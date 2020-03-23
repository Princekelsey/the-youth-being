import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col, Row } from "reactstrap"
import SideBar from "../components/sideBar"

const NoCategoryFound = () => {
  return (
    <Layout>
      <SEO title="Category" />
      <div className="container pt-2">
        <Row>
          <Col md="8">
            <div className="">
              <h3 className="text-left">Category Section</h3>
              <p>
                Ooops, Sorry no post with this category yet. Check back later
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
}

export default NoCategoryFound
