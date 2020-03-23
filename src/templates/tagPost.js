import React from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"

const TagPost = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const pageHeaderTitle = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with ${tag}`
  return (
    <Layout>
      <div className="container">
        <h3 className="text-left category-text">{pageHeaderTitle}</h3>
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
    </Layout>
  )
}

export const tagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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

export default TagPost
