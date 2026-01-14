import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const isExternalLink = (url) => {
  if (!url || typeof url !== "string") return false;
  return /^(https?:)?\/\//i.test(url); // https:// or //example.com
};

class QuickImageComponent extends React.Component {
  render() {
    const { data, params } = this.props;
    const link = data.image_1_link;

    const image = (
      <GatsbyImage
        image={data.image_1_local?.childImageSharp?.gatsbyImageData}
        alt={data.image_1_alt || ""} title={data.image_1_alt || ""}
      />
    );

    const wrappedImage = link ? (
      isExternalLink(link) ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {image}
        </a>
      ) : (
        <Link to={link}>
          {image}
        </Link>
      )
    ) : (
      image
    );

    return (
      <div
        className={`cell ${
          params.lg_width.value ? params.lg_width.value + "u(xlarge) " : "12u"
        } ${params.md_width.value ? params.md_width.value + "u(large) " : ""} ${
          params.sm_width.value ? params.sm_width.value + "u(small) " : ""
        } ${params.xs_width.value ? params.xs_width.value + "u(xsmall) " : ""}`}
      >
        <span className={`image ${params.custom_class.value || ""}`}>
          {wrappedImage}
        </span>
      </div>
    );
  }
}

QuickImageComponent.propTypes = {
	params: PropTypes.object,
	data: PropTypes.object,
}

export default QuickImageComponent