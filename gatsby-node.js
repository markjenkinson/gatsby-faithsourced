const path = require("path")
const axios = require('axios');
const fse = require('fs-extra');
let dynamic_images_saved = false;

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`{
  blogPosts: allThirdPartyPosts(sort: {date: DESC}, limit: 1000) {
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
            gatsbyImageData(width: 512, height: 512, placeholder: BLURRED, layout: FIXED)
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
}`);

  if (result.errors) {
    return console.log(result.errors);
  }

  const blogPostTemplate = path.resolve('./src/templates/blog-post-template.js')
  const posts = result.data.blogPosts.edges

  await Promise.all(
    posts.map(async ({ node }, index) => {
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
  const blogTemplate = path.resolve('./src/templates/blog-template.js')
  const pages = result.data.templatedPages.edges

  await Promise.all(
    pages.map(async ({ node }, index) => {
      if (node.slug != "/" && node.slug && node.type === 'templated_page') {
        try {
          await fse.promises.readFile(__dirname + '/src/pages/' + node.slug + '.js', (err) => {

          })
        } catch (err) {
			return new Promise((resolve, reject) => {
				createPage({
				  path: `${node.slug}`,
				  component: `${node.slug==='blog' || node.slug==='news' || node.slug==='articles' ? blogTemplate : pageTemplate }`,
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
  if (dynamic_images_saved === false) {
    try {
      const faviconData = await fse.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_favicon_img_local?.publicURL);
      await fse.writeFile(__dirname + '/src/images/dynamic/favicon.' + result.data.sitePreferences.edges[0].node.logo_favicon_img_type, faviconData);
    } catch (err) {

    }

    try {
      const bgData = await fse.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.site_bg_img_local.publicURL);
      await fse.writeFile(__dirname + '/src/images/dynamic/background.' + result.data.sitePreferences.edges[0].node.site_bg_img_type, bgData);
    } catch (err) {

    }

    try {
      const wordmarkData = await fse.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_wordmark_img_local.publicURL);
      await fse.writeFile(__dirname + '/src/images/dynamic/logo_wordmark.' + result.data.sitePreferences.edges[0].node.logo_wordmark_img_type, wordmarkData);
    } catch (err) {

    }

    try {
      const glyphData = await fse.readFile(__dirname + '/public' + result.data.sitePreferences.edges[0].node.logo_glyph_img_local.publicURL);
      await fse.writeFile(__dirname + '/src/images/dynamic/logo_glyph.' + result.data.sitePreferences.edges[0].node.logo_glyph_img_type, glyphData);
    } catch (err) {

    }
    dynamic_images_saved = true
  }
}

exports.sourceNodes = async ({ actions, store, cache, graphql }) => {
  try {
    const { data } = await axios.get(process.env.GATSBY_API_URL + '/preferences/api/public/v1/styles/');
    await fse.writeFile(__dirname + '/src/assets/scss/dynamic/_theme.scss', data);
  } catch (err) {}
}

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createResolvers = async (
  {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  },
) => {
  const { createNode } = actions

  await createResolvers({
    thirdParty__Pages: {
      tile_icon_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.tile_icon_url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__Pages: {
      tile_thumbnail_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.tile_thumbnail_url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__PagesSectionsSection: {
      image_1_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.image_1_url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__PagesSectionsComponentsObject: {
      image_1_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.image_1_url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__PagesSectionsComponentsObjectPhotos: {
      image_1_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.image_1_url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__Posts: {
      image_1_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.image_1_url

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__Preferences: {
      logo_bitmap_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.logo_bitmap

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__Preferences: {
      logo_wordmark_img_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.logo_wordmark_img

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__Preferences: {
      logo_glyph_img_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.logo_glyph_img

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__Preferences: {
      logo_favicon_img_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.logo_favicon_img

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
  
  await createResolvers({
    thirdParty__Preferences: {
      site_bg_img_local: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.site_bg_img

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.onCreateWebpackConfig = ({ actions, plugins, stage, getConfig }) => {

  if (stage === 'build-javascript') {
    const config = getConfig();
    const options = {
      minimizerOptions: {
        preset: [
          `default`,
          {
            svgo: {
              full: true,
              plugins: [
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
                `removeComments`,
                `removeDesc`,
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
                `removeTitle`,
                `removeUnknownsAndDefaults`,
                `removeUnusedNS`,
                `removeUselessStrokeAndFill`,
                `removeXMLProcInst`,
                `reusePaths`,
                `sortAttrs`,
              ],
            },
          },
        ],
      }
    }

    const minifyCssIndex = config.optimization.minimizer.findIndex(
      minimizer => minimizer.constructor.name ===
        'CssMinimizerPlugin'
    );

    if (minifyCssIndex > -1) {
      config.optimization.minimizer[minifyCssIndex] =
        plugins.minifyCss(options);
    }

    actions.replaceWebpackConfig(config);
  }
};