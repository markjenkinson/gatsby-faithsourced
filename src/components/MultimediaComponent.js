import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube';

class MultimediaComponent extends React.Component {
	render() {
		const { data, params } = this.props;
		const hasVideo = !!data?.embedded_video_id;

		const opts = {
			width: '100%',
			height: '100%',
			playerVars: {
				autoplay: 0,
				controls: 0,
				showinfo: 0,
				wmode: 'opaque',
				rel: 0
			}
		};

		return (
			<div
				className={`cell ${
					params.lg_width.value ? params.lg_width.value + 'u(xlarge) ' : '12u'
				} ${
					params.md_width.value ? params.md_width.value + 'u(large) ' : ''
				} ${
					params.sm_width.value ? params.sm_width.value + 'u(small) ' : ''
				} ${
					params.xs_width.value ? params.xs_width.value + 'u(xsmall) ' : ''
				}`}
			>
				{hasVideo ? (
					<YouTube
						containerClassName="video-container"
						videoId={data.embedded_video_id}
						opts={opts}
						onReady={this._onReady}
					/>
				) : (
					<div className="box multimedia-container">
						<div className="content">
							{data.title && <h2>{data.title}</h2>}
	
							{data.description && (
								<div
									className="description"
									dangerouslySetInnerHTML={{ __html: data.description }}
								/>
							)}
	
							{data.file_name && (
								<a
									href={data.file_url_local.publicURL}
									target="_blank"
									class="button special"
									rel="noopener noreferrer"
								>
									View
								</a>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}

	_onReady(event) {
		event.target.pauseVideo();
	}
}

MultimediaComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
};

export default MultimediaComponent;
