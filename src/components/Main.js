import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from "gatsby-link";

import logo_explained from '../images/faithsourced-logo-explained.png'

import icon_fullstackfaith from '../images/icon-fullstackfaith.png'
import icon_mentorship from '../images/icon-mentorship.png'
import icon_faithhacking from '../images/icon-faithhacking.png'
import icon_resourced from '../images/icon-resourced.png'
import icon_faithsites from '../images/icon-faithsites.png'
import icon_founderchurch from '../images/icon-founderchurch.png'

import banner_fullstackfaith from '../images/banner-fullstackfaith.jpg'
import banner_iterativefaith from '../images/banner-iterativefaith.jpg'
import banner_faithhacking from '../images/banner-faithhacking.jpg'
import banner_resourced from '../images/banner-resourced.jpg'
import banner_faithsites from '../images/banner-faithsites.jpg'
import banner_founderchurch from '../images/banner-founderchurch.jpg'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class Main extends React.Component {
	  constructor(props) {
		super(props);
		this.state = {};
	  }
	  
	  handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	  };

	  handleSubmit = e => {
		e.preventDefault();
		const form = e.target;
		fetch("/", {
		  method: "POST",
		  headers: { "Content-Type": "application/x-www-form-urlencoded" },
		  body: encode({
			"form-name": form.getAttribute("name"),
			...this.state
		  })
		})
		  .then(() => navigateTo(form.getAttribute("action")))
		  .catch(error => alert(error));
	  };
	
	render() {
		let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>

		return (
			<div ref={this.props.setWrapperRef} id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

				<article id="about" className={`${this.props.article === 'about' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<h2 className="major">About Us</h2>
				<p>Faith Sourced is a community of software developers using our skills for Jesus. We call it &ldquo;Software as a Service&rdquo; where Christ is the center of all we are and do.</p>
				<span className="image main"><img src={logo_explained} alt="Faith Sourced logo explained" /></span>
				<p>Our collective <span className="font-custom">faith</span> in Christ compells both our crowd-sourced and open-sourced contributions, hence the name Faith Sourced. This is software by the church, for the church.</p>
			<p>But this isn&rsquo;t just for developers. Professionals from across the digital spectrum are part of our community driven projects, including those in strategy, project management, design, development, infrastructure, support and communications. The Faith Sourced project is a platform for coordinating this collective expertise.</p>
			<p>Each participant in the Faith Sourced project has seen what we can do as individuals, with all its limitations. We&rsquo;ve witnessed the duplication of effort at church after church, when we each try to accomplish the same goal, from our independent silos. The Faith Sourced project brings us together, with a common purpose, and a strength in numbers.</p>
			<p>Faith Sourced is our contribution to the cause of Christ, and His church. Faith Sourced is our chance to use our uniquely technical skills for purposes that are eternal, united under one banner: the gospel of Jesus Christ. The software we build is freely available to the body of Christ, for His glory.</p>
			{close}
				</article>

				<article id="faith" className={`${this.props.article === 'faith' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<h2 className="major">The Qualities of Our <span className="font-custom">Faith</span></h2>
			<p>The <span className="font-custom">faith</span> that fuels our contributions to Faith Sourced project has the following qualities :</p>
			<ol>
			<li><b>Gospel <span className="font-custom">Faith</span></b> - an unshakable conviction that Christ is the centre of all we are and all we do. His death on the cross is where we exchange our sins for his perfection. His resurrection from the grave certifies his perfection and validates that our sins have been paid for in their entirety. He is glorified as we build software to share this good news with the world.</li>
			<li><b>Dependent <span className="font-custom">Faith</span></b> - a resolve to wholeheartedly depend on God for anything of lasting value to flow from this project, as He is the source, object and hope of our Faith.</li>
			<li><b>Traditional <span className="font-custom">Faith</span></b> - a recognition that technology does not replace people. Our Faith is not in technology. God has chosen people to be agents of the Gospel. To that end, we do not propose or build solutions that reduce human agency. Our goal is to facilitate more human engagement that is better organized with greater efficiency. Our goal is not clicks, page views, or bounce rates.</li>
			<li><b>Edifying <span className="font-custom">Faith</span></b> -&nbsp; a commitment to discipleship/mentorship within the community for the growth and maturity of our Faith.</li>
			<li><b>Encouraging <span className="font-custom">Faith</span></b> - an attitude to strengthening one another in our Faith, as we work, have meetings, and gather for events, meetups and conferences.</li>
			<li><b>Practical <span className="font-custom">Faith</span></b> - an opportunity to make meaningful contributions of our time and technical expertise in ways that otherwise would remain solely in the secular domain.</li>
			<li><b>Collaborative <span className="font-custom">Faith</span></b> - the pursuit of a distributed effort that depends on manageable contributions from the many instead of unsustainable contributions from the few.</li>
			<li><b>Generous <span className="font-custom">Faith</span></b> - a heart to share the fruits of our labour so that as many churches as possible can benefit. This includes shared expertise, shared best practices, shared code, shard bug fixes, shared support resources. There is no room for the &ldquo;keep this to ourselves&rdquo; practice that occurs when churches are independent silos on these matters.</li>
			<li><b>Efficient <span className="font-custom">Faith</span></b> - the recognition that projects/tasks must be strategically well defined and clear in order to be conducive to individual contribution and large scale collaboration.</li>
			<li><b>Gracious <span className="font-custom">Faith</span></b>&nbsp; - Our collective aknowledgement that&nbsp;we are all at different levels of our expertise and Faith, so there is&nbsp;no room for pride or arrogance. A commitment to gracious faith has a positive impact on: receiving and giving feedback; reviewing proposals; offering suggestions; responding helpfully and in a timely manner; growing others and serving diligently.</li>
		</ol>
			{close}
				</article>

				<article id="fullstackfaith" className={`${this.props.article === 'fullstackfaith' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<div className="logo"><img src={icon_fullstackfaith} alt="" /></div>
			<span className="banner image"><img src={banner_fullstackfaith} alt="" /></span>
			<h2 className="major">Full Stack <span className="font-custom">Faith</span> Meetups</h2>
			<p>The term "full stack" is used to describe the well rounded developer. Full Stack <span className="font-custom">faith</span> is a <strong>FREE</strong> monthly meetup where faith lessons + developer talk + pancakes = growth that is personal,	professional,	practical and delicious.</p>
			<p>Full Stack <span className="font-custom">faith</span> is a community to <strong>GROW</strong> together, being well rounded in both our faith and professional development.</p>
			<a href="https://www.facebook.com/events/545554882518122/" target="_blank" className="button right">RSVP to Attend</a>
			<p>Join us <strong>Sunday, June 9th at 7pm </strong> for&nbsp;:</p>
			<ol>
				<li>developer tutorials</li>
				<li>technology discussions</li>
				<li>Faith Sourced project planning</li>
				<li>personal testimonies</li>
				<li>the study of God's Word</li>
				<li>a stack or two of pancakes!</li>
			</ol>
			<p>The Faith Sourced project is an initiative so ambitious we could worry there are not enough pancakes in the world. Thankfully our <span className="font-custom">faith</span> is not in pancakes.</p>
			{close}
				</article>
				
				<article id="mentorship" className={`${this.props.article === 'mentorship' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<div className="logo"><img src={icon_mentorship} alt="" /></div>
			<span className="banner image"><img src={banner_iterativefaith} alt="" /></span>
			<h2 className="major">Iterative <span className="font-custom">Faith</span> Mentorship</h2>
			<p>Iterative development is a practical approach to software authoring where the planning and implementation consists of many small iterations.</p>
			<p>Iterative <span className="font-custom">Faith</span> Mentorship is a practical life and career development process of small changes, based on God's word and the guidance of experienced professionals. Each iteration cycle includes accountability, reflection, evaluation and decisive action.</p>
			<p>Typical mentorship programs cater to career or faith based objectives exclusively. We are convinced that the two can not be understood in isolation.</p>
			<p>Iterative <span className="font-custom">Faith</span> Mentorship connects career professionals with students and juniors pursuing a career in the digital space, with a distinct focus on relevant faith based conversations, including :</p>
			<ol>
				<li>work/life balance</li>
				<li>faith/career integration</li>
				<li>moral/ethical challenges</li>
				<li>Christian/developer disciplines</li>
			</ol>
			<hr />
			<h3>More Info</h3>
			<form name="mentorship-moreinfo" method="POST" action="/thanks/" data-netlify="true" onSubmit={this.handleSubmit}>
				<input type="hidden" name="form-name" value="mentorship-moreinfo" />
				<div className="field first">
					<label htmlFor="type">I have questions about&hellip;</label>
					<div className="select-wrapper">
						<select name="type" id="type" onChange={this.handleChange}>
							<option value="">Choose one&hellip;</option>
							<option value="mentoring">becoming an Iterative Faith Mentor</option>
							<option value="mentored">being mentored in the Iterative Faith Mentorship program</option>
							<option value="contributing">contributing to the Iterative Faith Mentorship program</option>
							<option value="other">other</option>
						</select>
					</div>
				</div>
				<div className="field half first">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" onChange={this.handleChange} />
				</div>
				<div className="field half first">
					<label htmlFor="age">Age</label>
					<div className="select-wrapper">
						<select name="age" id="age" onChange={this.handleChange}>
							<option value="">Choose one&hellip;</option>
							<option value="younger">&lt;18</option>
							<option value="18-25">18-25</option>
							<option value="18-25">26-35</option>
							<option value="18-25">36-45</option>
							<option value="18-25">46-55</option>
							<option value="18-25">56-65</option>
							<option value="older">&gt;65</option>
						</select>
					</div>
				</div>
				<div className="field half">
					<label htmlFor="gender">Gender</label>
					<div className="select-wrapper">
						<select name="gender" id="gender" onChange={this.handleChange}>
							<option value="">Choose one&hellip;</option>
							<option value="female">Female</option>
							<option value="male">Male</option>
						</select>
					</div>
				</div>
				<div className="field">
					<label htmlFor="message">Message</label>
					<textarea name="message" id="message" rows="4" onChange={this.handleChange} />
				</div>
				<ul className="actions">
					<li><input type="reset" value="Cancel" onClick={() => {this.props.onCloseArticle()}} /></li>
					<li><input type="submit" value="Send Message" className="special" /></li>
				</ul>
			</form>
			{close}
				</article>
				
				<article id="faithhacking" className={`${this.props.article === 'faithhacking' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<div className="logo"><img src={icon_faithhacking} alt="" /></div>
			<span className="banner image"><img src={banner_faithhacking} alt="" /></span>
			<h2 className="major"><span className="font-custom">Faith</span> Hacking Days</h2>
			<p>Hackathons bring developers and domain experts together for a period of hyper-focused software sprints resulting in rapid progress and milestone achievement.</p>
			<p><span className="font-custom">Faith</span> Hacking Days ensure that progress is not limited strictly to the codebase, but also to the personal growth and development of our faith. This means that code challenges are interspersed with devotional and life application challenges.</p>
			<a href="https://www.facebook.com/faithsourced/" target="_blank" className="button right">Join us on Facebook</a>
			<p>Join our Facebook page for announcements about our first <span className="font-custom">Faith</span> Hacking Day.</p>
			{close}
				</article>
				
				<article id="resourced" className={`${this.props.article === 'resourced' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<div className="logo"><img src={icon_resourced} alt="" /></div>
			<span className="banner image"><img src={banner_resourced} alt="" /></span>
			<h2 className="major">Re+Sourced Program</h2>
			<p>That place where <span className="font-custom">faith</span> and technology intersect is where many churches find themselves ill equipped and often misinformed. The Re+Sourced Program consists of seminars and downloadable resources for your church that tackle some of the most pressing issues facing churches today, including&nbsp;:</p>
			<ol>
				<li>online security and the church</li>
				<li>network security and the church</li>
				<li>digital privacy and the church</li>
				<li>social media and the church</li>
				<li>SEO and the church</li>
				<li>deplatforming and the church</li>
				<li>marketing automation and the church</li>
				<li>&hellip;and more!</li>
			</ol>
			<hr />
			<h3>More Info</h3>
			<form name="resourced-moreinfo" method="POST" action="/thanks/" data-netlify="true" onSubmit={this.handleSubmit}>
				<input type="hidden" name="form-name" value="resourced-moreinfo" />
				<div className="field first">
					<label htmlFor="type">I have questions about&hellip;</label>
					<div className="select-wrapper">
						<select name="type" id="type" onChange={this.handleChange}>
							<option value="">Choose one&hellip;</option>
							<option value="creating">creating resources for the Re+Sourced Program</option>
							<option value="receiving">registering my church to receive regular Re+Sourced Program updates and resources</option>
							<option value="other">other</option>
						</select>
					</div>
				</div>
				<div className="field half first">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" onChange={this.handleChange} />
				</div>
				<div className="field half first">
					<label htmlFor="church">Church Name</label>
					<input type="text" name="church" id="church" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="city">City</label>
					<input type="text" name="city" id="city" onChange={this.handleChange} />
				</div>
				<div className="field half first">
					<label htmlFor="state">State/Province</label>
					<input type="text" name="state" id="state" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="country">Country</label>
					<input type="text" name="country" id="country" onChange={this.handleChange} />
				</div>
				<div className="field">
					<label htmlFor="message">Message</label>
					<textarea name="message" id="message" rows="4" onChange={this.handleChange} />
				</div>
				<ul className="actions">
					<li><input type="reset" value="Cancel" onClick={() => {this.props.onCloseArticle()}} /></li>
					<li><input type="submit" value="Send Message" className="special" /></li>
				</ul>
			</form>
			{close}
				</article>
				
				<article id="faithsites" className={`${this.props.article === 'faithsites' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<div className="logo"><img src={icon_faithsites} alt="" /></div>
			<span className="banner image"><img src={banner_faithsites} alt="" /></span>
			<h2 className="major"><span className="font-custom">Faith</span> Sites Program</h2>
			<h3>Rethinking the Church website</h3>
			<p>Church websites have not changed much over the years. They all say the same thing. They all do the same thing. They are even starting to look the same. But no one has asked if they are saying or doing the right things. It's time to rethink the church website.</p>
			<p>So we did.</p>
			<p>We started with Scripture and came up with features that reflect the core values of the <span className="font-custom">faith</span>. We call it "Scripture driven Software". Imagine what that looks like.</p>
			<p>We did, and that's <strong>WHY</strong> we are giving it away for <strong>FREE</strong>.</p>
			<h3>Rethinking How a Church website is built</h3>
			<p>Scriptural principles also got us thinking about <strong>HOW</strong> church websites are built.</p>
			<p>Currently, every church is on their own, cobbling together various pieces, pulling from different places to assemble the same thing. A plug-in here. A template there. Some plug-ins and templates are better than others. Results may vary.</p>
			<p>For all this duplication of effort, what one church does, has no benefit to other churches. What if the Christian community got together and invested in something that every church could benefit from? Imagine how this could advance the Gospel.</p>
			<p>We did, and that's <strong>HOW</strong> we are giving it away for <strong>FREE</strong>.</p>
			<h3>A Common Platform</h3>
			<p><span className="font-custom">Faith</span> Sites share a common platform built with the expertise of many faithful developers, with years of experience and best practices under our belts. The expertise is shared readily on the conviction that as independent silos we can do decent work for one local church, but together we can do amazing work for all churches, at a fraction of the individual effort. Essentially, we are all done with being independent silos.</p>
			<h3>Long Term Support</h3>
			<p>Similarly, <span className="font-custom">Faith</span> Sites are maintained and supported by the Faith Sourced community, consisting of designers, developers, engineers, maintainers, bug fixers, tech supporters, documentation writers, screencast producers, promoters, marketers, and technology evangelists of <span className="font-custom">faith</span>.</p>
			<h3>Micro-Contributions</h3>
			<p>For a couple of hours a month, each contributor commits his or her "expertise tithe" to the project. In isolation, these contributions won't go far, but in parallel with hundreds of others, the platform propels forward, churches find a helpful and timely response to support questions, and bug fixes quickly benefit everyone.</p>
			<h3>Decentralized &amp; Dependable</h3>
			<p>The platform is owned by the church, but not any one specific church. The community is driven by its people, but not any one specific person. Because of this <span className="font-custom">Faith</span> Sites are built, maintained and supported without the constraints of profit margins, shareholders, or other economic forces.  This ensures the software will outlive the for-profit church platforms, some of which have already folded leaving many churches high and dry and having to rebuild again.</p>
			
			<hr />
			<h3>More Info</h3>
			<form name="faithsites-moreinfo" method="POST" action="/thanks/" data-netlify="true" onSubmit={this.handleSubmit}>
				<input type="hidden" name="form-name" value="faithsites-moreinfo" />
				<div className="field first">
					<label htmlFor="type">I have questions about&hellip;</label>
					<div className="select-wrapper">
						<select name="type" id="type" onChange={this.handleChange}>
							<option value="">Choose one&hellip;</option>
							<option value="contribute-designer">contributing as a designer (UI/UX)</option>
							<option value="contribute-graphicartist">contributing as a graphic artist</option>
							<option value="contribute-developer">contributing as a developer</option>
							<option value="contribute-engineer">contributing as a software engineer</option>
							<option value="contribute-dba">contributing as a database expert</option>
							<option value="contribute-writer">contributing as a documentation writer</option>
							<option value="contribute-techsupport">contributing as a tech support agent</option>
							<option value="contribute-screencast">contributing as a screencast producer</option>
							<option value="contribute-communications">contributing as a communications expert</option>
							<option value="contribute-techevangelist">contributing as a tech evangelist</option>
							<option value="contribute-translator">contributing as a translator (localization)</option>
							<option value="faithsite">getting my church a Faith Site</option>
							<option value="other">other</option>
						</select>
					</div>
				</div>
				<div className="field half first">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" onChange={this.handleChange} />
				</div>
				<div className="field half first">
					<label htmlFor="church">Church Name</label>
					<input type="text" name="church" id="church" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="city">City</label>
					<input type="text" name="city" id="city" onChange={this.handleChange} />
				</div>
				<div className="field half first">
					<label htmlFor="state">State/Province</label>
					<input type="text" name="state" id="state" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="country">Country</label>
					<input type="text" name="country" id="country" onChange={this.handleChange} />
				</div>
				<div className="field">
					<label htmlFor="message">Message</label>
					<textarea name="message" id="message" rows="4" onChange={this.handleChange} />
				</div>
				<ul className="actions">
					<li><input type="reset" value="Cancel" onClick={() => {this.props.onCloseArticle()}} /></li>
					<li><input type="submit" value="Send Message" className="special" /></li>
				</ul>
			</form>
			{close}
				</article>
				
				<article id="founderchurch" className={`${this.props.article === 'founderchurch' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<div className="logo"><img src={icon_founderchurch} alt="" /></div>
			<span className="banner image"><img src={banner_founderchurch} alt="" /></span>
			<h2 className="major">Founder Church Program</h2>
			<p>Founder Churches are those of <span className="font-custom">faith</span> that catch the vision and join the project.</p>
			<p>Founder Churches participate by :</p>
			<ul>
				<li>sending delegates to Faith Sourced meetups and events;</li>
				<li>nominate church members for Faith Sourced team/board roles;</li>
				<li>contribute financially to the Faith Sourced Project.</li>
			</ul>
			<p>Each Founder Church acknowledges that there is no competition between churches, and so they share the Faith Sourced platform and its technological resources joyfully.</p>
			<p>Each Founder Church recognizes that their contributions multiply to bless many churches, in every part of the world, many of whom do not have the same resources or manpower, but serve the same King.</p>
			<hr />
			<h3>Nominate Your Church</h3>
			<p>For more information about becoming a Founder Church, please proivde the following&nbsp;:</p>
			<form name="founderchurch-nomination" method="POST" action="/thanks/" data-netlify="true" onSubmit={this.handleSubmit}>
				<input type="hidden" name="form-name" value="founderchurch-nomination" />
				<div className="field half first">
					<label htmlFor="name">Your Name</label>
					<input type="text" name="name" id="name" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" onChange={this.handleChange} />
				</div>
				<div className="field">
					<label htmlFor="church">Church Name</label>
					<input type="text" name="church" id="church" onChange={this.handleChange} />
				</div>
				<div className="field half first">
					<label htmlFor="pastor">Pastor Name</label>
					<input type="text" name="pastor" id="pastor" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="city">City</label>
					<input type="text" name="city" id="city" onChange={this.handleChange} />
				</div>
				<div className="field half first">
					<label htmlFor="state">State/Province</label>
					<input type="text" name="state" id="state" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="country">Country</label>
					<input type="text" name="country" id="country" onChange={this.handleChange} />
				</div>
				<div className="field">
					<label htmlFor="message">Message</label>
					<textarea name="message" id="message" rows="4" onChange={this.handleChange} />
				</div>
				<ul className="actions">
					<li><input type="reset" value="Cancel" onClick={() => {this.props.onCloseArticle()}} /></li>
					<li><input type="submit" value="Send Message" className="special" /></li>
				</ul>
			</form>
			{close}
				</article>

				<article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
			<h2 className="major">Contact</h2>
			<p>For all inquiries, including questions about how <strong>you</strong> or <strong>your church</strong> can participate in the Faith Sourced project, please provide the following&nbsp;:</p>
			<form name="contact" method="POST" action="/thanks/" data-netlify="true" onSubmit={this.handleSubmit}>
				<input type="hidden" name="form-name" value="contact" />
				<div className="field half first">
					<label htmlFor="name">Name</label>
					<input type="text" name="name" id="name" onChange={this.handleChange} />
				</div>
				<div className="field half">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" onChange={this.handleChange} />
				</div>
				<div className="field">
					<label htmlFor="type">Inquiry Type</label>
					<div className="select-wrapper">
						<select name="type" id="type" onChange={this.handleChange}>
							<option value="">Choose one&hellip;</option>
							<option value="join">I would like to join Faith Sourced</option>
							<option value="contribute">I would like to contribute to Faith Sourced</option>
							<option value="fullstackfaith">I would like to have Full Stack Faith meetups in my area</option>
							<option value="meeting">I would like to schedule a meeting with a Faith Sourced representative</option>
							<option value="more">I would like more information about Faith Sourced</option>
							<option value="other">other</option>
						</select>
					</div>
				</div>
				<div className="field">
					<label htmlFor="message">Message</label>
					<textarea name="message" id="message" rows="4" onChange={this.handleChange} />
				</div>
				<ul className="actions">
					<li><input type="reset" value="Cancel" onClick={() => {this.props.onCloseArticle()}} /></li>
					<li><input type="submit" value="Send Message" className="special" /></li>
				</ul>
			</form>
			<ul className="icons">
				<li><a href="https://twitter.com/faithsourced" target="_blank" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
				<li><a href="https://facebook.com/faithsourced" target="_blank" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
				<li><a href="https://www.youtube.com/channel/UCjN3B-FahTVt2qqc8mMkntQ" target="_blank" className="icon fa-youtube"><span className="label">YouTube</span></a></li>
				<li><a href="https://instagram.com/faithsourced" target="_blank" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
				<li><a href="https://github.com/faithsourced" target="_blank" className="icon fa-github"><span className="label">GitHub</span></a></li>
			</ul>
			{close}
				</article>
			</div>
		)
	}
}

Main.propTypes = {
	route: PropTypes.object,
	article: PropTypes.string,
	articleTimeout: PropTypes.bool,
	onCloseArticle: PropTypes.func,
	timeout: PropTypes.bool,
	setWrapperRef: PropTypes.func.isRequired,
}

export default Main