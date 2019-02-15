/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal analysis detail component.
 */

// Core dependencies
import React from 'react';

// Styles
import compStyles from './analysisDetail.module.css'
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

let classNames = require('classnames');

class AnalysisDetail extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.data.frontmatter);
    }

    render() {
        return (
            <div>
                <div className={compStyles.hcaAnalyzeDetail}>
                    <div>
                        <div>
                            <h2>{this.props.data.frontmatter.title}</h2>
                            <p className={classNames(fontStyles.xs, compStyles.author)}>{this.props.data.frontmatter.author}</p>
                            <a href={this.props.data.frontmatter.githubUrl} target="_blank"
                               className={classNames(globalStyles.button, globalStyles.outline, globalStyles.primary, compStyles.view)}>View</a>
                            <div dangerouslySetInnerHTML={{__html: this.props.data.html}}/>
                        </div>
                    </div>
                    <a href={this.props.data.frontmatter.githubUrl} target="_blank"
                       className={classNames(globalStyles.button, globalStyles.outline, globalStyles.primary, compStyles.view)}>View</a>
                </div>
                <a className={classNames(globalStyles.editContent, globalStyles.editContentSeparator)} href={this.props.editPath} target="_blank">Improve this page</a>
            </div>
        );
    }
}

export default AnalysisDetail;
