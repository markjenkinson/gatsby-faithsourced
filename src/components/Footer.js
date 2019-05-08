import React from 'react'
import PropTypes from 'prop-types'

import SocialLinks from '../components/SocialLinks'

const Footer = (props) => (
    <footer id="footer" style={props.timeout ? {display: 'none'} : {}}>
		<SocialLinks/>
		<p className="copyright">&copy; 2019 Faith Sourced Software Foundation.</p>
    </footer>
)

Footer.propTypes = {
    timeout: PropTypes.bool
}

export default Footer
