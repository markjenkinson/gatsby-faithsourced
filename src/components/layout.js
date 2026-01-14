// src/components/layout.js
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import WebFont from 'webfontloader'

import '../assets/scss/main.scss'

const Layout = ({ children, location, meta_title }) => {
  const data = useStaticQuery(graphql`
    query LayoutPrefsAndFonts {
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
      allThirdPartyFonts {
        edges {
          node {
            family
            variants
          }
        }
      }
    }
  `)

  // Safely extract prefs (guard if API is empty)
  const prefs = data.allThirdPartyPreferences.edges?.[0]?.node ?? {}
  const fullTitle = meta_title ? `${prefs.site_title} | ${meta_title}` : prefs.site_title

  // Load Google Web Fonts globally (runs on every page, including 404)
  useEffect(() => {
    const families = (data.allThirdPartyFonts.edges || [])
      .map(e => `${e.node.family}:${e.node.variants}`)
      .filter(Boolean)

    if (families.length) {
      WebFont.load({ google: { families } })
    }
  }, [data.allThirdPartyFonts.edges])

  return (
    <>
      <Helmet
        title={fullTitle}
        meta={[
          { name: 'description', content: prefs.meta_description || '' },
          { name: 'keywords', content: prefs.meta_keywords || '' },
          { property: 'og:url', content: (prefs.site_url || '') + (location?.pathname || '/') },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: fullTitle },
          { property: 'og:image', content: (prefs.site_url || '') + (prefs.logo_favicon_img_local?.publicURL || '') },
          { property: 'og:description', content: prefs.meta_description || '' },
        ]}
      >
        <html lang="en" />
        {/* Speed up Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>

      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
  meta_title: PropTypes.string,
}

export default Layout
