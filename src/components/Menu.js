import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'

const Menu = ({ onToggleMenu, location }) => {
	const location_path = location.pathname.replace(/^\/+/, '')

	const data = useStaticQuery(graphql`
		query MenuQuery {
			allThirdPartyPages(filter: { nav_level: { eq: 2 }, parent_id: { eq: 0 } }) {
				edges {
					node {
						nav_level
						parent_id
						type
						name
						slug
						link_url
						link_target
						link_mode
						link_hash
					}
				}
			}
		}
	`)

	return (
		data && data.allThirdPartyPages.edges.length > 0 && (
			<div id="toggle-menu">
				<nav id="toggle">
				<button className="toggle-burger" onClick={onToggleMenu}>
					<span></span>
				</button>
				</nav>
				<nav id="menu">
				<div className="inner">
					<ul className="links">
					{data.allThirdPartyPages.edges.map(({ node }, i) => (
						<li key={i}>
						{node.type === 'link' ? (
							<>
							{node.link_mode === 'internal' ? (
								<>
								{node.link_hash ? (
									<a
									href={`#${node.link_hash}`}
									onClick={() => {
										/**props.onScrollTo(node.link_hash)**/
									}}
									>
									{node.name}
									</a>
								) : (
									<Link
									to={`/${node.link_url.replace(/^\/+/, '')}`}
									onClick={
										location_path === node.link_url.replace(/^\/+/, '')
										? onToggleMenu
										: ''
									}
									target={node.link_target === 1 ? '_blank' : '_parent'}
									activeClassName="active"
									>
									{node.name}
									</Link>
								)}
								</>
							) : (
								<a href={node.link_url} target={node.link_target === 1 ? '_blank' : '_parent'} rel="noreferrer">
								{node.name}
								</a>
							)}
							</>
						) : (
							<Link
							to={`/${node.slug.replace(/^\/+/, '')}`}
							onClick={
								location_path === node.slug.replace(/^\/+/, '') ? onToggleMenu : ''
							}
							activeClassName="active"
							>
							{node.name}
							</Link>
						)}
						</li>
					))}
					</ul>
				</div>
				</nav>
			</div>
		)
	)
}

Menu.propTypes = {
	onToggleMenu: PropTypes.func,
	location: PropTypes.object,
}

export default Menu