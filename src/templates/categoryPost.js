import React from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"
import NoCategoryFound from "../pages/noCategoryFound"

const CategoryPost = ({ data, pageContext }) => {
  const { category } = pageContext
  const isCategory = data.allContentfulPost.edges
  console.log(isCategory)

  return (
    <Layout>
      {isCategory.length ? (
        <div className="container">
          <span className="text-left category-text">Category:</span> {""}
          {category}
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
      ) : (
        <NoCategoryFound />
      )}
    </Layout>
  )
}

export const categoryQuery = graphql`
  query($category: String!) {
    allContentfulPost(
      filter: { categories: { in: [$category] } }
      sort: { fields: date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          date(formatString: "MMM Do YYYY")
          author {
            name
          }
          slug
          tags
          title
          shortIntroduction {
            shortIntroduction
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

export default CategoryPost
