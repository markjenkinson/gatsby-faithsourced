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
				{process.env.FAITHSITE_attribution === 'true' &&
					<div className='attribution'><p>Website by <a href="https://faith.dev" target="_blank"> FaithSourced</a>.</p></div>
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