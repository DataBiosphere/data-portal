/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal nav overview component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// Styles
import compStyles from './navOverview.module.css'

class NavOverview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={compStyles.hcaNavOverview}>
                {this.props.linked.map((link, i) => <div className={compStyles.hcaNavInfo} key={i}>
                    <h3>{link.childMarkdownRemark.frontmatter.title}</h3>
                    <p>{link.childMarkdownRemark.frontmatter.subTitle}</p>
                    <Link to={link.childMarkdownRemark.frontmatter.path}>Learn more</Link>
                    </div>
                )}
            </div>
        );
    }
}

export default NavOverview;
