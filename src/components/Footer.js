import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import SocialLinks from '../components/SocialLinks'

const Footer = (props) => (
    <footer id="footer" style={props.timeout ? {display: 'none'} : {}}>
		<SocialLinks/>
		<StaticQuery
			query={graphql`
				query FooterQuery {
					allThirdPartyPreferences {
						edges {
						  node {
							copyright
						  }
						}
					}
				}
			`}
			render={data => (
				<>
				{data.allThirdPartyPreferences.edges[0].node.copyright &&
					<div className='copyright' dangerouslySetInnerHTML={{ __html: data.allThirdPartyPreferences.edges[0].node.copyright}} />
				}
				{!data.allThirdPartyPreferences.edges[0].node.copyright &&
					<div className='copyright'><p>&copy; 2019. All rights reserved.</p></div>
				}
				{process.env.GATSBY_FAITHSITE_ATTRIBUTION === 'true' &&
					<div className='attribution'><p>Website by <a href="https://faith.dev" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" class="logo"><path d="M193.2 156.8v-47.3h-36.4v47.3h-36.1v1.7 32.2 2.5h36.1v47.3h36.4v-47.3h36.1v-2.5-32.2-1.7z" class="fill"/><g opacity=".5"><path d="M120.7 142.7L95.1 117l-58 58 58 58 25.6-25.7L88.4 175z" class="fill"/></g><g opacity=".5"><path d="M229.3 142.7l25.6-25.7 58 58-58 58-25.6-25.7 32.3-32.3z" class="fill"/></g></svg> FaithSourced</a>.</p></div>
				}
				</>
			)}
		/>
    </footer>
)

Footer.propTypes = {
    timeout: PropTypes.bool
}

export default Footer