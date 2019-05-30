import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import '../assets/scss/main.scss'

import Footer from '../components/Footer'

const Layout = ({ children, location }) => {
	return (
		<div id="page" className="body blurred">
			<div id="wrapper">
				<div id="main" style={{display:'flex'}}>
					<article className="active timeout">
						{children}
					</article>
				</div>
				<Footer/>
			</div>
			<div id="bg"></div>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
