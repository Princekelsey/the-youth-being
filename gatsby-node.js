const { slugify } = require("./src/utils/slugifyFormatter")
const authors = require("./src/utils/authors")
const path = require("path")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const { createNodeField } = actions
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const singlePostTemplate = path.resolve("src/templates/singlePost.js")
  const tagPostTemplate = path.resolve("src/templates/tagPost.js")
  const categoryPostTemplate = path.resolve("src/templates/categoryPost.js")
  const postListTemplate = path.resolve("src/templates/postList.js")
  const authorPostsTemplate = path.resolve("src/templates/authorPosts.js")

  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                author
                tags
                categories
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: singlePostTemplate,
        context: {
          slug: node.fields.slug,
          imageUrl: authors.find(
            author => author.name === node.frontmatter.author
          ).imageUrl,
        },
      })
    })
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    let tagPostCount = {}
    tags.forEach(tag => {
      tagPostCount[tag] = (tagPostCount[tag] || 0) + 1
    })
    tags = _.uniq(tags)

    // tagPage
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: tagPostTemplate,
        context: {
          tag,
        },
      })
    })

    let categories = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.categories")) {
        categories = categories.concat(edge.node.frontmatter.categories)
      }
    })

    let categoryPostCount = {}
    categories.forEach(category => {
      categoryPostCount[category] = (categoryPostCount[category] || 0) + 1
    })
    categories = _.uniq(categories)

    // tagPage
    categories.forEach(category => {
      createPage({
        path: `/category/${slugify(category)}`,
        component: categoryPostTemplate,
        context: {
          category,
        },
      })
    })

    const postPerPage = 3
    const numberOfPages = Math.ceil(posts.length / postPerPage)
    Array.from({ length: numberOfPages }).forEach((ele, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1
      if (isFirstPage) return
      createPage({
        path: `/page/${currentPage}`,
        component: postListTemplate,
        context: {
          limit: postPerPage,
          skip: index * postPerPage,
          currentPage,
          numberOfPages,
        },
      })
    })

    // authors posts
    authors.forEach(author => {
      createPage({
        path: `/author/${slugify(author.name)}`,
        component: authorPostsTemplate,
        context: {
          authorName: author.name,
          imageUrl: author.imageUrl,
        },
      })
    })
  })
}
