import React from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"

const TagPost = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { totalCount } = data.allContentfulPost
  const pageHeaderTitle = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with ${tag}`
  return (
    <Layout>
      <div className="container">
        <h3 className="text-left category-text">{pageHeaderTitle}</h3>
        <Row>
          <Col md="8">
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
    allContentfulPost(
      sort: { fields: date, order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          title
          slug
          date(formatString: "MMM Do YYYY")
          tags
          image {
            fluid(maxHeight: 800) {
              src
            }
          }
          shortIntroduction {
            shortIntroduction
          }
          author {
            name
          }
        }
      }
    }
  }
`

export default TagPost
