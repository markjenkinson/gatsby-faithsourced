import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import '../assets/scss/main.scss'

import Footer from './Footer'

const Layout = ({ children, location, meta_title }) => {
  return (
    <StaticQuery
      query={graphql`query layoutPrefsQuery {
  allThirdPartyPreferences {
    edges {
      node {
        site_name
        site_title
        email_address
        meta_keywords
        meta_description
        logo_favicon_img_local {
          childImageSharp {
            gatsbyImageData(width: 512, height: 512, placeholder: BLURRED, layout: FIXED)
          }
          publicURL
        }
        logo_slogan
        site_bg_img
        site_url
      }
    }
  }
}`}
      render={data => (
		<>
			<Helmet
				title={!meta_title ? (data.allThirdPartyPreferences.edges[0].node.site_title):(data.allThirdPartyPreferences.edges[0].node.site_title + ' | ' + meta_title)}
				meta={[
					{ name: 'description', content: data.allThirdPartyPreferences.edges[0].node.meta_description },
					{ name: 'keywords', content: data.allThirdPartyPreferences.edges[0].node.meta_keywords },
					{ property: 'og:url', content: data.allThirdPartyPreferences.edges[0].node.site_url + location.pathname},
					{ property: 'og:type', content: 'website' },
					{ property: 'og:title', content: !meta_title ? (data.allThirdPartyPreferences.edges[0].node.site_title):(data.allThirdPartyPreferences.edges[0].node.site_title + ' | ' + meta_title) },
					{ property: 'og:image', content: data.allThirdPartyPreferences.edges[0].node.site_url + data.allThirdPartyPreferences.edges[0].node.logo_favicon_img_local?.publicURL },
					{ property: 'og:description', content: data.allThirdPartyPreferences.edges[0].node.meta_description },
				]}
			  >
				<html lang="en" />
			</Helmet>
			{children}
        </>
      )}
    />
  );
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
