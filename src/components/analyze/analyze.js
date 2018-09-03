/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal analyze component.
 */

// Core dependencies
import compStyles from './analyze.module.css'
import Link from 'gatsby-link';
import React from 'react';

class Analyze extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={compStyles.hcaAnalyze}>
                {this.props.linked.map((link, i) => <div className={compStyles.hcaAnalyzeList} key={i}>
                    <div>
                        <div dangerouslySetInnerHTML={{__html: link.childMarkdownRemark.html}}/>
                    </div>
                    <a href={link.childMarkdownRemark.frontmatter.githubUrl} target="_blank" className={compStyles.analyze}>View</a>
                </div>)}
            </div>
        );
    }
}

export default Analyze;
