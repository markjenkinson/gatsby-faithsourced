import React from 'react';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby'

function BlogPost(props) {
    const post = props.data.markdownRemark;
    const { title,date } = post.frontmatter;

    return (
        <Layout location={props.location}>
            <div>
                <h1 className="align-center">{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <p  className="align-center"><Link to="/">Back</Link></p>
            </div>
        </Layout>
    )
}


export default BlogPost;

export const query = graphql`
query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        excerpt
        frontmatter {
            date(formatString: "MMMM D, YYYY [at] h:mm A")
            title
        }
    }
}`
