import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from "gatsby-image"

const Home = (props) => (
	<section id="teasers" className="tiles">
		<StaticQuery
			query={graphql`
				query HomeTilesQuery {
					allThirdPartyPages(filter: {nav_level: {eq: 3}, parent_id: {eq: 0}, type: {eq: "templated_page"}}) {
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
								tile_icon_dummy
								tile_thumbnail_local {
									childImageSharp {
										fluid(maxWidth: 512) {
											...GatsbyImageSharpFluid
										}
									}
								}
								tile_thumbnail_dummy
							}
						}
					}
				}
			`}
			render={data => (
				data.allThirdPartyPages.edges.map(({ node }, i) => (
					<article key={i} className={node.tile_thumbnail_dummy === false && "image-tile"} style={(node.tile_thumbnail_dummy === false) ? {backgroundImage: `url(${node.tile_thumbnail_local.childImageSharp.fluid.src})`} : {} }>
						{node.tile_ribbon_text && 
							<div className="ribbon ribbon-top-right"><div><span dangerouslySetInnerHTML={{ __html: node.tile_ribbon_text}} /></div></div>
						}
						<header className="major">
							{node.tile_icon_dummy === false && 
								<span className="image glyph"><Img fluid={node.tile_icon_local.childImageSharp.fluid} /></span>
							}
							<h2 className="title" dangerouslySetInnerHTML={{ __html: node.name}} />
							{node.tile_text && 
								<p dangerouslySetInnerHTML={{ __html: node.tile_text}} />
							}
						</header>
						<Link to={`/${node.slug}`} className="link primary" onClick={(e) => {e.preventDefault();props.onGotoPage(node.slug)}}></Link>
					</article>
				))
			)}
		/>
	</section>
)

Home.propTypes = {
	onOpenArticle: PropTypes.func,
	onGotoArticle: PropTypes.func
}

export default Home
