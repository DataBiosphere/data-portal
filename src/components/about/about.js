/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal about component.
 */

// Core dependencies
import compStyles from './about.module.css'
import React from 'react';

class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={compStyles.hcaAbout}>
                <h4>{this.props.subTitle}</h4>
                <div className={compStyles.contentFlex}>
                    {this.props.linked.map((link, i) => <div key={i}
                                                             dangerouslySetInnerHTML={{__html: link.childMarkdownRemark.html}}/>)}
                </div>
            </div>
        );
    }
}

export default About;
