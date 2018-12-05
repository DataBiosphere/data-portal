/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal analyze component.
 */

// Core dependencies
import React from 'react';

// Styles
import compStyles from './analyze.module.css'
import globalStyles from '../../styles/global.module.css';
let classNames = require('classnames');

class Analyze extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.linked.map((link, i) => <div className={compStyles.hcaAnalyzeList} key={i}>
                    <div>
                        <div dangerouslySetInnerHTML={{__html: link.childMarkdownRemark.html}}/></div>
                    <a href={link.childMarkdownRemark.frontmatter.githubUrl} target="_blank" className={classNames(globalStyles.button, globalStyles.outline, globalStyles.primary)}>View</a>
                </div>)}
            </div>
        );
    }
}

export default Analyze;
