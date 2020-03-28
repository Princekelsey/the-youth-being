import React, { useEffect } from "react"
import Layout from "../components/layout"
import SideBar from "../components/sideBar"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Row, Col, Card, CardBody, CardSubtitle, Badge } from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../utils/slugifyFormatter"
import authors from "../utils/authors"
import commentBox from "commentbox.io"
import { DiscussionEmbed } from "disqus-react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

const projectID = "5706114352021504-proj"
const uniqueUrl = "www-theyouthbeing-com-1.disqus.com"

const SinglePost = ({ data, pageContext }) => {
  // useEffect(() => {
  //   const removeCommentBox = commentBox(projectID)
  //   return () => {
  //     removeCommentBox()
  //   }
  // }, [])
  const post = data.contentfulPost
  // const author = authors.find(author => author.name === post.author)
  const baseUrl = "https://theyouthbeing.com/"
  const disqusShortName = "www-theyouthbeing-com"
  const disqusConfig = {
    identifer: data.contentfulPost.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  }

  return (
    <Layout>
      <SEO title={post.title} />

      <div className="container">
        <h3 className="text-left">{post.title}</h3>
        <Row>
          <Col md="8">
            <Card>
              <img
                className="card-image-top"
                src={post.image.fluid.src}
                style={{ width: "100%" }}
              />
              <CardBody>
                <CardSubtitle>
                  <span className="text-info text-muted font-italic">
                    {post.date} by
                  </span>{" "}
                  {""}
                  <span className="text-info text-muted font-italic">
                    {post.author.name}
                  </span>
                </CardSubtitle>
                <div>
                  {documentToReactComponents(post.postBody.json, {
                    renderNode: {
                      [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
                        <img
                          src={`${node.data.target.fields.file["en-US"].url}?w=500`}
                        />
                      ),
                    },
                  })}
                </div>
                <ul className="post-tags">
                  {post.tags.map(tag => (
                    <li key={tag}>
                      <Link to={`/tag/${slugify(tag)}`}>
                        {" "}
                        <Badge color="primary" className="text-uppercase">
                          {tag}
                        </Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
            <h4 className="text-center text-capitalize">share this post</h4>
            <div className="text-center social-share-links">
              <ul>
                <li>
                  <a
                    href={
                      `https://www.facebook.com/sharer/sharer.php?u=` +
                      baseUrl +
                      pageContext.slug
                    }
                    className="facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      `https://www.twitter.com/share?url=` +
                      baseUrl +
                      pageContext.slug +
                      "&text=" +
                      post.title +
                      "&via" +
                      "twitterhandle"
                    }
                    className="twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      `https://www.plus.google.com/share?url=` +
                      baseUrl +
                      pageContext.slug
                    }
                    className="google"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-google fa-2x"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={
                      `https://www.linkedin.com/shareArticle?url=` +
                      baseUrl +
                      pageContext.slug
                    }
                    className="linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-2">
              <DiscussionEmbed
                shortname={disqusShortName}
                config={disqusConfig}
              />
            </div>
          </Col>
          <Col md="4">
            <SideBar
              postAuthor={post.author}
              authorImageFluid={post.author.image.fluid.src}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export const postQuerry = graphql`
  query blogPostBySlug($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      id
      postBody {
        json
      }
      title
      date(formatString: "MMM Do YYYY")
      tags
      author {
        google
        facebook
        instagram
        linkedin
        name
        bio {
          bio
        }
        image {
          fluid(maxWidth: 300) {
            src
          }
        }
      }
      image {
        fluid(maxWidth: 800) {
          src
        }
      }
    }
  }
`

export default SinglePost
