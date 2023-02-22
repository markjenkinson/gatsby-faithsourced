import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"

class SliderComponent extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
    
		return (
            <div className='col'>
				<Slider className='slider-container' {...settings}>
					{this.props.data.photos && this.props.data.photos.map(( photo ) => (
						<div><GatsbyImage image={photo.image_1_local?.childImageSharp?.gatsbyImageData} /></div>
					))}
				</Slider>
			</div>
        );
	}
}

SliderComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default SliderComponent