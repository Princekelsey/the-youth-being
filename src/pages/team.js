import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Col, Row, Card, CardBody, CardText, CardTitle } from "reactstrap"
import SideBar from "../components/sideBar"
import authors from "../utils/authors"
import { slugify } from "../utils/slugifyFormatter"

const TeamPage = ({ data }) => {
  const authors = data.allContentfulAuthors.edges
  return (
    <Layout>
      <SEO title="Team" />
      <div className="container pt-2">
        <h3 className="text-left">Our Team</h3>
        <Row>
          <Col md="8">
            {authors.map(({ node }) => (
              <Row className="mb-3" key={node.name}>
                <Col md="3">
                  <img
                    src={node.image.fluid.src}
                    alt={node.name}
                    style={{ width: "100%" }}
                    className="img-fluid"
                  />
                </Col>
                <Col md="8">
                  <Card style={{ minHeight: "100%" }}>
                    <CardBody>
                      <CardTitle className="text-capitalize">
                        {node.name}
                      </CardTitle>
                      <CardText>{node.bio.bio}</CardText>
                      <Link
                        to={`/author/${slugify(node.name)}`}
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
}

export const teamQuerry = graphql`
  query MyQuery {
    allContentfulAuthors {
      edges {
        node {
          name
          id
          bio {
            bio
          }
          image {
            fluid(maxWidth: 300) {
              src
            }
          }
        }
      }
    }
  }
`

export default TeamPage
