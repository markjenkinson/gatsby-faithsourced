import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image";

class TextBlockComponent extends React.Component {
	render() {
		const CustomTag = `${this.props.data.header_level}`
		return (
            <div className={`cell ${this.props.params.lg_width.value ? this.props.params.lg_width.value+'u(xlarge) ' : '12u'} ${this.props.params.md_width.value ? this.props.params.md_width.value+'u(large) ' : ''} ${this.props.params.sm_width.value ? this.props.params.sm_width.value+'u(small) ' : ''} ${this.props.params.xs_width.value ? this.props.params.xs_width.value+'u(xsmall) ' : ''}`}>
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
				<span className={`image ${this.props.params.custom_class.value ? this.props.params.custom_class.value : 'right'}`}><GatsbyImage image={this.props.data.image_1_local?.childImageSharp?.gatsbyImageData} /></span>
			}
			{this.props.data.body && 
				<span dangerouslySetInnerHTML={{ __html: this.props.data.body}} />
			}
			</div>
        );
	}
}

TextBlockComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default TextBlockComponent