import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Img from "gatsby-image"

const Home = (props) => (
	<section id="teasers" className="tiles">
	
	<StaticQuery
		query={graphql`
			query HomeTilesQuery {
				allThirdPartyPages {
					edges {
						node {
							nav_level
							parent_id
							type
							name
							tile_text
							tile_ribbon_text
							excerpt
							slug
							link_url
							link_target
							link_mode
							link_hash
							tile_icon_local {
								childImageSharp {
									fluid(maxWidth: 512) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
					}
				}
			}
		`}
		render={data => (
			data.allThirdPartyPages.edges.map(({ node }, i) => (
				<>
				{node.type === 'templated_page' && node.nav_level === '3' && node.parent_id === '0' && 
					<article>
						{node.tile_ribbon_text && 
							<div className="ribbon ribbon-top-right"><div><span dangerouslySetInnerHTML={{ __html: node.tile_ribbon_text}} /></div></div>
						}
						<header className="major">
							{node.tile_icon_local && 
								<span className="image glyph"><Img fluid={node.tile_icon_local.childImageSharp.fluid} /></span>
							}
							<h3 dangerouslySetInnerHTML={{ __html: node.name}} />
							{node.tile_text && 
								<p dangerouslySetInnerHTML={{ __html: node.tile_text}} />
							}
						</header>
						<a className="link primary" href="javascript:;" onClick={() => {props.onOpenArticle(node.slug)}}></a>
					</article>
				}
				</>
			))
		)}
	/>
	</section>
)

Home.propTypes = {
	onOpenArticle: PropTypes.func
}

export default Home
