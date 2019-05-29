/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createFilePath, createFileNode, createRemoteFileNode} = require(`gatsby-source-filesystem`)

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
		resolve(graphql(`{
				mdBlogs: allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					limit: 1000
				) {
					edges {
						node {
							fields {
								slug
							}
						}
					}
				}
				jsonBlogs: allThirdPartyPosts(
					sort: { order: DESC, fields: [date] }
					limit: 1000
				) {
					edges {
						node {
							title
							slug
						}
					}		
				}
			}
			`).then(result => {
				if (result.errors) {
					console.log(result.errors)
					return reject(result.errors)
				}

				const mdBlogTemplate = path.resolve('./src/templates/blog-post.js')

				result.data.mdBlogs.edges.forEach(({ node }) => {
					createPage({
						path: node.fields.slug,
						component: mdBlogTemplate,
						context: {
							slug: node.fields.slug,
						},
					})
				})
				
				const jsonBlogTemplate = path.resolve('./src/templates/blog-post-json.js')
				const posts = result.data.jsonBlogs.edges
				
				posts.forEach(({ node }, index) => {
					const prev = index === posts.length - 1 ? null : posts[index + 1].node
					const next = index === 0 ? null : posts[index - 1].node
					
					createPage({
						path: `${node.slug}`,
						component: jsonBlogTemplate,
						context: {
							slug: node.slug,
							prev,
							next,
						},
					})
				})
				return 
			})
		)}
	)	
}


exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: `blog${slug}`,
        })
	}
}