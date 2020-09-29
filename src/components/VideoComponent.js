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
		};
    
		return (
			<div className='col'>
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