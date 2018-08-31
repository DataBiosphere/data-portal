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
        console.log(this.props.linked);
    }

    render() {
        return (
            <div className={compStyles.hcaAnalyze}>
                {this.props.linked.map((link, i) => <div className={compStyles.hcaAnalyzeList} key={i}>
                    <div>
                        <h3>{link.childMarkdownRemark.frontmatter.title}</h3>
                        <p>{link.childMarkdownRemark.frontmatter.subTitle}</p>
                        {/*<p className={compStyles.xs}>Last update to GitHub: 2 days ago</p>*/}
                    </div>
                    <a href={link.childMarkdownRemark.frontmatter.githubUrl} target="_blank" className={compStyles.analyze}>View</a>
                </div>)}
            </div>
        );
    }
}

export default Analyze;
