module.exports = {
  siteMetadata: {
    title: "Faith Sourced Software Foundation",
    author: "",
    description: "Faith Sourced is a community of software developers using their skills for Jesus. We call it Software as a Service where Christ is the center of all we are and do. Faith Sourced is our contribution to the cause of Christ, and His church. Faith Sourced is our chance to use our uniquely technical skills for purposes that are eternal, united under one banner: the gospel of Jesus Christ. The software we build is freely available to the body of Christ, for His glory.",
     keywords: "software,developer,code,open source,faith,christian,jesus,church,meetups,toronto,canada",
     thumbnail: "https://faithsourced.com/icons/icon-512x512.png",
     url: "https://faithsourced.com"
  },
  plugins: [
	'gatsby-transformer-sharp',
	'gatsby-plugin-sharp',
	'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Faith Sourced Software Foundation',
        short_name: 'Faith Sourced',
        start_url: '/',
        background_color: '#2c393f',
        theme_color: '#2c393f',
        display: 'standalone',
        icon: 'src/images/favicon-512x512.png', // This path is relative to the root of the site.
		},
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
	{
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/blog`,
        name: "blog",
		},
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
		},
    },
    {
	resolve: 'gatsby-source-thirdparty',
	options: {
		url: 'https://api.faithsourced.com/conveyor/modules/news/api/public/v1/posts/?news_group_id=1&start=0&limit=6', // The url, this should be the endpoint you are attempting to pull data from
		name: 'Posts', // Name of the data to be downloaded.  Will show in graphQL or be saved to a file using this name
		payloadKey: 'posts',
		},
	},
    {
      resolve: 'gatsby-plugin-remote-images',
      options: {
        nodeType: 'thirdParty__Posts',
        imagePath: 'image_1_url',
        name: 'image_1_local',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl: url
                site_url: url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allThirdPartyPosts } }) => {
              return allThirdPartyPosts.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  date: edge.node.date,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug
                })
              })
            },
            query: `
              {
                allThirdPartyPosts(
                  sort: { order: DESC, fields: [date] }
                ) {
                  edges {
                    node {
                      title
                      date
                      excerpt
                      image_1_url
                      slug
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Faith Sourced Blog",
          },
        ],
      },
    },
  ],
}
