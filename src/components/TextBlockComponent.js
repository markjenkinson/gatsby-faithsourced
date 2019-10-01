import React from 'react'
import PropTypes from 'prop-types'
import Img from "gatsby-image"

class TextBlockComponent extends React.Component {
	render() {
		const CustomTag = `${this.props.data.header_level}`
		return (
			<div className='col'>
			{this.props.data.name &&
				<>
				{this.props.data.header_level && 
					<CustomTag className="major" dangerouslySetInnerHTML={{ __html: this.props.data.name}} />
				}
				{!this.props.data.header_level && 
					<h2 className="major" dangerouslySetInnerHTML={{ __html: this.props.data.name}} />
				}
				</>
			}
			{this.props.data.image_1_dummy === false &&
				<span className={`image ${this.props.params.custom_class.value ? this.props.params.custom_class.value : 'right'}`}><Img fluid={this.props.data.image_1_local.childImageSharp.fluid} /></span>
			}
			<span dangerouslySetInnerHTML={{ __html: this.props.data.body}} />
			</div>
		)
	}
}

TextBlockComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default TextBlockComponent