import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        {props.title && props.glyph &&
            <div className="logo-glyph" alt={props.title}></div>
		}
        <div className="content">
            <div className="inner">
                {props.title && props.wordmark && 
                	<h1 className="logo-wordmark">{props.title}</h1>
                }
                {props.title && !props.wordmark && 
                	<h1>{props.title}</h1>
                }
                {props.slogan &&
                	<p className="tagline">{props.slogan}</p>
                }
            </div>
        </div>
        {props.onGotoPage &&
			<nav>
				<ul>
					<StaticQuery
						query={graphql`
							query PrimaryMenuQuery {
								allThirdPartyPages(filter: {nav_level: {eq: 1}, parent_id: {eq: 0}}) {
									edges {
										node {
											nav_level
											parent_id
											type
											name
											slug
											link_url
											link_target
											link_mode
											link_hash
										}
									}
								}
							}
						`}
						render={data => (
							data.allThirdPartyPages.edges.map(({ node }, i) => {
								if(node.type === 'link') {
									var target = '_parent';
									if(node.link_target === 1) {
										target = '_blank';
									}
									if(node.link_mode === 'internal') {
										if(node.link_hash) {
											return <li key={i}><a href="javascript:;" onClick={() => {props.onScrollTo(node.link_hash)}}>{node.name}</a></li>
										}
										else {
											return <li key={i}><a href={node.link_url} target={target}>{node.name}</a></li>
										}
									}
									else {
										return <li key={i}><a href={node.link_url} target={target}>{node.name}</a></li>
									}
								}
								else {
									return <li key={i}><Link to={`/${node.slug}`} onClick={(e) => {e.preventDefault();props.onGotoPage(node.slug)}}>{node.name}</Link></li>
								}
							})
						)}
					/>
				</ul>
			</nav>
        }
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
