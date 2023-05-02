import React from 'react'
import PropTypes from 'prop-types'

function encode(data) {
	return Object.keys(data)
		.map(key => {
			if(Array.isArray(data[key])) {
				return encodeURIComponent(key.replace('[]','')) + "=" + data[key].map(value => encodeURIComponent(value)).join(",%20");
			} else {
				return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
			}
		})
		.join("&");
}

class FormComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSubmitted: false,
		}
	}
	
	handleChange = e => {
		const { name, value, type, checked } = e.target;
		let newValue = type === 'checkbox' ? [...(this.state[name] || []), value] : value;
		if (type === 'checkbox') {
			if (!checked) {
				newValue = newValue.filter(item => item !== value);
			}
		}
		const updatedState = {
			[name]: newValue,
		};
		this.setState(updatedState);
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
		.then(() => this.setState({isSubmitted: true}))
		.catch(error => alert(error));
	};
	
	render() {
		return (
            <div className={`cell ${this.props.params.lg_width.value ? this.props.params.lg_width.value+'u(xlarge) ' : '12u'} ${this.props.params.md_width.value ? this.props.params.md_width.value+'u(large) ' : ''} ${this.props.params.sm_width.value ? this.props.params.sm_width.value+'u(small) ' : ''} ${this.props.params.xs_width.value ? this.props.params.xs_width.value+'u(xsmall) ' : ''}`}>
				<form method="POST" data-netlify="true" onSubmit={this.handleSubmit} name={this.props.data.name}>
					<div className={this.state.isSubmitted ? 'fadeOut' : 'fadeIn'}>
						<h2 className="major" dangerouslySetInnerHTML={{ __html: this.props.data.name}} />
						<input type="hidden" name="form-name" value={this.props.data.name} />
						<div className="form-fields">
						{this.props.data.alternative_fields && this.props.data.alternative_fields.map(( field ) => (
							<div className={`field ${field.type ? field.type : ''}`}>
							{field.type === "text_block" &&
								<div dangerouslySetInnerHTML={{ __html: field.title}} />
							}
					
							{field.type === "text" &&
								<>
								<label dangerouslySetInnerHTML={{ __html: field.title}} />
								<input type="text" name={field.namespace} id={field.namespace} onChange={this.handleChange} />
								</>
							}
					
							{field.type === "select" &&
								<>
								<label dangerouslySetInnerHTML={{ __html: field.title}} />
								<div class="select-wrapper">
									<select name={field.namespace} id={field.namespace} onChange={this.handleChange}>
										<option value="">Choose one&hellip;</option>
										{field.options && field.options.map(( option ) => (
											<option value={option.title} dangerouslySetInnerHTML={{ __html: option.title}} />
										))}
									</select>
								</div>
								</>
							}
							
							{field.type === "checkbox" && (
								<fieldset>
									<legend dangerouslySetInnerHTML={{ __html: field.title }} />
									{field.options && field.options.map((option, index) => (
										<div class="input-wrapper" key={index}>
											<label>
												<input
													type="checkbox"
													id={field.namespace+'_'+option.alternative_id}
													name={field.namespace+'[]'}
													value={option.title}
													onChange={this.handleChange}
												/>
												<span dangerouslySetInnerHTML={{ __html: option.title }} />
											</label>
										</div>
									))}
								</fieldset>
							)}

							{field.type === "radio" && (
								<fieldset>
									<legend dangerouslySetInnerHTML={{ __html: field.title }} />
									{field.options && field.options.map((option, index) => (
										<div class="input-wrapper" key={index}>
											<label>
												<input
													type="radio"
													id={field.namespace+'_'+option.alternative_id}
													name={field.namespace}
													value={option.title}
													onChange={this.handleChange}
												/>
												<span dangerouslySetInnerHTML={{ __html: option.title }} />
											</label>
										</div>
									))}
								</fieldset>
							)}

							{field.type === "textarea" &&
								<>
								<label dangerouslySetInnerHTML={{ __html: field.title}} />
								<textarea name={field.namespace} id={field.namespace} rows="4" onChange={this.handleChange} />
								</>
							}
							</div>
						))}
						</div>
						<ul class="actions">
							{this.props.onCloseArticle &&
								<li><input type="reset" value="Cancel" onClick={() => {this.props.onCloseArticle()}} /></li>
							}
							{!this.props.onCloseArticle &&
								<li><input type="reset" value="Cancel" /></li>
							}
							{this.props.data.custom_submit_button_text &&
								<li><input type="submit" value={this.props.data.custom_submit_button_text} class="special" /></li>
							}
							{!this.props.data.custom_submit_button_text &&
								<li><input type="submit" value="Submit" class="special" /></li>
							}
					
						</ul>
					</div>
					<div className={!this.state.isSubmitted ? 'fadeOut' : 'fadeIn'}>
						{this.props.data.thank_you_title &&
							<h2 className="major" dangerouslySetInnerHTML={{ __html: this.props.data.thank_you_title}} />
						}
						{this.props.data.thank_you_title &&
							<div dangerouslySetInnerHTML={{ __html: this.props.data.thank_you_text}} />
						}
					</div>
				</form>
			</div>
		)
	}
}

FormComponent.propTypes = {
	data: PropTypes.object,
}

export default FormComponent