import React from 'react'
import { Link, navigate, graphql } from 'gatsby'
import Layout from '../components/layout'

import Scroll from 'react-scroll';

import Header from '../components/Header'
import Home from '../components/Home'
import HomePageSlider from '../components/HomePageSlider'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

class IndexPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isPanelVisible: false,
			timeout: false,
			articleTimeout: false,
			article: '',
			loading: 'is-loading',
			isMenuVisible: false,
			scrolly: 0,
		}
		this.handleGotoPage = this.handleGotoPage.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleScrollTo = this.handleScrollTo.bind(this);
		this.handleToggleMenu = this.handleToggleMenu.bind(this);
		
		this.ScrollEvents = Scroll.Events;
		this.ScrollSpy  = Scroll.scrollSpy;
		this.Scroller = Scroll.scroller;
	}
	
	componentWillMount () {
		// this is a necessary hack to prevent FireFox from a glitchy rendering of the background animation
		if(this.props.location.state !== null && typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.isPanelVisible !== 'undefined') {
			this.setState({isPanelVisible: true});
		}
	}
	
	componentDidMount () {
		if(window.history.state && typeof window.history.state.scrolly !== 'undefined') {
			this.setState({scrolly: window.history.state.scrolly});
			setTimeout(() => {
				window.scrollTo(0, this.state.scrolly);
			}, 125)
		}
		
		if(window.history.state && typeof window.history.state.loading !== 'undefined') {
			this.setState({loading: window.history.state.loading});
		}
		else {
			this.timeoutId = setTimeout(() => {
				this.setState({loading: 'loaded'});
			}, 125);
		}	
		
		if(window.history.state && typeof window.history.state.isPanelVisible !== 'undefined') {
			setTimeout(() => {
				this.setState({isPanelVisible: !window.history.state.isPanelVisible});
			}, 325)
		}
		
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
	
	handleGotoPage(page) {
		this.setState({
			isPanelVisible: !this.state.isPanelVisible,
			loading: '',
			scrolly: window.pageYOffset
		})
		
		setTimeout(() => {
			navigate(page, {
				state: {
					scrolly: this.state.scrolly,
				}
			})
		}, 325)
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.state.isPanelVisible) {
				this.handleCloseArticle();
			}
		}
	}
	
	handleScrollTo(to) {
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
		const blogRolledges = this.props.data.allThirdPartyPosts.edges.filter(({ node }) => node.title !== null);
		const sitePrefsedges = this.props.data.allThirdPartyPreferences.edges.filter(({ node }) => node.site_title !== null);
		
		return (
            <Layout location={this.props.location}>
				<div className={`body ${this.state.loading} ${this.state.isPanelVisible ? 'blurred' : ''} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
					<div id="wrapper">
						<Header glyph={sitePrefsedges[0].node.logo_glyph_img} wordmark={sitePrefsedges[0].node.logo_wordmark_img} title={sitePrefsedges[0].node.site_name} slogan={sitePrefsedges[0].node.logo_slogan} onScrollTo={this.handleScrollTo} timeout={this.state.timeout} onGotoPage={this.handleGotoPage} />
						<div id="home" style={this.state.timeout ? {display: 'none'} : {}}>
							<HomePageSlider onGotoPage={this.handleGotoPage}/>
							<Home onGotoPage={this.handleGotoPage} />
							<section id="blog" className="tiles" ref={(section) => { this.Blog = section; }}>
								{blogRolledges.map(({ node }, i) => (
									<article className="image-tile" key={i} style={{backgroundImage: `url(${node.image_1_local?.publicURL})`}}>
										<div className="ribbon ribbon-top-right"><div><span><strong>{node.news_group_name}</strong></span></div></div>
										<header className="major">
											<h2 className="title">{node.title}</h2>
											<span className="date-line"><i className="fa fa-calendar"></i>{node.date}</span>
											<p>{node.excerpt}</p>
										 </header>
										 <Link to={`/${node.slug}`} key={i} className="link primary" onClick={(e) => {e.preventDefault();this.handleGotoPage(node.slug)}}></Link>
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
        );
	}
}

export default IndexPage

export const listQuery = graphql`query ListQuery {
  allThirdPartyPosts(
    filter: {alternative_id: {gt: 0}}
    sort: {date: DESC}
    limit: 3
  ) {
    edges {
      node {
        alternative_id
        title
        news_group_name
        image_1_url
        image_1_local {
          childImageSharp {
            gatsbyImageData(width: 512, height: 512, layout: CONSTRAINED)
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
}`
