import React from 'react';
import Helmet from 'react-helmet'
import { Link, navigate, graphql } from 'gatsby'
import striptags from 'striptags'

import '../assets/scss/main.scss'

import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

class blogPageTemplate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			timeout: false,
			isMenuVisible: false,
			loading: 'loaded',
			blurred: 'blurred',
			scrolly: 0,
		}
		this.handleToggleMenu = this.handleToggleMenu.bind(this)
	}
	
	componentDidMount () {
		if(window.history.state && typeof window.history.state.blurred !== 'undefined') {
			this.setState({blurred: window.history.state.blurred});
		}
		this.timeoutId = setTimeout(() => {
			this.setState({blurred: ''});
		}, 100);
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
	
	handleGotoPage(page) {
		this.setState({
			isPanelVisible: true,
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

	render() {
		const postListedges = this.props.data.allThirdPartyPosts.edges.filter(({ node }) => node.title !== null);
		const page = this.props.data.thirdPartyPages
		const prefs = this.props.data.allThirdPartyPreferences.edges[0]
		const meta_title = striptags(prefs.node.site_title) + ' | ' + striptags(page.title)
		
		return <>
            <Helmet
                title={meta_title}
                meta={[
                    { name: 'description', content: page.excerpt },
                    { name: 'keywords', content: page.keywords },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:site_name', content: prefs.node.site_name },
                    { property: 'og:title', content: meta_title },
                    { property: 'og:url', content: this.props.location.href },
                    { property: 'og:description', content: page.excerpt },
                ]}>
                <html lang="en" />
            </Helmet>
            <div className={`body ${this.state.isPanelVisible ? 'blurred' : ''} ${this.state.blurred} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                    <div id="wrapper">
                        <Header timeout={this.state.timeout} title={`${postListedges[0].node.news_group_name ? postListedges[0].node.news_group_name : 'Blog'}`} />
                        <div id="page" style={this.state.timeout ? {display: 'none'} : {}}>
                            <section id="blog" className="tiles" ref={(section) => { this.Blog = section; }}>
                                {postListedges.map(({ node }, i) => (
                                    <article className="image-tile" key={i} style={{backgroundImage: `url(${node.image_1_local?.publicURL})`}}>
                                        <header className="major">
                                            <h2 className="title">{node.title}</h2>
                                            <span className="date-line"><i className="fa fa-calendar"></i>{node.date}</span>
                                            <p>{node.excerpt}</p>
                                        </header>
                                        <Link to={`/${node.slug}`} key={i} className="link primary" onClick={(e) => {e.preventDefault();this.handleGotoPage('/'+node.slug)}}></Link>
                                    </article>
                                ))}
                            </section>
                        </div>
                        <Footer timeout={this.state.timeout} />
                    </div>
                    <div id="bg"></div>
                    <Menu onToggleMenu={this.handleToggleMenu} location={this.props.location} />
                </div>
        </>;
	}
}

export default blogPageTemplate;

export const blogRollQuery = graphql`query BlogRollQuery($slug: String!) {
  allThirdPartyPosts(filter: {alternative_id: {gt: 0}}, sort: {date: DESC}) {
    edges {
      node {
        alternative_id
        title
        news_group_name
        image_1_url
        image_1_local {
          childImageSharp {
            gatsbyImageData(
              width: 512
              height: 512
              placeholder: BLURRED
              layout: CONSTRAINED
            )
          }
          publicURL
        }
        date(formatString: "MMMM D, YYYY [at] h:mm A")
        slug
        excerpt
      }
    }
  }
  thirdPartyPages(slug: {eq: $slug}) {
    name
    title
    slug
    excerpt
    keywords
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