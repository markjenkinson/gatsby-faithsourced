import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

//import scrollToComponent from 'react-scroll-to-component';
import Scroll from 'react-scroll';

import Header from '../components/Header'
import Main from '../components/Main'
import Home from '../components/Home'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isArticleVisible: false,
			timeout: false,
			articleTimeout: false,
			article: '',
			isMenuVisible: false,
			loading: 'is-loading',
			scrolly: 0,
		}
		this.handleOpenArticle = this.handleOpenArticle.bind(this);
		this.handleCloseArticle = this.handleCloseArticle.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleScrollTo = this.handleScrollTo.bind(this);
		this.handleToggleMenu = this.handleToggleMenu.bind(this);
		
		this.ScrollEvents = Scroll.Events;
		this.ScrollSpy  = Scroll.scrollSpy;
		this.Scroller = Scroll.scroller;
	}

	componentDidMount () {
		this.timeoutId = setTimeout(() => {
			this.setState({loading: 'loaded'});
		}, 100);
		
		//this.ScrollEvents.scrollEvent.register('begin', function(to, element) {});
		//this.ScrollEvents.scrollEvent.register('end', function(to, element) {});
		
		//this.ScrollSpy.update();
	}

	componentWillUnmount () {
		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
		}
		
		//this.ScrollEvents.scrollEvent.remove('begin');
		//this.ScrollEvents.scrollEvent.remove('end');
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleOpenArticle(article) {	
		document.addEventListener('mousedown', this.handleClickOutside);
		this.setState({
			isArticleVisible: !this.state.isArticleVisible,
			article, loading: ''
		})

		setTimeout(() => {
			this.setState({
				timeout: !this.state.timeout,
				scrolly: window.pageYOffset
			})
			window.scrollTo(0, 0)
		}, 325)

		setTimeout(() => {
			this.setState({
				articleTimeout: !this.state.articleTimeout
			})
		}, 350)

	}

	handleCloseArticle() {
		document.removeEventListener('mousedown', this.handleClickOutside);
		this.setState({
			articleTimeout: !this.state.articleTimeout
		})

		setTimeout(() => {
			this.setState({
				timeout: !this.state.timeout
			})
			 window.scrollTo(0, this.state.scrolly)
		}, 325)

		setTimeout(() => {
			this.setState({
				isArticleVisible: !this.state.isArticleVisible,
				article: '',
				scrolly: 0
			})
		}, 350)

	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.state.isArticleVisible) {
				this.handleCloseArticle();
			}
		}
	}
	
	handleScrollTo(to) {
		//scrollToComponent(this.Blog, { offset: 0, align: 'top', duration: 300});
		this.Scroller.scrollTo(to, {
			duration: 300,
			smooth: true,
			//spy: true,
			//hashSpy: true,
			//containerId: 'wrapper'
		})
	}
	
	handleToggleMenu() {
		this.setState({
			isMenuVisible: !this.state.isMenuVisible
		})
	}
	
	render() {
		const blogRoll = this.props.data.allThirdPartyPosts;
		const sitePrefs = this.props.data.allThirdPartyPreferences;
		
		return (
			<Layout location={this.props.location}>
				<div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'blurred' : ''} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
					<div id="wrapper">
						<Header glyph={sitePrefs.edges[0].node.logo_glyph_img} wordmark={sitePrefs.edges[0].node.logo_wordmark_img} title={sitePrefs.edges[0].node.site_name} slogan={sitePrefs.edges[0].node.logo_slogan} onOpenArticle={this.handleOpenArticle} onScrollTo={this.handleScrollTo} timeout={this.state.timeout} />
						<Main
							isArticleVisible={this.state.isArticleVisible}
							timeout={this.state.timeout}
							articleTimeout={this.state.articleTimeout}
							article={this.state.article}
							onCloseArticle={this.handleCloseArticle}
							setWrapperRef={this.setWrapperRef}
						/>
						<div id="home" style={this.state.timeout ? {display: 'none'} : {}}>
							<Home onOpenArticle={this.handleOpenArticle} />
							<section id="blog" className="tiles" ref={(section) => { this.Blog = section; }}>
								{blogRoll.edges.map(({ node }, i) => (
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

export default IndexPage

export const listQuery = graphql`
	query ListQuery {
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
								...GatsbyImageSharpFluid
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
	}
`
