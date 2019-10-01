import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Img from "gatsby-image"

import Sections from '../components/Sections'

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		let close = <div className="close" onClick={() => {this.props.onCloseArticle()}} alt="Close" title="Close"></div>

		return (
			<div ref={this.props.setWrapperRef} id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

				<StaticQuery
					query={graphql`
						query HomePanelsQuery {
							allThirdPartyPages {
								edges {
									node {
										nav_level
										parent_id
										type
										name
										slug
										tile_icon_local {
											childImageSharp {
												fluid(maxWidth: 128) {
													...GatsbyImageSharpFluid
												}
											}
										}
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
						<>
						{data.allThirdPartyPages.edges.map(({ node }, i) => (
							<>
							{node.nav_level === '1' || node.nav_level === '3' ? (
								<>
								{node.type === 'templated_page' && node.parent_id === '0' && 
									<article key={i} id={node.slug} className={`${this.props.article === node.slug ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
										{node.tile_icon_local && 
											<div className="logo"><Img fluid={node.tile_icon_local.childImageSharp.fluid} /></div>
										}
									
										<Sections slug={node.slug} onCloseArticle={this.props.onCloseArticle} />
										{close}
									</article>
								}
								</>
							) : (null) 
							}
							</>
						))}
						</>
					)}
				/>

			</div>
		)
	}
}

Main.propTypes = {
	route: PropTypes.object,
	article: PropTypes.string,
	articleTimeout: PropTypes.bool,
	onCloseArticle: PropTypes.func,
	timeout: PropTypes.bool,
	setWrapperRef: PropTypes.func.isRequired,
}

export default Main