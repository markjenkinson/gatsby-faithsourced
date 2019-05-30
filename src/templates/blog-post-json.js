import React from 'react';
import Layout from '../components/layout-blog';
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"

function BlogPost(props) {
	const post = props.data.thirdPartyPosts
	const { next, prev } = props.pageContext
   
	return (
		<>
			<Helmet
				title={'<+blog> '+post.title}
				meta={[
					{ name: 'description', content: post.excerpt },
					{ property: 'og:type', content: 'article' },
					{ property: 'article:author', content: 'https://faithsourced.com' },
					{ property: 'article:publisher', content: 'https://faithsourced.com' },
					{ property: 'og:site_name', content: 'Faith Sourced Software Foundation' },
					{ property: 'og:title', content: '<+blog> '+post.title },
					{ property: 'og:url', content: 'https://faithsourced.com/'+post.slug},
					{ property: 'og:image', content: 'https://faithsourced.com'+post.image_1_local.childImageSharp.fluid.src},
					{ property: 'og:description', content: post.excerpt },
				]}>
				<html lang="en" />
			</Helmet>
			<Layout location={props.location}>
				<div>
					<span className="banner image"><Img fluid={post.image_1_local.childImageSharp.fluid} /></span>
					<div className="pagination-bar top">
						{prev && (<Link to={prev.slug} className="previous" alt={"Previous Post: "+prev.title} title={"Previous Post: "+prev.title}>Previous</Link>)}
						<Link to="/" className="home" alt="Home" title="Home">Home</Link>
						{next && (<Link to={next.slug} className="next" alt={"Next Post: "+next.title} title={"Next Post: "+next.title}>Next</Link>)}
					</div>
					<h1 className="align-center">{post.title}</h1>
					<span className="date-line"><i className="fa fa-calendar"></i>{post.date}</span>
					<div dangerouslySetInnerHTML={{ __html: post.html }} />
					<div className="pagination-bar bottom">
						{prev && (<Link to={prev.slug} className="previous" alt={"Previous Post: "+prev.title} title={"Previous Post: "+prev.title}>Previous</Link>)}
						<Link to="/" className="home" alt="Home" title="Home">Home</Link>
						{next && (<Link to={next.slug} className="next" alt={"Next Post: "+next.title} title={"Next Post: "+next.title}>Next</Link>)}
					</div>
				</div>
			</Layout>
    	</>
    )
}


export default BlogPost;

export const query = graphql`
query JSONPostQuery($slug: String!) {
    thirdPartyPosts( slug: { eq: $slug }) {
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
}`