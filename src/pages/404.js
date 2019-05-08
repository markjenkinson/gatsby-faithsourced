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
			<h1 className="align-center">Whoops!</h1>
			<p className="align-center">The page you are looking for has either moved, or it never existed.</p>
			<p className="align-center"><Link to="/">Home</Link></p>
		  </Layout>
		)
	}
}
export default NotFoundPage
