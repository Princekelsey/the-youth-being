import React from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"
import PaginationLinks from "../components/paginationLinks"

const PostList = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = pageContext
  return (
    <Layout>
      <div className="container">
        <Row>
          <Col md="8">
            {posts.map(({ node }) => (
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
            <PaginationLinks
              currentPage={currentPage}
              numberOfPages={numberOfPages}
            />
          </Col>
          <Col md="4">
            <SideBar />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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

export default PostList
