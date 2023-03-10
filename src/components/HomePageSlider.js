import React from 'react'
import { Link, graphql, navigate, StaticQuery } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"

class HomePageSlider extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			fade: true,
			swipeToSlide: true,
			lazyLoad: true,
			autoplay: false,
			autoplaySpeed: 3000,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};

		return (
			<StaticQuery query={HomePageSlidesQuery} render={data => (
					<>
						{data.allThirdPartyHomePageSlides.edges[0].node.alternative_id > 0 &&
							<Slider className='homepage-slider slider-container' {...settings}>
								{data.allThirdPartyHomePageSlides.edges.map(({ node }, i) => (
									<>
										<div key={i} className={`slide${node.style ? ' '+node.style:{}}`}
											style={(node.image_1_dummy === false) ? {backgroundImage: `url(${node.image_1_local?.publicURL})`} : {} }>
											{(node.title ?? node.sub_title ?? node.description ?? node.button_text) &&
												<div className="text_box">
												{node.title && 
													<h2 dangerouslySetInnerHTML={{ __html: node.title}} />
												}
												{node.sub_title && 
													<h3 dangerouslySetInnerHTML={{ __html: node.sub_title}} />
												}
												{node.description && 
													<div dangerouslySetInnerHTML={{ __html: node.description}} />
												}
												{node.button_text && 
													<Link to={node.destination} target={node.target === 1 ? '_blank' : '_parent'} rel={node.target === 1 ? 'noreferrer' : ''} className="button" onClick={(e) => {e.preventDefault(); this.props.onGotoPage(node.destination)}}>{node.button_text}</Link>
												}
												</div>
											}									
											<Link to={node.destination} target={node.target === 1 ? '_blank' : '_parent'} rel={node.target === 1 ? 'noreferrer' : ''} className="link" onClick={(e) => {e.preventDefault(); this.props.onGotoPage(node.destination)}}>
												{/* <GatsbyImage image={node.image_1_local?.childImageSharp?.gatsbyImageData} className="hero"/>*/}
											</Link>
										</div>
									</>
								))}
							</Slider>
						}
					</>
				)}
			/>
		);
	}
}

export default HomePageSlider

const HomePageSlidesQuery = graphql`
  query HomePageSlidesQuery {
    allThirdPartyHomePageSlides {
      edges {
        node {
          alternative_id
          type
          title
          name
          sub_title
          description
          display_date
          button_text
          destination
          target
          hide_date
          hide_text
          hide_button
          style
          image_1_url
          image_1_dummy
          image_1_local {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            publicURL
          }
          image_1
          image_1_alt
        }
      }
    }
  }
`;