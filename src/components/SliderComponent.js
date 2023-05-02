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
			fade: false,
			swipeToSlide: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
    
		return (
            <div className={`cell ${this.props.params.lg_width.value ? this.props.params.lg_width.value+'u(xlarge) ' : '12u'} ${this.props.params.md_width.value ? this.props.params.md_width.value+'u(large) ' : ''} ${this.props.params.sm_width.value ? this.props.params.sm_width.value+'u(small) ' : ''} ${this.props.params.xs_width.value ? this.props.params.xs_width.value+'u(xsmall) ' : ''}`}>
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