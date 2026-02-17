import React from 'react'
import PropTypes from 'prop-types'

class MultimediaGroupComponent extends React.Component {
	render() {    
		return (
            <div className={`cell ${this.props.params.lg_width.value ? this.props.params.lg_width.value+'u(xlarge) ' : '12u'} ${this.props.params.md_width.value ? this.props.params.md_width.value+'u(large) ' : ''} ${this.props.params.sm_width.value ? this.props.params.sm_width.value+'u(small) ' : ''} ${this.props.params.xs_width.value ? this.props.params.xs_width.value+'u(xsmall) ' : ''}`}>
					<div className="box multimedia-container">
						<div className="content">
							{this.props.data.multimedia_files && this.props.data.multimedia_files.map(( multimedia_file ) => (
								<div className="box-row">
									{multimedia_file.title && <h2>{multimedia_file.title}</h2>}

									{multimedia_file.description && (
										<div
											className="description"
											dangerouslySetInnerHTML={{ __html: multimedia_file.description }}
										/>
									)}

									{multimedia_file.file_name && (
									  <a
										href={multimedia_file.file_url_local.publicURL}
										target={multimedia_file.type == "9" ? "_self" : "_blank"}
										rel="noopener noreferrer"
										className="button small"
									  >
										{multimedia_file.type == "9" ? "Download" : "View"}
									  </a>
									)}
									
									{multimedia_file.file_name && multimedia_file.type == "4" && (
									  <a
										href={multimedia_file.file_url_local.publicURL}
										target="_self"
										rel="noopener noreferrer"
										className="button small"
									  >
										Download
									  </a>
									)}
								</div>
							))}
					</div>
				</div>
			</div>
        );
	}
}

export default MultimediaGroupComponent