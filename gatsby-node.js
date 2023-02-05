/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
const { createFilePath, createFileNode, createRemoteFileNode} = require(`gatsby-source-filesystem`)
const axios = require('axios');
const fs = require('fs');

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions
	const result = await graphql(`{
		blogPosts: allThirdPartyPosts(
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
		templatedPages: allThirdPartyPages {
			edges {
				node {
					type
					slug
				}
			}		
		}
		sitePreferences: allThirdPartyPreferences {
			edges {
				node {
					logo_favicon_img_type
					logo_favicon_img_local {
						childImageSharp {
							fixed(width: 512, height: 512) {
								src
							}
						}
						publicURL
					}
					site_bg_img_type
					site_bg_img_local {
						publicURL
					}
					logo_wordmark_img_type
					logo_wordmark_img_local {
						publicURL
					}
					logo_glyph_img_type
					logo_glyph_img_local {
						publicURL
					}
				}
			}
		}
	}
	`).then(result => {	
		if (result.errors) {
			return console.log(result.errors);
		}
	
		const blogPostTemplate = path.resolve('./src/templates/blog-post-template.js')
		const posts = result.data.blogPosts.edges
	
		posts.forEach(({ node }, index) => {
			if(node.slug) {
				const prev = i === posts.length - 1 ? null : posts[i + 1].node
				const next = i === 0 ? null : posts[i - 1].node
				console.log('---------------------Post---------------------');
				console.log(node.slug);
			
				createPage({
					path: `${node.slug}`,
					component: blogPostTemplate,
					context: {
						slug: node.slug,
						prev,
						next,
					},
				})
			}
		})
	
	
		const pageTemplate = path.resolve('./src/templates/page-template.js')
		const pages = result.data.templatedPages.edges
	
		pages.forEach(({ node }, index) => {
			if(node.slug != "/" && node.slug && node.type === 'templated_page') {
				fs.readFile(__dirname +'/src/pages/'+node.slug+'.js', (err) => {
					if (err) { // if page does not already exist as a hardcoded page
						console.log('---------------------Page---------------------');
						console.log(node.slug);
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
		fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_favicon_img_local.publicURL, function read(err, data) {
			if (err) {
				throw err;
			}
			fs.writeFile(__dirname +'/src/images/dynamic/favicon.'+result.data.sitePreferences.edges[0].node.logo_favicon_img_type, data, function(err) {
				if(err) {
					return console.log(err);
				}
			})
		})
	
		fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.site_bg_img_local.publicURL, function read(err, data) {
			if (err) {
				throw err;
			}
			fs.writeFile(__dirname +'/src/images/dynamic/background.'+result.data.sitePreferences.edges[0].node.site_bg_img_type, data, function(err) {
				if(err) {
					return console.log(err);
				}
			})
		})
	
		fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_wordmark_img_local.publicURL, function read(err, data) {
			if (err) {
				throw err;
			}
			fs.writeFile(__dirname +'/src/images/dynamic/logo_wordmark.'+result.data.sitePreferences.edges[0].node.logo_wordmark_img_type, data, function(err) {
				if(err) {
					return console.log(err);
				}
			})
		})
	
		fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_glyph_img_local.publicURL, function read(err, data) {
			if (err) {
				throw err;
			}
			fs.writeFile(__dirname +'/src/images/dynamic/logo_glyph.'+result.data.sitePreferences.edges[0].node.logo_glyph_img_type, data, function(err) {
				if(err) {
					return console.log(err);
				}
			})
		})
	})
}

exports.sourceNodes = async ({actions, store, cache, graphql }) => {
	const {data} = await axios.get(process.env.GATSBY_API_URL+'/preferences/api/public/v1/styles/');
	fs.writeFile(__dirname +'/src/assets/scss/dynamic/_theme.scss', data, function(err) {
		if(err) {
        	return console.log(err);
		}
	})
}