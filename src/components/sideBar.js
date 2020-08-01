import React from "react"
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
} from "reactstrap"
import { graphql, StaticQuery, Link } from "gatsby"

const SideBar = ({ postAuthor, authorImageFluid }) => {
  return (
    <div>
      {postAuthor && (
        <Card>
          <img
            className="card-image-top"
            src={authorImageFluid}
            alt={postAuthor.name}
            style={{ width: "100%" }}
          />
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              {postAuthor.name}
            </CardTitle>
            <CardText>{postAuthor.bio.bio}</CardText>
            <div className="author-social-links text-center">
              <ul>
                <li>
                  <a
                    href={postAuthor.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook"
                  >
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={postAuthor.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter"
                  >
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={postAuthor.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram"
                  >
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={postAuthor.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google"
                  >
                    <i className="fab fa-google fa-lg"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={postAuthor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                  >
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Newsletter
          </CardTitle>
          <Form className="text-center">
            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="your email address..."
              />
            </FormGroup>
            <button type="button" className="btn btn-sm rounded-pill btn-main">
              Subscribe
            </button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase ">
            Advertisement
          </CardTitle>
          <img
            src="https://via.placeholder.com/320x200"
            alt="Advert"
            style={{ width: "100%" }}
          />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Featured posts
          </CardTitle>
          <StaticQuery
            query={sideBarQuery}
            render={data => (
              <div>
                {data.allContentfulPost.edges.map(({ node }) => (
                  <Card key={node.id}>
                    <Link to={`/posts/${node.slug}`}>
                      <img
                        alt={node.slug}
                        className="card-image-top"
                        src={node.image.fluid.src}
                        style={{ width: "100%" }}
                      />
                    </Link>
                    <CardBody>
                      <CardTitle>
                        <Link to={`/posts/${node.slug}`}>{node.title}</Link>
                      </CardTitle>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  )
}

const sideBarQuery = graphql`
  query {
    allContentfulPost(sort: { fields: date, order: DESC }, limit: 3) {
      edges {
        node {
          id
          title
          slug
          image {
            fluid(maxWidth: 300) {
              src
            }
          }
        }
      }
    }
  }
`

export default SideBar
