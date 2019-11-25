import React from 'react'
import PropTypes from 'prop-types'
import { Parallax, Background } from 'react-parallax'

import TextBlockComponent from '../components/TextBlockComponent'
import QuickImageComponent from '../components/QuickImageComponent'
import FormComponent from '../components/FormComponent'
import VideoComponent from '../components/VideoComponent'

class Section extends React.Component {
	render() {
		return (
			<section id={`section-${this.props.params.anchor_id}`} className={`${this.props.params.image_1_dummy === false ? 'backgrounded' : ''}`} style={{backgroundImage: this.props.params.image_1_dummy === false ? 'url('+this.props.params.image_1_local.childImageSharp.fluid.src+')' : 'none', backgroundSize: 'cover'}}>
				{this.props.components && this.props.components.map(( components) => (
					<>
					{components.component.module === "text_blocks" && 
						<TextBlockComponent params={components.options} data={components.object} />
					}
					{components.component.module === "quick_images" && 
						<QuickImageComponent params={components.options} data={components.object} />
					}
					{components.component.module === "forms" && 
						<FormComponent params={components.options} data={components.object} onCloseArticle={this.props.onCloseArticle} />
					}
					{components.component.module === "multimedia" && 
						<VideoComponent params={components.options} data={components.object} />
					}
					</>
				))}
			</section>
		)
	}
}

Section.propTypes = {
	params: PropTypes.object,
	components: PropTypes.object,
}

export default Section
