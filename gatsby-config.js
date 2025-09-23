require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

const cfHeaders =
  process.env.CF_ACCESS_CLIENT_ID && process.env.CF_ACCESS_CLIENT_SECRET
    ? {
        'CF-Access-Client-Id': process.env.CF_ACCESS_CLIENT_ID,
        'CF-Access-Client-Secret': process.env.CF_ACCESS_CLIENT_SECRET,
      }
    : {};

module.exports = {
	plugins: [
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-remark',
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-plugin-manifest', options: {
				name: `${process.env.GATSBY_PLUGIN_MANIFEST_NAME}`,
				short_name: `${process.env.GATSBY_PLUGIN_MANIFEST_SHORTNAME}`,
				start_url: '/',
				background_color: `${process.env.GATSBY_PLUGIN_MANIFEST_BGCOLOR}`,
				theme_color: `${process.env.GATSBY_PLUGIN_MANIFEST_THEMECOLOR}`,
				display: 'standalone',
				icon: 'src/images/dynamic/favicon.png', // This path is relative to the root of the site.
				cache_busting_mode: "none"
			},
		},
		'gatsby-plugin-offline', // always list after `gatsby-plugin-manifest`
		{
			resolve: `gatsby-transformer-sharp`,
			options: {
				// The option defaults to true
				checkSupportedExtensions: false,
			},
		},
		{
			resolve: 'gatsby-source-filesystem', options: {
				path: `${__dirname}/src/images`,
				name: "images",
			},
		},
		{
			resolve: 'gatsby-source-apiserver', options: {
				typePrefix: "thirdParty__",
				method: "get",
				url: `${process.env.GATSBY_API_URL}/news/api/public/v1/posts/?news_group_id=1`,
				headers: {
				  ...cfHeaders,
				  Accept: 'application/json',
				},
				name: 'Posts',
				payloadKey: 'posts',
			},
		},
		{
			resolve: 'gatsby-source-apiserver', options: {
				typePrefix: "thirdParty__",
				method: "get",
				url: `${process.env.GATSBY_API_URL}/core/api/public/v1/pages/`,
				headers: {
				  ...cfHeaders,
				  Accept: 'application/json',
				},
				name: 'Pages',
				payloadKey: 'pages'
			},
		},
		{
			resolve: 'gatsby-source-apiserver', options: {
				typePrefix: "thirdParty__",
				method: "get",
				url: `${process.env.GATSBY_API_URL}/home_page_promos/api/public/v1/slides/`,
				headers: {
				  ...cfHeaders,
				  Accept: 'application/json',
				},
				name: 'HomePageSlides',
				payloadKey: 'slides'
			},
		},
		{
			resolve: 'gatsby-source-apiserver', options: {
				typePrefix: "thirdParty__",
				method: "get",
				url: `${process.env.GATSBY_API_URL}/preferences/api/public/v2/`,
				headers: {
				  ...cfHeaders,
				  Accept: 'application/json',
				},
				name: 'Preferences',
				payloadKey: 'preferences',
			},
		},
		{
			resolve: 'gatsby-source-apiserver', options: {
				typePrefix: "thirdParty__",
				method: "get",
				url: `${process.env.GATSBY_API_URL}/preferences/api/public/v2/`,
				headers: {
				  ...cfHeaders,
				  Accept: 'application/json',
				},
				name: 'Fonts',
				payloadKey: 'fonts',
			},
		},
		{
			resolve: 'gatsby-source-apiserver', options: {
				typePrefix: "thirdParty__",
				method: "get",
				url: `${process.env.GATSBY_API_URL}/preferences/api/public/v2/`,
				headers: {
				  ...cfHeaders,
				  Accept: 'application/json',
				},
				name: 'SocialChannels',
				payloadKey: 'social',
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`, options: {
				query: `
					{
						allThirdPartyPreferences {
							edges {
								node {
									site_url
								}
							}
						}
						allSitePage {
							nodes {
								path
							}
						}
					}
				`,
				resolveSiteUrl: ({ allThirdPartyPreferences }) => {
					return allThirdPartyPreferences.edges[0].node.site_url;
				},
				resolvePages: ({
					allSitePage: { nodes: allPages },
				}) => {
					return allPages.map(page => {
						return { ...page }
					})
				},
				serialize: ({ path }) => {
					return {
						url: path,
					}
				}
			},
		},
		{
			resolve: `gatsby-plugin-feed`, options: {
				query: `
					{
						allThirdPartyPreferences {
							edges {
								node {
									site_name
									site_title
									meta_description
									site_url
								}
							}
						}
						allThirdPartyPosts {
							edges {
								node {
									news_group_name
								}
							}
						}
					}
				`,
				setup: ({ query: { allThirdPartyPreferences, allThirdPartyPosts } }) => {
					return {
						title: allThirdPartyPreferences.edges[0].node.site_title + ' | ' + allThirdPartyPosts.edges[0].node.news_group_name,
						description: allThirdPartyPreferences.edges[0].node.meta_description,
						siteUrl: allThirdPartyPreferences.edges[0].node.site_url,
						site_url: allThirdPartyPreferences.edges[0].node.site_url,
					};
				},
				feeds: [
					{
						serialize: ({ query: { allThirdPartyPreferences, allThirdPartyPosts } }) => {
							return allThirdPartyPosts.edges.map(edge => {
								return Object.assign({}, edge.node, {
									description: edge.node.excerpt,
									date: edge.node.date,
									url: allThirdPartyPreferences.edges[0].node.site_url + '/' + edge.node.slug,
									guid: allThirdPartyPreferences.edges[0].node.site_url + '/' + edge.node.slug
								})
							})
						},
						query: `
							{
								allThirdPartyPosts(sort: {date: DESC}) {
									edges {
										node {
											id
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
						title: "RSS Feed", // temp name, overwritten by above, but if this is missing, a warning will throw
					},
				],
			},
		},
	],
}