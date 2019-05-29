import React from 'react'
import PropTypes from 'prop-types'

import icon_fullstackfaith from '../images/icon-fullstackfaith.png'
import icon_mentorship from '../images/icon-mentorship.png'
import icon_faithhacking from '../images/icon-faithhacking.png'
import icon_resourced from '../images/icon-resourced.png'
import icon_faithsites from '../images/icon-faithsites.png'
import icon_founderchurch from '../images/icon-founderchurch.png'

const Home = (props) => (
	<section id="teasers" className="tiles">
		<article>
			<div className="ribbon ribbon-top-right"><div><span><a href="https://www.facebook.com/events/545554882518122/" target="_blank">Next Meetup<br /><strong>Sunday <span className="font-custom">t</span> June 9</strong></a></span></div></div>
			<header className="major">
				<span className="image"><img src={icon_fullstackfaith} alt="" /></span>
				<h3>Full Stack <span className="font-custom">Faith</span><br />Meetups</h3>
				<p>A community to <strong>GROW</strong> together, being well rounded in both our <span className="font-custom">faith</span> and professional development.</p>
			</header>
			<a className="link primary" href="javascript:;" onClick={() => {props.onOpenArticle('fullstackfaith')}}></a>
		</article>
		<article>
			<header className="major">
				<span className="image"><img src={icon_mentorship} alt="" /></span>
				<h3>Iterative <span className="font-custom">Faith</span><br />Mentorship</h3>
				<p>A mentorship program that <strong>GUIDES</strong> the next generation in both their <span className="font-custom">faith</span> and professional development.</p>
			</header>
			<a className="link primary" href="javascript:;" onClick={() => {props.onOpenArticle('mentorship')}}></a>
		</article>
		<article>
			<header className="major">
				<span className="image"><img src={icon_faithhacking} alt="" /></span>
				<h3><span className="font-custom">Faith</span> Hacking<br />Days</h3>
				<p>Full day events filled with <strong>HYPER-FOCUSED</strong> software and spiritual development.</p>
			</header>
			<a className="link primary" href="javascript:;" onClick={() => {props.onOpenArticle('faithhacking')}}></a>
		</article>
		<article>
			<header className="major">
				<span className="image"><img src={icon_resourced} alt="" /></span>
				<h3>Re+sourced<br />Program</h3>
				<p>A toolkit to <strong>EQUIP</strong> churches in their understanding of and engagement in the digital realm.</p>
			</header>
			<a className="link primary" href="javascript:;" onClick={() => {props.onOpenArticle('resourced')}}></a>
		</article>
		<article>
			<header className="major">
				<span className="image"><img src={icon_faithsites} alt="" /></span>
				<h3><span className="font-custom">Faith</span> Sites<br />Program</h3>
				<p>Scripture driven software for a <strong>NEW</strong> way to think about church websites.</p>
			</header>
			<a className="link primary" href="javascript:;" onClick={() => {props.onOpenArticle('faithsites')}}></a>
		</article>
		<article>
			<header className="major">
				<span className="image"><img src={icon_founderchurch} alt="" /></span>
				<h3>Founder Church<br />Program</h3>
				<p>Faith Sourced projects are made possible by a generous <span className="font-custom">faith</span> flowing from churches like yours.</p>
			</header>
			<a className="link primary" href="javascript:;" onClick={() => {props.onOpenArticle('founderchurch')}}></a>
		</article>
	</section>
)

Home.propTypes = {
	onOpenArticle: PropTypes.func
}

export default Home
