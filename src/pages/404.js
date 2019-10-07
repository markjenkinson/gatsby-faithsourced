import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props)
  }
	render() {
		let close = <Link to="/" className="close" alt="Close" title="Close"></Link>
		
		return (
		  <Layout location={this.props.location}>
		  	<div className="logo default"></div>
		  	<section>
		  		<div className="col">
					<h1 className="align-center">Whoops!</h1>
					<p className="align-center">The page you are looking for has either moved, or it never existed.</p>
				</div>
				{close}
			</section>
		  </Layout>
		)
	}
}
export default NotFoundPage
