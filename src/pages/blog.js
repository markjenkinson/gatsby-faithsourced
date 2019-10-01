import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

//import scrollToComponent from 'react-scroll-to-component';

import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

class BlogPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			timeout: false,
			isMenuVisible: false,
			loading: 'loaded',
			blurred: 'blurred',
		}
		this.handleToggleMenu = this.handleToggleMenu.bind(this)
	}
	
	componentDidMount () {
		this.timeoutId = setTimeout(() => {
				this.setState({loading: 'loaded'});
				this.setState({blurred: ''});
		}, 100);
	}

	componentWillUnmount () {
		if (this.timeoutId) {
				clearTimeout(this.timeoutId);
		}
		this.setState({blurred: 'blurred'});
	}
	
	handleToggleMenu() {
		this.setState({
			isMenuVisible: !this.state.isMenuVisible
		})
	}
	
	render() {
		const postListJSON = this.props.data.allThirdPartyPosts;
		const page = this.props.data.thirdPartyPages;
		
		return (
			<Layout location={this.props.location} meta_title={page.title}>
				<div className={`body loaded ${this.state.blurred} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
					<div id="wrapper">
						<Header timeout={this.state.timeout} title={`${page.name ? page.name : 'Blog'}`} />
						<div id="page" style={this.state.timeout ? {display: 'none'} : {}}>
							{/**
							<section id="blog">
							 {postList.edges.map(({ node }, i) => (
					<Link to={node.fields.slug} key={i} className="link" >
						<div className="post-list">
						<h1>{node.frontmatter.title}</h1>
						<span>{node.frontmatter.date}</span>
						<p>{node.excerpt}</p>
						</div>
					</Link>
					))}
							</section>
							**/}
							<section id="blog" className="tiles" ref={(section) => { this.Blog = section; }}>
					{postListJSON.edges.map(({ node }, i) => (
						<article className="image-tile" key={i} style={{backgroundImage: `url(${node.image_1_local.childImageSharp.fluid.src})`}}>
							<div className="ribbon ribbon-top-right"><div><span><strong>{node.news_group_name}</strong></span></div></div>
							<header className="major">
								<h3>{node.title}</h3>
								<span className="date-line"><i className="fa fa-calendar"></i>{node.date}</span>
								<p>{node.excerpt}</p>
							 </header>
							<Link to={`/${node.slug}`} key={i} className="link primary"></Link>
						 </article>
					))}
							</section>
							
						</div>
						<Footer timeout={this.state.timeout} />
					</div>
					<div id="bg"></div>
					<Menu onToggleMenu={this.handleToggleMenu} location={this.props.location} />
				</div>
			</Layout>
		)
	}
}

export default BlogPage

export const blogRollQuery = graphql`
	query BlogRollQuery {
		allThirdPartyPosts(sort: { order: DESC, fields: [date] }) {
			edges {
				node {
					id
					title
					news_group_name
					image_1_url
					image_1_local {
						childImageSharp {
							fluid(maxWidth: 512, maxHeight: 512) {
								src
							}
						}
						publicURL
					}
					date(formatString: "MMMM D, YYYY [at] h:mm A")
					slug
					excerpt
				}
			}
		}
		thirdPartyPages( slug: { eq: "blog" }) {
			name
			title
			slug
			excerpt
		}
	}
`