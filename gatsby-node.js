const { slugify } = require("./src/utils/slugifyFormatter")
const authors = require("./src/utils/authors")
const path = require("path")
const _ = require("lodash")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const singlePostTemplate = path.resolve("src/templates/singlePost.js")
  const tagPostTemplate = path.resolve("src/templates/tagPost.js")
  const categoryPostTemplate = path.resolve("src/templates/categoryPost.js")
  const postListTemplate = path.resolve("src/templates/postList.js")
  const authorPostsTemplate = path.resolve("src/templates/authorPosts.js")

  const posts = graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              title
              slug
              categories
              id
              tags
              author {
                name
              }
            }
          }
        }
      }
    `
  ).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allContentfulPost.edges
    posts.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: singlePostTemplate,
        context: {
          slug: node.slug,
          author: node.author.name,
        },
      })
    })
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.tags")) {
        tags = tags.concat(edge.node.tags)
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
      if (_.get(edge, "node.categories")) {
        categories = categories.concat(edge.node.categories)
      }
    })

    let categoryPostCount = {}
    categories.forEach(category => {
      categoryPostCount[category] = (categoryPostCount[category] || 0) + 1
    })
    categories = _.uniq(categories)

    // categories
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
    // authors.forEach(author => {
    //   createPage({
    //     path: `/author/${slugify(author.name)}`,
    //     component: authorPostsTemplate,
    //     context: {
    //       authorName: author.name,
    //       imageUrl: author.imageUrl,
    //     },
    //   })
    // })
  })
  const authors = graphql(`
    {
      allContentfulAuthors {
        totalCount
        edges {
          node {
            bio {
              bio
            }
            linkedin
            name
            twitter
            google
            id
            facebook
            image {
              fluid(maxWidth: 300) {
                src
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors)
    }
    const authors = result.data.allContentfulAuthors.edges
    authors.forEach(({ node }) => {
      createPage({
        path: `/author/${slugify(node.name)}`,
        component: authorPostsTemplate,
        context: {
          authorName: node.name,
          author: node.bio,
        },
      })
    })
  })

  return Promise.all([authors, posts])
}
