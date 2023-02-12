import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import Section from '../components/Section'

class Sections extends React.Component {
	render() {
		return (
			<>
			<StaticQuery
				query={graphql`
					query SectionsQuery {
						allThirdPartyPages {
							edges {
								node {
									name
									nav_level
									parent_id
									slug
									sections {
										section {
											alternative_id
											placement
											position
											name
											anchor_id
											custom_class
											contained
											padded
											parallax_bg
											image_1_dummy
											image_1_local {
												childImageSharp {
													fluid(maxWidth: 1920) {
														...GatsbyImageSharpFluid
													}
												}
												publicURL
											}											
										}
										components {
											component {
												alternative_id
												module
												type
												component_type
												container_type
												style
												custom_class
												reference
												placement
												position
											}
											options {
												custom_class {
													value
												}
											}
											object {
												alternative_id
												body
												name
												header_level
												image_1_url
												image_1_dummy
												image_1_local {
													childImageSharp {
														fluid(maxWidth: 1920) {
															...GatsbyImageSharpFluid
														}
													}
													publicURL
												}
												file_name
												embedded_video_id
												custom_submit_button_text
												thank_you_title
												thank_you_text
												alternative_fields {
													type
													options {
														title
														default_selection
													}
													default_value
													description
													required
													title
													namespace
												}
												photos {
													title
													description
													image_1_url
													image_1_dummy
													image_1_local {
														childImageSharp {
															fluid(maxWidth: 1920) {
																...GatsbyImageSharpFluid
															}
														}
														publicURL
													}
												}
											}
										}
									}
								}
							}
						}
					}
				`}
				render={data => (
					data.allThirdPartyPages.edges.map(({ node }, i) => (
						<>
						{this.props.slug === node.slug && 
							<>
							{node.sections && node.sections.map(( sections ) => (
								<Section params={sections.section} components={sections.components} onCloseArticle={this.props.onCloseArticle} />
							))}
							</>
						}
						</>
					)
				))}
			/>
			</>
		)
	}
}

Sections.propTypes = {
	slug: PropTypes.string,
}

export default Sections