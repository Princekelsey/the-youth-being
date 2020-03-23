import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"
import Post from "../components/post"

import Layout from "../components/layout"

import SEO from "../components/seo"
import Title from "../components/title"
import ImageSlider from "../components/imageSlider"
import SideBar from "../components/sideBar"
import PaginationLinks from "../components/paginationLinks"

const IndexPage = () => {
  const [numberOfPages, setNumberOfPages] = useState("")
  const postsPerPage = 3
  return (
    <Layout>
      <SEO title="Home" />
      <Title />
      <ImageSlider />

      <div className="container pt-4">
        <Row>
          <Col md="8">
            <StaticQuery
              query={indexQuerry}
              render={data => {
                setNumberOfPages(
                  Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage)
                )

                return (
                  <div>
                    {data.allMarkdownRemark.edges.map(({ node }) => (
                      <Post
                        key={node.id}
                        title={node.frontmatter.title}
                        author={node.frontmatter.author}
                        date={node.frontmatter.date}
                        slug={node.fields.slug}
                        body={node.excerpt}
                        tags={node.frontmatter.tags}
                        fluidImage={
                          node.frontmatter.image.childImageSharp.fluid
                        }
                      />
                    ))}
                  </div>
                )
              }}
            />
            <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
          </Col>
          <Col md="4">
            <SideBar />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

const indexQuerry = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            author
            date(formatString: "MMM Do YYYY")
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 900) {
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

export default IndexPage
