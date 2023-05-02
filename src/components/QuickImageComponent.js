import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";

class QuickImageComponent extends React.Component {
	render() {
		return (
            <div className={`cell ${this.props.params.lg_width.value ? this.props.params.lg_width.value+'u(xlarge) ' : '12u'} ${this.props.params.md_width.value ? this.props.params.md_width.value+'u(large) ' : ''} ${this.props.params.sm_width.value ? this.props.params.sm_width.value+'u(small) ' : ''} ${this.props.params.xs_width.value ? this.props.params.xs_width.value+'u(xsmall) ' : ''}`}>
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