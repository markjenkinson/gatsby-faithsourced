import React from 'react'
import PropTypes from 'prop-types'
import { Parallax, Background } from 'react-parallax'

import TextBlockComponent from '../components/TextBlockComponent'
import TeaserComponent from '../components/TeaserComponent'
import QuickImageComponent from '../components/QuickImageComponent'
import FormComponent from '../components/FormComponent'
import MultimediaComponent from '../components/MultimediaComponent'
import MultimediaGroupComponent from '../components/MultimediaGroupComponent'
import SliderComponent from '../components/SliderComponent'

class Section extends React.Component {
    render() {
        const { params, components = [], onCloseArticle} = this.props;

        const componentMap = {
            text_block_bootstrapped: TextBlockComponent,
            teaser_text_bootstrapped: TeaserComponent,
            quick_image_bootstrapped: QuickImageComponent,
            form_bootstrapped: FormComponent,
            multimedia_file: MultimediaComponent,
            multimedia_group: MultimediaGroupComponent,
            gallery_bootstrapped: SliderComponent
        };

        const Component = params.parallax_bg === '1' ? Parallax : React.Fragment;

        return (
            <Component
                bgImage={params.parallax_bg === '1' ? params.image_1_local.publicURL : ""}
                strength={params.parallax_bg === '1' ? "-200" : 0}
                blur={params.parallax_bg === '1' ? { min: -15, max: 15 } : null}
                className={params.parallax_bg === '1' ? "parallax-section" : ""}
            >
                <section id={`section-${params.anchor_id}`} 
                	className={`${params.custom_class && params.image_1_dummy === false ? params.custom_class+' ':params.custom_class}${params.image_1_dummy === false ? 'backgrounded' : ''}`} 
                	style={{backgroundImage: params.parallax_bg === '0' && params.image_1_dummy === false ? 'url('+params.image_1_local?.publicURL+')' : 'none', backgroundSize: 'cover'}}
                >
					<div className='row'>
						{components.map(({ component: { component_type }, options, object }) => {
							const Component = componentMap[component_type];
							return Component ? <Component params={options} data={object} onCloseArticle={onCloseArticle} /> : null;
						})}
					</div>
                </section>
            </Component>
        );
    }
}


Section.propTypes = {
	params: PropTypes.object,
	components: PropTypes.object,
}

export default Section
