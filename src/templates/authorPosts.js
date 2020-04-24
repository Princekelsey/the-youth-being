import React, { useState } from "react"
import { Row, Col } from "reactstrap"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import Post from "../components/post"
import CustomPagination from "../components/customPagination"

const AuthorPosts = ({ data, pageContext }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const postPerPage = 3

  const { totalCount } = data.allContentfulPost
  const numberOfPages = Math.ceil(totalCount / postPerPage)

  const handleClick = (e, index) => {
    e.preventDefault()

    setCurrentPage(index)
  }

  const pageHeaderTitle = `${totalCount} Post${
    totalCount === 1 ? "" : "s"
  } by:  ${pageContext.authorName}`
  let author = []
  author = data.allContentfulPost.edges.map(({ node }) => {
    return node.author
  })

  // console.log(author)

  return (
    <Layout>
      <div className="container">
        <h3 className="text-left category-text">{pageHeaderTitle}</h3>
        <Row>
          <Col md="8">
            {data.allContentfulPost.edges
              .slice(currentPage * postPerPage, (currentPage + 1) * postPerPage)
              .map(({ node }) => {
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
            {totalCount > postPerPage ? (
              <CustomPagination
                currentPage={currentPage}
                handleClick={handleClick}
                numberOfPages={numberOfPages}
              />
            ) : null}
          </Col>
          <Col md="4">
            {author.length ? (
              <SideBar
                postAuthor={author[0]}
                authorImageFluid={author[0].image.fluid.src}
              />
            ) : null}
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
            google
            facebook
            instagram
            linkedin
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
