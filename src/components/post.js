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
import { slugify } from "../utils/slugifyFormatter"

const Post = ({ title, author, slug, date, body, fluidImage, tags }) => {
  return (
    <Card>
      <Link to={slug}>
        {" "}
        <img
          alt={title}
          src={fluidImage}
          className="card-image-top"
          style={{ width: "100%" }}
        />
      </Link>
      <CardBody>
        <CardTitle className="text-capitalize">
          <Link to={slug} className="headerText">
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
              <Link to={`/tag/${slugify(tag.trim())}`}>
                <Badge color="primary" className="text-uppercase">
                  {tag}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={slug}
          className=" btn btn-sm rounded-pill btn-c text-capitalize text-center float-right"
        >
          Read more
        </Link>
      </CardBody>
    </Card>
  )
}

export default Post
