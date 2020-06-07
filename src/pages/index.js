import React, { useState } from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import { Row, Col } from "reactstrap"
import Post from "../components/post"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import ImageSlider from "../components/imageSlider"
import SideBar from "../components/sideBar"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Title />
      <ImageSlider />

      <div className="container pt-4">
        <Row>
          <Col md="8">
            <StaticQuery
              query={indexQuerry}
              render={data => {
                return (
                  <div>
                    {data.allContentfulPost.edges.map(({ node }) => (
                      <Post
                        key={node.id}
                        title={node.title}
                        author={node.author.name}
                        date={node.date}
                        slug={node.slug}
                        body={node.shortIntroduction.shortIntroduction}
                        tags={node.tags}
                        fluidImage={node.image.fluid.src}
                      />
                    ))}
                  </div>
                )
              }}
            />

            <Link
              to="/posts"
              className="btn btn-sm rounded-pill btn-main mb-4 text-uppercase"
            >
              all posts
            </Link>
          </Col>
          <Col md="4">
            <SideBar />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

const indexQuerry = graphql`
  query {
    allContentfulPost(filter: { featured: { eq: true } }) {
      edges {
        node {
          date(formatString: "MMM Do YYY")
          id
          slug
          tags
          title
          shortIntroduction {
            shortIntroduction
          }
          author {
            name
          }
          image {
            fluid(maxWidth: 800) {
              src
            }
          }
        }
      }
    }
  }
`

export default IndexPage
