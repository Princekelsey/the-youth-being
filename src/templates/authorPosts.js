import React from "react"
import { Row, Col } from "reactstrap"
import { graphql } from "gatsby"
import authors from "../utils/authors"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"

const AuthorPosts = ({ data, pageContext }) => {
  const { totalCount } = data.allMarkdownRemark
  const pageHeaderTitle = `${totalCount} Post${
    totalCount === 1 ? "" : "s"
  } by:  ${pageContext.authorName}`
  const author = authors.find(author => author.name === pageContext.authorName)
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
            <SideBar
              postAuthor={author}
              authorImageFluid={data.file.childImageSharp.fluid}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export const authorsPostQuery = graphql`
  query($authorName: String!, $imageUrl: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $authorName } } }
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
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default AuthorPosts
