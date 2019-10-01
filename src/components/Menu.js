import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class Menu extends React.Component {
	render() {
		const location_path = this.props.location.pathname.replace(/^\/+/, '')
		return (
			<div id="toggle-menu">
				<nav id="toggle"><a className="toggle-burger" onClick={this.props.onToggleMenu} href="javascript:;"><span></span></a></nav>
				<nav id="menu">
					<div className="inner">
						<ul className="links">					
							<StaticQuery
								query={graphql`
									query MenuQuery {
										allThirdPartyPages {
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
										<>
										{node.nav_level === '2' && node.parent_id === '0' &&
											<li key={i}>
												{node.type === 'link' ? (
													<>
													{node.link_mode === 'internal' ? (
														<>
														{node.link_hash ? (
															<a href="javascript:;" onClick={() => {/**props.onScrollTo(node.link_hash)**/}}>{node.name}</a>
														):(
															<Link to={node.link_url} onClick={location_path === node.link_url.replace(/^\/+/, '') ? this.props.onToggleMenu : ''} target={node.link_target === 1 ? '_blank' : '_parent'} activeClassName="active">{node.name}</Link>
														)}
														</>
													):(
														<Link to={node.link_url} target={node.link_target === 1 ? '_blank' : '_parent'} activeClassName="active">{node.name}</Link>
													)} 
													</>
												):(
													<Link to={`/${node.slug}`} onClick={location_path === node.slug.replace(/^\/+/, '') ? this.props.onToggleMenu : ''} activeClassName="active">{node.name}</Link>
												)}
											</li>
										}
										</>
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
