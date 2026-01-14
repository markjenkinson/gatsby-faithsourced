import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

class NotFoundPage extends React.Component {
  state = { isMenuVisible: false }
  handleToggleMenu = () => this.setState(s => ({ isMenuVisible: !s.isMenuVisible }))

  render() {
  	let close = <Link to="/" className="close" alt="Close" title="Close"></Link>
    return (
      <Layout location={this.props.location}>
		<div id="page">
          <div id="wrapper">
            
            <div id="main" style={{ display: 'flex' }}>
				<header id="header">
					<div className="logo-glyph page-not-found"></div>
				</header>
				<article className={`active timeout`}>
					<section>
						<h1 className="align-center">Whoops!</h1>
						<p className="align-center">The page you are looking for has either moved, or it never existed.</p>
					</section>
					{close}
				</article>
			</div>
			<Footer />
          </div>
          <div id="bg"></div>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage
