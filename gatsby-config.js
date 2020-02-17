require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	plugins: [
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		'gatsby-transformer-remark',
		'gatsby-plugin-sass',
		'gatsby-plugin-react-helmet',
		{
		resolve: 'gatsby-plugin-manifest', options: {
				name: `${process.env.GATSBY_PLUGIN_MANIFEST_NAME}`,
				short_name: `${process.env.GATSBY_PLUGIN_MANIFEST_SHORTNAME}`,
				start_url: '/',
				background_color: `${process.env.GATSBY_PLUGIN_MANIFEST_BGCOLOR}`,
				theme_color: `${process.env.GATSBY_PLUGIN_MANIFEST_THEMECOLOR}`,
				display: 'standalone',
				icon: 'src/images/dynamic/favicon.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-offline', // always list after `gatsby-plugin-manifest`
		{
		resolve: 'gatsby-source-filesystem', options: {
				path: `${__dirname}/src/images`,
				name: "images",
			},
		},
		{
		resolve: 'gatsby-source-thirdparty', options: {
				url: `${process.env.GATSBY_API_URL}/news/api/public/v1/posts/?news_group_id=1&start=0&limit=3`,
				name: 'Posts',
				payloadKey: 'posts',
			},
		},
		{
		resolve: 'gatsby-source-thirdparty', options: {
				url: `${process.env.GATSBY_API_URL}/core/api/public/v1/pages/`,
				name: 'Pages', 
				payloadKey: 'pages'
			},
		},
		{
		resolve: 'gatsby-source-thirdparty', options: {
				url: `${process.env.GATSBY_API_URL}/preferences/api/public/v1/`,
				name: 'Preferences', 
				payloadKey: 'preferences',
			},
		},
		{
		resolve: 'gatsby-source-thirdparty', options: {
				url: `${process.env.GATSBY_API_URL}/preferences/api/public/v1/`,
				name: 'SocialChannels', 
				payloadKey: 'social',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Preferences',
				imagePath: 'logo_bitmap',
				name: 'logo_bitmap_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Preferences',
				imagePath: 'logo_wordmark_img',
				name: 'logo_wordmark_img_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Preferences',
				imagePath: 'logo_glyph_img',
				name: 'logo_glyph_img_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Preferences',
				imagePath: 'logo_favicon_img',
				name: 'logo_favicon_img_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Preferences',
				imagePath: 'site_bg_img',
				name: 'site_bg_img_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Posts',
				imagePath: 'image_1_url',
				name: 'image_1_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Pages',
				imagePath: 'sections[].components[].object.image_1_url',
				name: 'image_1_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Pages',
				imagePath: 'sections[].section.image_1_url',
				name: 'image_1_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Pages',
				imagePath: 'tile_icon_url',
				name: 'tile_icon_local',
			},
		},
		{
		resolve: 'gatsby-plugin-remote-images', options: {
				nodeType: 'thirdParty__Pages',
				imagePath: 'tile_thumbnail_url',
				name: 'tile_thumbnail_local',
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
						title: allThirdPartyPreferences.edges[0].node.site_title+' | '+allThirdPartyPosts.edges[0].node.news_group_name,
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
								allThirdPartyPosts(
									sort: { order: DESC, fields: [date] }
								) {
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