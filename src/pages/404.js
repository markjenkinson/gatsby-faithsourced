import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props)
  }
	render() {
		return (
		  <Layout location={this.props.location}>
			<div className="logo faithsourced" alt="Faith Sourced Logo"></div>
			<h1 className="align-center">NOT FOUND</h1>
			<p className="align-center">You just hit a route that doesn&#39;t exist... the sadness.</p>
			<p className="align-center"><Link to="/">Home</Link></p>
		  </Layout>
		)
	}
}
export default NotFoundPage
