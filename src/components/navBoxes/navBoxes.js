/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal nav boxes component.
 */

// Core dependencies
import compStyles from './navBoxes.module.css'
import Link from 'gatsby-link';
import React from 'react';
import * as siteMap from '../../siteMap';

const classNames = require('classnames');

class NavBoxes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={compStyles.hcaNavBoxes}>
                {this.props.linked.map((link, i) => <div className={compStyles.hcaNavBox} key={i}>
                    <h3>{link.childMarkdownRemark.frontmatter.title}</h3>
                    <p>{link.childMarkdownRemark.frontmatter.subTitle}</p>
                    <Link to={link.childMarkdownRemark.frontmatter.path}>Learn more</Link>
                    </div>
                )}
            </div>
        );
    }
}

export default NavBoxes;
