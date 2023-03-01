import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class Menu extends React.Component {
	render() {
		const location_path = this.props.location.pathname.replace(/^\/+/, '')
		return (
			<div id="toggle-menu">
				<nav id="toggle"><button className="toggle-burger" onClick={this.props.onToggleMenu}><span></span></button></nav>
				<nav id="menu">
					<div className="inner">
						<ul className="links">					
							<StaticQuery
								query={graphql`
									query MenuQuery {
										allThirdPartyPages(filter: {nav_level: {eq: 2}, parent_id: {eq: 0}}) {
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
								`}
								render={data => (
									data.allThirdPartyPages.edges.map(({ node }, i) => (
										<li key={i}>
											{node.type === 'link' ? (
												<>
												{node.link_mode === 'internal' ? (
													<>
													{node.link_hash ? (
														<a href={`#${node.link_hash}`} onClick={() => {/**props.onScrollTo(node.link_hash)**/}}>{node.name}</a>
													):(
														<Link to={`/${node.link_url.replace(/^\/+/, '')}`} onClick={location_path === node.link_url.replace(/^\/+/, '') ? this.props.onToggleMenu : ''} target={node.link_target === 1 ? '_blank' : '_parent'} activeClassName="active">{node.name}</Link>
													)}
													</>
												):(
													<a href={node.link_url} target={node.link_target === 1 ? '_blank' : '_parent'} rel="noreferrer">{node.name}</a>
												)} 
												</>
											):(
												<Link to={`/${node.slug.replace(/^\/+/, '')}`} onClick={location_path === node.slug.replace(/^\/+/, '') ? this.props.onToggleMenu : ''} activeClassName="active">{node.name}</Link>
											)}
										</li>
									))
								)}
							/>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

Menu.propTypes = {
    onToggleMenu: PropTypes.func
}

export default Menu
