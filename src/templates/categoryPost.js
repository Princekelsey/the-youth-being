import React, { useState } from "react"
import { graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"
import NoCategoryFound from "../pages/noCategoryFound"
import CustomPagination from "../components/customPagination"

const CategoryPost = ({ data, pageContext }) => {
  const [currentPage, setCurrentPage] = useState(0)

  const postPerPage = 3
  const { totalCount } = data.allContentfulPost

  const numberOfPages = Math.ceil(totalCount / postPerPage)

  const handleClick = (e, index) => {
    e.preventDefault()

    setCurrentPage(index)
  }
  const { category } = pageContext
  const isCategory = data.allContentfulPost.edges

  return (
    <Layout>
      {isCategory.length ? (
        <div className="container">
          <span className="text-left category-text">Category:</span> {""}
          {category}
          <Row>
            <Col md="8">
              {data.allContentfulPost.edges
                .slice(
                  currentPage * postPerPage,
                  (currentPage + 1) * postPerPage
                )
                .map(({ node }) => (
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
              {totalCount > postPerPage ? (
                <CustomPagination
                  currentPage={currentPage}
                  handleClick={handleClick}
                  numberOfPages={numberOfPages}
                />
              ) : null}
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
