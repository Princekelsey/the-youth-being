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
                  Math.ceil(data.allContentfulPost.totalCount / postsPerPage)
                )

                return (
                  <div>
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
    allContentfulPost(sort: { fields: date, order: DESC }, limit: 3) {
      totalCount
      edges {
        node {
          id
          date(formatString: "MMM Do YYYY")
          author {
            name
          }
          title
          slug
          tags
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

export default IndexPage
