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

exports.sourceNodes = async ({ actions, store, cache, graphql, reporter }) => {
  try {
    const { data } = await axios.get(
      process.env.GATSBY_API_URL + "/preferences/api/public/v2/styles/",
      {
        headers: {
          ...cfHeaders,
          Accept: "application/json",
        },
      }
    );

    await fse.writeFile(
      __dirname + "/src/assets/scss/dynamic/_theme.scss",
      data
    );
  } catch (err) {
    reporter?.warn(`[sourceNodes] Failed to fetch styles: ${err.message}`);
  }
};

// gatsby-node.js
const { createRemoteFileNode } = require("gatsby-source-filesystem");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const cfHeaders =
  process.env.CF_ACCESS_CLIENT_ID && process.env.CF_ACCESS_CLIENT_SECRET
    ? {
        "CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID,
        "CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET,
      }
    : {};

exports.createResolvers = async ({
  actions, cache, createNodeId, createResolvers, store, reporter,
}) => {
  const { createNode } = actions;

  const fileFromUrl = async (url, parentId) => {
    if (!url || typeof url !== "string") return null;
    if (!/^https?:\/\//i.test(url)) {
      reporter.warn(`[image] Skipping non-http url: ${url}`);
      return null;
    }
    try {
      return await createRemoteFileNode({
        url, // avoid over-encoding; only encode if you know you need it
        parentNodeId: parentId,
        createNode, createNodeId, cache, store, reporter,
        httpHeaders: cfHeaders,
      });
    } catch (e) {
      reporter.warn(`[image] Download failed ${url}: ${e.message}`);
      return null;
    }
  };

  // Small helper to reduce boilerplate
  const makeFileResolver = (fieldWithUrl) => ({
    type: "File",
    resolve: (source) => fileFromUrl(source[fieldWithUrl], source.id),
  });

  await createResolvers({
    // Pages & nested types
    thirdParty__Pages: {
      tile_icon_local:          makeFileResolver("tile_icon_url"),
      tile_thumbnail_local:     makeFileResolver("tile_thumbnail_url"),
    },
    thirdParty__PagesSectionsSection: {
      image_1_local:            makeFileResolver("image_1_url"),
    },
    thirdParty__PagesSectionsComponentsObject: {
      image_1_local:            makeFileResolver("image_1_url"),
    },
    thirdParty__PagesSectionsComponentsObjectPhotos: {
      image_1_local:            makeFileResolver("image_1_url"),
    },

    // Posts
    thirdParty__Posts: {
      image_1_local:            makeFileResolver("image_1_url"),
    },

    // Home page slides
    thirdParty__HomePageSlides: {
      image_1_local:            makeFileResolver("image_1_url"),
    },

    // Preferences
    thirdParty__Preferences: {
      logo_bitmap_local:        makeFileResolver("logo_bitmap"),
      logo_wordmark_img_local:  makeFileResolver("logo_wordmark_img"),
      logo_glyph_img_local:     makeFileResolver("logo_glyph_img"),
      logo_favicon_img_local:   makeFileResolver("logo_favicon_img"),
      site_bg_img_local:        makeFileResolver("site_bg_img"),
    },
  });
};


exports.onCreateWebpackConfig = ({ actions, plugins, stage, loaders, getConfig }) => {
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
  
  if (stage === "build-html" || stage === "develop-html") { // custom webpack config to replace webfontloader with a dummy module during server rendering to prevent build errors
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /webfontloader/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
};