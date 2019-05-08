import React from 'react'
import PropTypes from 'prop-types'

const SocialLinks = (props) => (    
    <ul className="icons align-center">
		<li><a href="https://twitter.com/faithsourced" target="_blank" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
		<li><a href="https://facebook.com/faithsourced" target="_blank" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
		<li><a href="https://linkedin.com/company/faithsourced" target="_blank" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
		<li><a href="https://www.youtube.com/channel/UCjN3B-FahTVt2qqc8mMkntQ" target="_blank" className="icon fa-youtube"><span className="label">YouTube</span></a></li>
		<li><a href="https://instagram.com/faithsourced" target="_blank" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
		<li><a href="https://github.com/faithsourced" target="_blank" className="icon fa-github"><span className="label">GitHub</span></a></li>
	</ul>
)

SocialLinks.propTypes = {
    textAlign: PropTypes.string
}

export default SocialLinks
