import React from 'react';
import Helmet from 'react-helmet'
import { Link, navigate, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import striptags from 'striptags'
import WebFont from 'webfontloader'

import '../assets/scss/main.scss'

import Menu from '../components/Menu'
import Footer from '../components/Footer'

class BlogPost extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isMenuVisible: false,
			isPanelVisible: false,
		}
		this.handleToggleMenu = this.handleToggleMenu.bind(this);
		this.handleGotoPage = this.handleGotoPage.bind(this);
	}
	
	componentDidMount () {
		setTimeout(() => {
			this.setState({isPanelVisible: true});
		}, 125);
		
		if(window.history.state && typeof window.history.state.blurred !== 'undefined') {
			this.setState({blurred: window.history.state.blurred});
		}
		else {
			this.setState({loading: 'loaded'});
			this.timeoutId = setTimeout(() => {
				this.setState({blurred: 'blurred'});
			}, 325);
		}
		
		const fonts = this.props.data.allThirdPartyFonts.edges.map(edge => `${edge.node.family}:${edge.node.variants}`);
		WebFont.load({
			google: {
				families: fonts,
			},
		});
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
			isPanelVisible: false
		})
		
		setTimeout(() => {
			navigate(page, {
				state: {
				}
			})
		}, 125)
	}
	
	render() {
		const post = this.props.data.thirdPartyPosts
		const prefs = this.props.data.allThirdPartyPreferences.edges[0]
		
		const { next, prev } = this.props.pageContext
   		const meta_title = striptags(post.news_group_name)+' | '+striptags(post.title)

		return <>
            <Helmet
                title={meta_title}
                meta={[
                    { name: 'description', content: post.excerpt },
                    { property: 'og:type', content: 'article' },
                    { property: 'article:publisher', content: prefs.node.site_url },
                    { property: 'og:site_name', content: prefs.node.site_name },
                    { property: 'og:title', content: meta_title },
                    { property: 'og:url', content: prefs.node.site_url+'/'+post.slug},
                    { property: 'og:image', content: prefs.node.site_url+post.image_1_local?.childImageSharp.gatsbyImageData.src},
                    { property: 'og:description', content: post.excerpt },
                ]}>
                <html lang="en" />
            </Helmet>
            <div id="page" className={`body blurred ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <div id="wrapper">
                    <div id="main" style={{display:'flex'}}>
                        <article className={`active ${this.state.isPanelVisible ? 'timeout' : ''}`} style={{display:'none'}}>
                            <section>
                                <div className="col">
                                    <span className="image hero"><GatsbyImage image={post.image_1_local?.childImageSharp?.gatsbyImageData} /></span>
                                </div>
                            </section>
                            <section>
                                <div className="pagination-bar top">
                                    {prev?.slug && (<Link to={'/'+prev.slug} state={{blurred: 'blurred'}} className="previous" alt={"Previous Post: "+prev.title} title={"Previous Post: "+prev.title}>Previous</Link>)}
                                    <Link to={`/${post.slug.split("/")[0]}/`} className="home" alt={post.news_group_name} title={post.news_group_name}>{post.news_group_name}</Link>
                                    {next?.slug && (<Link to={'/'+next.slug} state={{blurred: 'blurred'}} className="next" alt={"Next Post: "+next.title} title={"Next Post: "+next.title}>Next</Link>)}
                                </div>
                                <h1 className="align-center">{post.title}</h1>
                                <span className="date-line"><i className="fa fa-calendar"></i>{post.date}</span>
                                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                                <div className="pagination-bar bottom">
                                    {prev?.slug && (<Link to={'/'+prev.slug} state={{blurred: 'blurred'}} className="previous" alt={"Previous Post: "+prev.title} title={"Previous Post: "+prev.title}>Previous</Link>)}
                                    <Link to={`/${post.slug.split("/")[0]}/`} className="home" alt={post.news_group_name} title={post.news_group_name}>{post.news_group_name}</Link>
                                    {next?.slug && (<Link to={'/'+next.slug} state={{blurred: 'blurred'}} className="next" alt={"Next Post: "+next.title} title={"Next Post: "+next.title}>Next</Link>)}
                                </div>
                            </section>
                        </article>
                    </div>
                    <Footer/>
                </div>
                <div id="bg"></div>
                <Menu onToggleMenu={this.handleToggleMenu} location={this.props.location} />
            </div>
        </>;
	}
}

export default BlogPost;

export const query = graphql`query postQuery($slug: String!) {
  thirdPartyPosts(slug: {eq: $slug}) {
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
			gatsbyImageData(
			  placeholder: BLURRED
			  quality: 70 # 50 by default
			)
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
        site_url
      }
    }
  }
  allThirdPartyFonts {
    edges {
      node {
        family
        variants
      }
    }
  }
}`