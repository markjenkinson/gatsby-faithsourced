import React from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"

class QuickImageComponent extends React.Component {
	render() {
		return (
			<div className='col'>
				<span className={`image ${this.props.params.custom_class.value ? this.props.params.custom_class.value : ''}`}><Img fluid={this.props.data.image_1_local.childImageSharp.fluid} /></span>
			</div>
		)
	}
}

QuickImageComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default QuickImageComponent