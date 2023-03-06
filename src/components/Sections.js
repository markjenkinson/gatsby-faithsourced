import React from 'react'
import PropTypes from 'prop-types'

import Section from '../components/Section'

class Sections extends React.Component {
	render() {
		return <>
			{this.props.page.sections && this.props.page.sections.map(( section ) => (
				<Section params={section.section} components={section.components} onCloseArticle={this.props.onCloseArticle} />
			))}
        </>
	}
}

Sections.propTypes = {
	slug: PropTypes.string,
}

export default Sections