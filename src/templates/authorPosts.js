import React from "react"
import { Row, Col } from "reactstrap"
import { graphql } from "gatsby"
import authors from "../utils/authors"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"

const AuthorPosts = ({ data, pageContext }) => {
  const { totalCount } = data.allContentfulPost
  const pageHeaderTitle = `${totalCount} Post${
    totalCount === 1 ? "" : "s"
  } by:  ${pageContext.authorName}`
  const author = data.allContentfulPost.edges.map(({ node }) => {
    return node.author
  })

  return (
    <Layout>
      <div className="container">
        <h3 className="text-left category-text">{pageHeaderTitle}</h3>
        <Row>
          <Col md="8">
            {data.allContentfulPost.edges.map(({ node }) => {
              return (
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
              )
            })}
          </Col>
          <Col md="4">
            <SideBar
              postAuthor={author[0]}
              authorImageFluid={author[0].image.fluid.src}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export const authorsPostQuery = graphql`
  query($authorName: String!) {
    allContentfulPost(
      filter: { author: { name: { eq: $authorName } } }
      sort: { fields: date, order: DESC }
      limit: 4
    ) {
      edges {
        node {
          slug
          tags
          title
          id
          shortIntroduction {
            shortIntroduction
          }
          date(formatString: "MMM Do YYYY")
          image {
            fluid(maxWidth: 800) {
              src
            }
          }
          author {
            name
            image {
              fluid(maxWidth: 300) {
                src
              }
            }
            bio {
              bio
            }
          }
        }
      }
      totalCount
    }
  }
`

export default AuthorPosts
