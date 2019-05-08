import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import '../assets/scss/main.scss'

import Footer from '../components/Footer'

const Layout = ({ children, location }) => {

  let content;

  if (location && location.pathname === '/') {
    content = (
      <div>
        {children}
      </div>
    )
  } else {
    content = (
		<div id="page" className="body blurred">
			<div id="wrapper">
				<div id="main" style={{display:'flex'}}>
					<article className="active timeout">
        				{children}
        			</article>
				</div>
				<Footer/>
			</div>
		<div id="bg"></div>
		</div>
    )
  }

  return (
    <StaticQuery
      query={graphql`
        query SiteMetaDataQuery {
          site {
            siteMetadata {
              title
              description
              keywords
              url
              thumbnail
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: data.site.siteMetadata.description },
              { name: 'keywords', content: data.site.siteMetadata.keywords },
              { property: 'og:url', content: data.site.siteMetadata.url + location.pathname},
              { property: 'og:type', content: 'website' },
              { property: 'og:title', content: data.site.siteMetadata.title },
              { property: 'og:image', content: data.site.siteMetadata.thumbnail },
              { property: 'og:description', content: data.site.siteMetadata.description },
            ]}
          >
            <html lang="en" />
          </Helmet>
          {content}
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
