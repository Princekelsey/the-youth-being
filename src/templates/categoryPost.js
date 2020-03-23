import React from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"
import NoCategoryFound from "../pages/noCategoryFound"

const CategoryPost = ({ data, pageContext }) => {
  const { category } = pageContext
  return (
    <Layout>
      {category ? (
        <div className="container">
          <span className="text-left category-text">Category:</span> {""}
          {category}
          <Row>
            <Col md="8">
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Post
                  key={node.id}
                  title={node.frontmatter.title}
                  author={node.frontmatter.author}
                  date={node.frontmatter.date}
                  slug={node.fields.slug}
                  body={node.excerpt}
                  tags={node.frontmatter.tags}
                  fluidImage={node.frontmatter.image.childImageSharp.fluid}
                />
              ))}
            </Col>
            <Col md="4">
              <SideBar />
            </Col>
          </Row>
        </div>
      ) : (
        <NoCategoryFound />
      )}
    </Layout>
  )
}

export const categoryQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default CategoryPost
