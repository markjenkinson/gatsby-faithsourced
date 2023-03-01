import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

const SocialLinks = (props) => ( 
    <ul className="icons align-center">
		<StaticQuery
			query={graphql`
				query SocialLinksQuery {
					allThirdPartySocialChannels {
						edges {
							node {
								name
								style
								type
								url
							}
						}
					}
				}
			`}
			render={data => (
				data.allThirdPartySocialChannels.edges.map(({ node }, i) => (
					<li><a href={node.url} target="_blank" rel="noreferrer" className={`icon fa-${node.style}`} title={`on ${node.name}`} alt={`on ${node.name}`}><span className="label">on {node.name}</span></a></li>
				))
			)}
		/>
	</ul>
)

SocialLinks.propTypes = {
    textAlign: PropTypes.string
}

export default SocialLinks
