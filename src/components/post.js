import React from "react"
import { Link } from "gatsby"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Badge,
} from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../utils"

const Post = ({ title, author, path, date, body, fluidImage, tags }) => {
  return (
    <Card>
      <Link to={path}>
        {" "}
        <Img className="card-image-top" fluid={fluidImage} />
      </Link>
      <CardBody>
        <CardTitle>
          <Link to={path} className="headerText">
            {title}
          </Link>
        </CardTitle>
        <CardSubtitle>
          <span className="text-info text-muted font-italic">{date} by</span>{" "}
          {""}
          <span className="text-info text-muted font-italic">{author}</span>
        </CardSubtitle>
        <CardText>{body}</CardText>
        <ul className="post-tags">
          {tags.map(tag => (
            <li key={tag}>
              <Link to={`/tag/${slugify(tag)}`}>
                <Badge color="primary" className="text-uppercase    ">
                  {tag}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={path}
          className=" btn btn-sm rounded-pill btn-c text-capitalize text-center float-right"
        >
          Read more
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post
