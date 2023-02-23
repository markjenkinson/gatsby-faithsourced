const path = require("path")
const axios = require('axios');
const fse = require('fs-extra');
let dynamic_images_saved = false;

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(`{
  blogPosts: allThirdPartyPosts(sort: {order: DESC, fields: [date]}, limit: 1000) {
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
  } catch (err) {

  }
}

exports.onCreateNode = async ({ node, actions, createNodeId }) => {
  const { createNodeField } = actions;
  
  if (node.internal.type === 'thirdParty__Pages' && node.sections) {
    const sectionImageURLs = [];
    const componentImageURLs = [];
    const photoURLs = [];

    node.sections.forEach(section => {
      if (section.section.image_1_url) {
		sectionImageURLs.push(section.section.image_1_url);
	  }
      
      if (section.components) {
        section.components.forEach(component => {
          if (component.object && component.object.image_1_url) {
			componentImageURLs.push(component.object.image_1_url);
		  }
          if (component.object && component.object.photos) {
            component.object.photos.forEach(photo => {
              if (photo.image_1_url) {
                photoURLs.push(photo.image_1_url);
              }
            });
          }
        });
      }
    });

    await Promise.all(
      photoURLs.map(async imageUrl => {
        try {
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');
          const imageType = imageUrl.split('.').pop();
          const fileName = `photos-image_1-${createNodeId(node.id)}-${createNodeId(imageUrl)}.${imageType}`;
          const filePath = path.join(__dirname, 'public', 'images/original/photos', fileName);
          await fse.outputFile(filePath, buffer);
          createNodeField({
            node,
            name: 'photo_image_1_local',
            value: `images/original/photos/${fileName}`,
          });
        } catch (error) {
          console.error(`Error downloading image for node ${node.id}:`, error);
        }
      })
    );
    
    await Promise.all(
      sectionImageURLs.map(async imageUrl => {
        try {
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');
          const imageType = imageUrl.split('.').pop();
          const fileName = `section-image_1-${createNodeId(node.id)}-${createNodeId(imageUrl)}.${imageType}`;
          const filePath = path.join(__dirname, 'public', 'images/original/sections', fileName);
          await fse.outputFile(filePath, buffer);
          createNodeField({
            node,
            name: 'section_image_1_local',
            value: `images/original/sections/${fileName}`,
          });
        } catch (error) {
          console.error(`Error downloading image for node ${node.id}:`, error);
        }
      })
    );
    
     await Promise.all(
      componentImageURLs.map(async imageUrl => {
        try {
          const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
          const buffer = Buffer.from(response.data, 'binary');
          const imageType = imageUrl.split('.').pop();
          const fileName = `component-image_1-${createNodeId(node.id)}-${createNodeId(imageUrl)}.${imageType}`;
          const filePath = path.join(__dirname, 'public', 'images/original/sections/components', fileName);
          await fse.outputFile(filePath, buffer);
          createNodeField({
            node,
            name: 'component_image_1_local',
            value: `images/original/sections/components/${fileName}`,
          });
        } catch (error) {
          console.error(`Error downloading image for node ${node.id}:`, error);
        }
      })
    );
  }
  
  if (node.internal.type === 'thirdParty__Posts' && node.image_1_url) {
    try {
      const response = await axios.get(node.image_1_url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      const fileName = `post-image_1-${node.id}-${path.basename(node.image_1_url)}`;
      const filePath = path.join(__dirname, 'public', 'images/original/posts', fileName);
      await fse.outputFile(filePath, buffer);
      createNodeField({
        node,
        name: 'post_image_1_local',
        value: `images/original/posts/${fileName}`,
      });
    } catch (error) {
      console.error(`Error downloading image for node ${node.id}:`, error);
    }
  }
  
  if (node.internal.type === 'thirdParty__Preferences' && node.logo_favicon_img) {
    try {
      const response = await axios.get(node.logo_favicon_img, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      const fileName = `${node.id}-${path.basename(node.logo_favicon_img)}`;
      const filePath = path.join(__dirname, 'public', 'images/original/preferences', fileName);
      await fse.outputFile(filePath, buffer);
      createNodeField({
        node,
        name: 'logo_favicon_img_local',
        value: `images/original/preferences/${fileName}`,
      });
    } catch (error) {
      console.error(`Error downloading image for node ${node.id}:`, error);
    }
  }
};

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
                `removeAttrs`,
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