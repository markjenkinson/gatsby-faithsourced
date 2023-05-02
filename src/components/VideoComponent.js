import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube';

class VideoComponent extends React.Component {
	render() {
		const opts = {
			width: '100%',
			height: '100%',
			playerVars: { // https://developers.google.com/youtube/player_parameters
				autoplay: 0,
				controls: 0,
				showinfo: 0,
				wmode: 'opaque',
				rel: 0
			}
		}
    
		return (
            <div className={`cell ${this.props.params.lg_width.value ? this.props.params.lg_width.value+'u(xlarge) ' : '12u'} ${this.props.params.md_width.value ? this.props.params.md_width.value+'u(large) ' : ''} ${this.props.params.sm_width.value ? this.props.params.sm_width.value+'u(small) ' : ''} ${this.props.params.xs_width.value ? this.props.params.xs_width.value+'u(xsmall) ' : ''}`}>
				<YouTube containerClassName='video-container' videoId={this.props.data.embedded_video_id} opts={opts} onReady={this._onReady}/>
			</div>
		)
	}
	
	_onReady(event) {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	}
}

VideoComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default VideoComponent