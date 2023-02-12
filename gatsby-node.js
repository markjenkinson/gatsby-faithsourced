/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
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
	`);

  if (result.errors) {
    return console.log(result.errors);
  }

  const blogPostTemplate = path.resolve('./src/templates/blog-post-template.js')
  const posts = result.data.blogPosts.edges
  
  await Promise.all(
    posts.map( async({ node }, index) => {
		 if (node.slug) {
          const prev = index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node
      
          return new Promise((resolve, reject) => {
            createPage({
              path: `${node.slug}`,
              component: blogPostTemplate,
              context: {
                slug: node.slug,
                prev,
                next,
              },
            });
            resolve();
          });
      }
    })
  )
  


  const pageTemplate = path.resolve('./src/templates/page-template.js')
  const pages = result.data.templatedPages.edges
  
  await Promise.all(
    pages.map( async({ node }, index) => {
      if (node.slug != "/" && node.slug && node.type === 'templated_page') {
        try {
          await fs.promises.readFile(__dirname + '/src/pages/' + node.slug + '.js', (err) => {
             // if page already exist as a hardcoded page            
          })
        } catch (err) {
          // if page does not already exist as a hardcoded page
          return new Promise((resolve, reject) => {
            createPage({
              path: `${node.slug}`,
              component: pageTemplate,
              context: {
                slug: node.slug,
              },
            });
            resolve();
          });
        }
      }
    })
  )

  // copy favicon to the location expected in gatsby-config->gatsby-plugin-manifest
  fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_favicon_img_local.publicURL, function read(err, data) {
    if (err) {
      throw err;
    }
    fs.writeFile(__dirname + '/src/images/dynamic/favicon.' + result.data.sitePreferences.edges[0].node.logo_favicon_img_type, data, function (err) {
      if (err) {
        return console.log(err);
      }
    })
  })

  fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.site_bg_img_local.publicURL, function read(err, data) {
    if (err) {
      throw err;
    }
    fs.writeFile(__dirname + '/src/images/dynamic/background.' + result.data.sitePreferences.edges[0].node.site_bg_img_type, data, function (err) {
      if (err) {
        return console.log(err);
      }
    })
  })

  fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_wordmark_img_local.publicURL, function read(err, data) {
    if (err) {
      throw err;
    }
    fs.writeFile(__dirname + '/src/images/dynamic/logo_wordmark.' + result.data.sitePreferences.edges[0].node.logo_wordmark_img_type, data, function (err) {
      if (err) {
        return console.log(err);
      }
    })
  })

  fs.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_glyph_img_local.publicURL, function read(err, data) {
    if (err) {
      throw err;
    }
    fs.writeFile(__dirname + '/src/images/dynamic/logo_glyph.' + result.data.sitePreferences.edges[0].node.logo_glyph_img_type, data, function (err) {
      if (err) {
        return console.log(err);
      }
    })
  })
}

exports.sourceNodes = async ({ actions, store, cache, graphql }) => {
  const { data } = await axios.get(process.env.GATSBY_API_URL + '/preferences/api/public/v1/styles/');
  fs.writeFile(__dirname + '/src/assets/scss/dynamic/_theme.scss', data, function (err) {
    if (err) {
      return console.log(err);
    }
  })
}

exports.onCreateWebpackConfig = ({ actions, plugins, stage, getConfig }) => {
  // override config only during production JS & CSS build
  if (stage === 'build-javascript') {
    // get current webpack config
    const config = getConfig();

    const options = {
      minimizerOptions: {
        preset: [
          `default`,
          {
            svgo: {
              full: true,
              plugins: [
                // potentially destructive plugins removed - see https://github.com/gatsbyjs/gatsby/issues/15629
                // use correct config format and remove plugins requiring specific params - see https://github.com/gatsbyjs/gatsby/issues/31619
                `removeUselessDefs`,
                `cleanupAttrs`,
                `cleanupEnableBackground`,
                `cleanupIDs`,
                `cleanupListOfValues`,
                `cleanupNumericValues`,
                `collapseGroups`,
                `convertColors`,
                `convertPathData`,
                `convertStyleToAttrs`,
                `convertTransform`,
                `inlineStyles`,
                `mergePaths`,
                `minifyStyles`,
                `moveElemsAttrsToGroup`,
                `moveGroupAttrsToElems`,
                `prefixIds`,
                `removeAttrs`,
                `removeComments`,
                `removeDesc`,
                // `removeDimensions`,
                `removeDoctype`,
                `removeEditorsNSData`,
                `removeEmptyAttrs`,
                `removeEmptyContainers`,
                `removeEmptyText`,
                `removeHiddenElems`,
                `removeMetadata`,
                `removeNonInheritableGroupAttrs`,
                `removeOffCanvasPaths`,
                `removeRasterImages`,
                `removeScriptElement`,
                // this breaks some svg color styling so disable it
                //`removeStyleElement`,
                `removeTitle`,
                `removeUnknownsAndDefaults`,
                `removeUnusedNS`,
                `removeUselessStrokeAndFill`,
                // 'removeXMLNS',
                `removeXMLProcInst`,
                `reusePaths`,
                `sortAttrs`,
              ],
            },
          },
        ],
      }
    }
    // find CSS minimizer
    const minifyCssIndex = config.optimization.minimizer.findIndex(
      minimizer => minimizer.constructor.name ===
        'CssMinimizerPlugin'
    );
    // if found, overwrite existing CSS minimizer with the new one
    if (minifyCssIndex > -1) {
      config.optimization.minimizer[minifyCssIndex] =
        plugins.minifyCss(options);
    }
    // replace webpack config with the modified object
    actions.replaceWebpackConfig(config);
  }
};