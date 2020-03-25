import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col, Row, Card, CardBody, CardText, CardTitle } from "reactstrap"
import SideBar from "../components/sideBar"
import authors from "../utils/authors"
import { slugify } from "../utils/slugifyFormatter"

const TeamPage = () => (
  <Layout>
    <SEO title="Team" />
    <div className="container pt-2">
      <h3 className="text-left">Our Team</h3>
      <Row>
        <Col md="8">
          {authors.map(author => (
            <Row className="mb-3" key={author.name}>
              <Col md="3">
                <img
                  src={author.imageLink}
                  alt={author.name}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col md="8">
                <Card style={{ minHeight: "100%" }}>
                  <CardBody>
                    <CardTitle className="text-capitalize">
                      {author.name}
                    </CardTitle>
                    <CardText>{author.bio}</CardText>
                    <Link
                      to={`/author/${slugify(author.name)}`}
                      className=" btn btn-sm rounded-pill btn-c text-capitalize text-center float-right"
                    >
                      View posts
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ))}
        </Col>

        <Col md="4">
          <SideBar />
        </Col>
      </Row>
    </div>
  </Layout>
)

export default TeamPage
