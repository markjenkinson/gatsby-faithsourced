import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

class ThanksPage extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<Layout location={this.props.location}>				
				<div className="logo faithsourced" alt="Faith Sourced Logo"></div>
				<h1 className="align-center">Thank you!</h1>
				<p className="align-center">We are excited to hear about your interest in the Faith Sourced project.</p>
				<p className="align-center">Expect to hear back from us within 1-2 business days, if not sooner.</p>
				<p className="align-center">While you're waiting, we would love it if you took a few moments to follow us on <a href="https://twitter.com/faithsourced/" target="_blank">Twitter</a>, like us on <a href="https://facebook.com/faithsourced/" target="_blank">Facebook</a>, and subscribe to our <a href="https://youtube.com/channel/faithsourced/" target="_blank">YouTube</a> channel.</p>
				<p  className="align-center"><Link to="/">Back</Link></p>
			</Layout>
		)
	}
}

export default ThanksPage
