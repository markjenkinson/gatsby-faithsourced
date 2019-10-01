import React from 'react';
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import striptags from "striptags"

import Menu from '../components/Menu'
import Footer from '../components/Footer'

class BlogPost extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isMenuVisible: false,
			loading: 'is-loading',
		}
		this.handleToggleMenu = this.handleToggleMenu.bind(this)
	}
	
	componentDidMount () {
		if(window.history.state && window.history.state.blurred) {
			this.setState({blurred: window.history.state.blurred});
		}
		
		this.timeoutId = setTimeout(() => {
			this.setState({loading: 'loaded'});
			this.setState({blurred: 'blurred'});
		}, 250);		
	}

	componentWillUnmount () {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
	}
	
	handleToggleMenu() {
		this.setState({
			isMenuVisible: !this.state.isMenuVisible
		})
	}
	
	render() {
		const post = this.props.data.thirdPartyPosts
		const prefs = this.props.data.allThirdPartyPreferences.edges[0]
		
		const { next, prev } = this.props.pageContext
   		const meta_title = striptags(post.news_group_name)+' | '+striptags(post.title)
		return (
			<>
				<Helmet
					title={meta_title}
					meta={[
						{ name: 'description', content: post.excerpt },
						{ property: 'og:type', content: 'article' },
						{ property: 'article:author', content: this.props.location.origin },
						{ property: 'article:publisher', content: this.props.location.origin },
						{ property: 'og:site_name', content: prefs.node.site_name },
						{ property: 'og:title', content: meta_title },
						{ property: 'og:url', content: this.props.location.href},
						{ property: 'og:image', content: this.props.location.origin+post.image_1_local.childImageSharp.fluid.src},
						{ property: 'og:description', content: post.excerpt },
					]}>
					<html lang="en" />
				</Helmet>
				<div className={`body loaded ${this.state.blurred} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
					<div id="wrapper">
						<div id="main" style={{display:'flex'}}>
							<article className="active timeout">
								<section>
									<div className="col">
										<span className="image hero"><Img fluid={post.image_1_local.childImageSharp.fluid} /></span>
									</div>
								</section>
								<section>
									<div className="pagination-bar top">
										{prev && (<Link to={prev.slug} state={{blurred: 'blurred'}} className="previous" alt={"Previous Post: "+prev.title} title={"Previous Post: "+prev.title}>Previous</Link>)}
										<Link to="/blog" className="home" alt="Blog" title="Blog">Blog</Link>
										{next && (<Link to={next.slug} state={{blurred: 'blurred'}} className="next" alt={"Next Post: "+next.title} title={"Next Post: "+next.title}>Next</Link>)}
									</div>
									<h1 className="align-center">{post.title}</h1>
									<span className="date-line"><i className="fa fa-calendar"></i>{post.date}</span>
									<div dangerouslySetInnerHTML={{ __html: post.html }} />
									<div className="pagination-bar bottom">
										{prev && (<Link to={prev.slug} state={{blurred: 'blurred'}} className="previous" alt={"Previous Post: "+prev.title} title={"Previous Post: "+prev.title}>Previous</Link>)}
										<Link to="/blog" className="home" alt="Blog" title="Blog">Blog</Link>
										{next && (<Link to={next.slug} state={{blurred: 'blurred'}} className="next" alt={"Next Post: "+next.title} title={"Next Post: "+next.title}>Next</Link>)}
									</div>
								</section>
							</article>
						</div>
						<Footer/>
					</div>
					<div id="bg"></div>
					<Menu onToggleMenu={this.handleToggleMenu} location={this.props.location} />
				</div>
			</>
		)
	}
}

export default BlogPost;

export const query = graphql`
query postQuery($slug: String!) {
    thirdPartyPosts( slug: { eq: $slug }) {
        id
        news_group_name
        title
        date(formatString: "MMMM D, YYYY [at] h:mm A")
        html
        excerpt
        slug
        image_1_url
		image_1_local {
			childImageSharp {
				fluid(maxWidth: 1024, maxHeight: 1024) {
					...GatsbyImageSharpFluid
				}
			}
			publicURL
		}
    }
    allThirdPartyPreferences {
		edges {
		  node {
			site_name
			site_title
			email_address
			meta_keywords
			meta_description
			logo_wordmark_img
			logo_glyph_img
			logo_slogan
			site_bg_img
		  }
		}
	}
}`