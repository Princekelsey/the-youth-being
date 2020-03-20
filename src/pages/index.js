import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"
import Title from "../components/title"
import ImageSlider from "../components/imageSlider"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Title />
    <ImageSlider />
    <h1>Home page</h1>
  </Layout>
)

export default IndexPage
