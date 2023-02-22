import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";

class QuickImageComponent extends React.Component {
	render() {
		return (
            <div className='col'>
				<span className={`image ${this.props.params.custom_class.value ? this.props.params.custom_class.value : ''}`}><GatsbyImage image={this.props.data.image_1_local?.childImageSharp?.gatsbyImageData} /></span>
			</div>
        );
	}
}

QuickImageComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default QuickImageComponent