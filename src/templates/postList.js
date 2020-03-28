import React from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"
import PaginationLinks from "../components/paginationLinks"

const PostList = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges
  const { currentPage, numberOfPages } = pageContext
  return (
    <Layout>
      <div className="container">
        <Row>
          <Col md="8">
            {posts.map(({ node }) => (
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
    allContentfulPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          slug
          tags
          title
          image {
            fluid(maxWidth: 800) {
              src
            }
          }
          author {
            name
          }
          date(formatString: "MMM Do YYYY")
          shortIntroduction {
            shortIntroduction
          }
        }
      }
    }
  }
`

export default PostList
