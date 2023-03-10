import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

const Home = (props) => (
	<section id="teasers" className="tiles">
		<StaticQuery
			query={graphql`query HomeTilesQuery {
  allThirdPartyPages(
	filter: {type: {regex: "/templated_page|link/"}, nav_level: {eq: 3}, parent_id: {eq: 0}}
  ) {
    edges {
      node {
        nav_level
        parent_id
        type
        name
        tile_text
        tile_ribbon_text
        tile_button_text
        excerpt
        slug
        link_url
        link_target
        link_mode
        link_hash
        tile_icon_local {
          childImageSharp {
             gatsbyImageData(
              placeholder: NONE
              height: 512
              formats: AUTO
              width: 512
              quality: 70 # 50 by default
            )
          }
          publicURL
        }
        tile_icon_dummy
        tile_thumbnail_local {
          childImageSharp {
            gatsbyImageData(width: 512, layout: CONSTRAINED)
          }
          publicURL
        }
        tile_thumbnail_dummy
      }
    }
  }
}`}
			render={data => (
				data.allThirdPartyPages.edges.map(({ node }, i) => (
					<article key={i} className={node.tile_thumbnail_dummy === false && "image-tile"} style={(node.tile_thumbnail_dummy === false) ? {backgroundImage: `url(${node.tile_thumbnail_local?.publicURL})`} : {} }>
						{node.tile_ribbon_text && 
							<div className="ribbon ribbon-top-right"><div><span dangerouslySetInnerHTML={{ __html: node.tile_ribbon_text}} /></div></div>
						}
						<header className="major">
							{node.tile_icon_dummy === false && 
								<span className="image glyph"><GatsbyImage image={node.tile_icon_local?.childImageSharp?.gatsbyImageData} loading="eager"/></span>
							}
							<h2 className="title" dangerouslySetInnerHTML={{ __html: node.name}} />
							{node.tile_text && 
								<p dangerouslySetInnerHTML={{ __html: node.tile_text}} />
							}
							{node.tile_button_text && 
								<button dangerouslySetInnerHTML={{ __html: node.tile_button_text}} />
							}
						</header>
						<Link to={`${node.slug?node.slug:node.link_url?node.link_url:''}`} className="link primary" onClick={(e) => {e.preventDefault();props.onGotoPage(node.slug?node.slug:node.link_url?node.link_url:'')}}></Link>
					</article>
				))
			)}
		/>
	</section>
)

export default Home