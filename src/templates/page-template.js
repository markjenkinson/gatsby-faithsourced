import React from 'react';
import Helmet from 'react-helmet'
import { Link, navigate, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";
import striptags from 'striptags'

import '../assets/scss/main.scss'

import Menu from '../components/Menu'
import Sections from '../components/Sections'
import Footer from '../components/Footer'

class JSONPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isPanelVisible: false,
			isMenuVisible: false,
			loading: '',
			timeout: false,
			articleTimeout: false,
			scrolly: 0
		}
		this.handleToggleMenu = this.handleToggleMenu.bind(this);
		this.handleGotoPage = this.handleGotoPage.bind(this);
		this.onCloseArticle = this.onCloseArticle.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isPanelVisible: true });

			if (window.history.state && window.history.state.scrolly) {
				this.setState({ scrolly: window.history.state.scrolly });
			}
		}, 125)
	}

	componentWillUnmount() {

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
					loading: '',
					isPanelVisible: true,
					scrolly: this.state.scrolly
				}
			})
		}, 125)
	}

	onCloseArticle() {
		this.setState({
			isPanelVisible: false
		})
		setTimeout(() => {
			navigate('/', {
				state: {
					loading: '',
					isPanelVisible: true,
					scrolly: this.state.scrolly
				}
			})
		}, 125)
	}

	render() {
		const page = this.props.data.thirdPartyPages
		const prefs = this.props.data.allThirdPartyPreferences.edges[0]
		const meta_title = striptags(prefs.node.site_title) + ' | ' + striptags(page.title)
		let close = <Link to="/" className="close" onClick={(e) => { e.preventDefault(); this.handleGotoPage('/') }} alt="Close" title="Close"></Link>

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
            <div id="page" className={`body blurred ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <div id="wrapper">
                    <div id="main" style={{ display: 'flex' }}>
                        <article className={`active ${this.state.isPanelVisible ? 'timeout' : ''}`} style={{ display: 'none' }}>
                            {page.tile_icon_dummy === false &&
                                <div className="logo"><GatsbyImage image={page.tile_icon_local?.childImageSharp?.gatsbyImageData} /></div>
                            }
                            <Sections slug={page.slug} page={page} onCloseArticle={this.onCloseArticle} />
                            {close}
                        </article>
                    </div>
                    <Footer />
                </div>
                <div id="bg"></div>
                <Menu onToggleMenu={this.handleToggleMenu} location={this.props.location} />
            </div>
        </>;
	}
}

export default JSONPage;

export const PageQuery = graphql`query PageQuery($slug: String!) {
  thirdPartyPages(slug: {eq: $slug}) {
    name
    title
    slug
    excerpt
    keywords
    tile_icon_local {
      childImageSharp {
        gatsbyImageData(width: 128, layout: CONSTRAINED)
      }
    }
    sections {
	  section {
		alternative_id
		placement
		position
		name
		anchor_id
		custom_class
		contained
		padded
		parallax_bg
		image_1_dummy
		image_1_local {
		  childImageSharp {
			gatsbyImageData(layout: FULL_WIDTH)
		  }
		  publicURL
		}
	  }
	  components {
		component {
		  alternative_id
		  module
		  type
		  component_type
		  container_type
		  style
		  custom_class
		  reference
		  placement
		  position
		}
		options {
		  custom_class {
			value
		  }
		}
		object {
		  alternative_id
		  body
		  name
		  header_level
		  image_1_url
		  image_1_dummy
		  image_1_local {
			childImageSharp {
				gatsbyImageData(
				  placeholder: BLURRED
				  quality: 70 # 50 by default
				)
			}
			publicURL
		  }
		  file_name
		  embedded_video_id
		  custom_submit_button_text
		  thank_you_title
		  thank_you_text
		  alternative_fields {
			type
			options {
			  title
			  default_selection
			}
			default_value
			description
			required
			title
			namespace
		  }
		  photos {
			title
			description
			image_1_url
			image_1_dummy
			image_1_local {
			  childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
			  }
			  publicURL
			}
		  }
		}
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