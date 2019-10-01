/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createFilePath, createFileNode, createRemoteFileNode} = require(`gatsby-source-filesystem`)
const fileExists = require('file-exists');
const axios = require('axios');

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions
	return new Promise((resolve, reject) => {
		resolve(graphql(`{
				blogPosts: allThirdPartyPosts(
					sort: { order: DESC, fields: [date] }
					limit: 1000
				) {
					edges {
						node {
							id
							title
							slug
						}
					}		
				}
				templatedPages: allThirdPartyPages {
					edges {
						node {
							name
							nav_level
							parent_id
							type
							slug
						}
					}		
				}
				sitePreferences: allThirdPartyPreferences {
					edges {
						node {
							logo_favicon_img_local {
								childImageSharp {
									fixed(width: 512, height: 512) {
										src
									}
								}
								publicURL
							}
						}
					}
				}
			}
			`).then(result => {
				if (result.errors) {
					console.log(result.errors)
					return reject(result.errors)
				}
				
				const blogPostTemplate = path.resolve('./src/templates/blog-post-template.js')
				const posts = result.data.blogPosts.edges
				
				posts.forEach(({ node }, index) => {
					const prev = index === posts.length - 1 ? null : posts[index + 1].node
					const next = index === 0 ? null : posts[index - 1].node
					
					createPage({
						path: `${node.slug}`,
						component: blogPostTemplate,
						context: {
							slug: node.slug,
							prev,
							next,
						},
					})
				})
				
				const pageTemplate = path.resolve('./src/templates/page-template.js')
				const pages = result.data.templatedPages.edges
				
				pages.forEach(({ node }, index) => {
					if(node.type === 'templated_page') {
						fileExists(path.resolve('./src/pages/'+node.slug+'.js')).then(exists => { // ignore pages that have the same name as a hardcoded page
							if(exists === false) {
								createPage({
									path: `${node.slug}`,
									component: pageTemplate,
									context: {
										slug: node.slug,
									},
								})
							}
						})
					}
				})
				
				// copy favicon to the location expected in gatsby-config->gatsby-plugin-manifest
				const fs = require('fs');
				
				fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_favicon_img_local.publicURL, function read(err, data) {
					if (err) {
						throw err;
					}
					fs.writeFile(__dirname +'/src/images/favicon.png', data, function(err) {
						if(err) {
							return console.log(err);
						}
					});
				});
			})
		)}
	)
}

exports.sourceNodes = async ({boundActionCreators, store, cache, graphql }) => {
	const {data} = await axios.get(process.env.GATSBY_API_URL+'/preferences/api/public/v1/styles/');
	const fs = require('fs');
	fs.writeFile(__dirname +'/src/assets/scss/dynamic/_theme.scss', data, function(err) {
		if(err) {
        	return console.log(err);
		}
	});
}