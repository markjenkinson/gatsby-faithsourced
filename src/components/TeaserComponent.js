import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

class TeaserComponent extends React.Component {
	render() {
		const CustomTag = `${this.props.data.header_level}`;
		const link = this.props.data.pretty_url ? `/${this.props.data.pretty_url}` : this.props.data.url ? this.props.data.url : null;

		return (
            <div className={`cell ${this.props.params.lg_width.value ? this.props.params.lg_width.value+'u(xlarge) ' : '12u'} ${this.props.params.md_width.value ? this.props.params.md_width.value+'u(large) ' : ''} ${this.props.params.sm_width.value ? this.props.params.sm_width.value+'u(small) ' : ''} ${this.props.params.xs_width.value ? this.props.params.xs_width.value+'u(xsmall) ' : ''}`}>
				<div className={`box${this.props.params.image_1_layout.value ? ' '+this.props.params.image_1_layout.value : ''}`}>
				{this.props.data.image_1_dummy === false &&
					<span className={`image`}><GatsbyImage image={this.props.data.image_1_local?.childImageSharp?.gatsbyImageData} /></span>
				}
				
				<div class="content">
					{this.props.data.sub_title &&
						<h2 className="major" dangerouslySetInnerHTML={{ __html: this.props.data.sub_title}} />
					}
					
					{this.props.data.description && 
						<div className="description" dangerouslySetInnerHTML={{ __html: this.props.data.description}} />
					}
				
					{link && (
					  this.props.data.link_type === 'external' ? (
						<a
						  href={link}
						  className="button"
						  target="_blank"
						  rel="noopener noreferrer"
						>
						  {this.props.data.button_text || 'Read More'}
						</a>
					  ) : (
						<Link to={link} className="button">
						  {this.props.data.button_text || 'Read More'}
						</Link>
					  )
					)}
					</div>
				</div>
			</div>
        );
	}
}

TeaserComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default TeaserComponent