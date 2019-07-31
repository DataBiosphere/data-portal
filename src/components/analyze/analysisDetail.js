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

	render() {
		return (
			<div>
				<div className={compStyles.hcaAnalyzeDetail}>
					<div>
						<h1 className={globalStyles.md}>{this.props.data.frontmatter.title}</h1>
						<p className={classNames(fontStyles.s, compStyles.author)}>{this.props.data.frontmatter.author}</p>
					</div>
					<a href={this.props.data.frontmatter.githubUrl} target='_blank' rel='noopener noreferrer'
					   className={classNames(globalStyles.button, globalStyles.outline, globalStyles.primary, compStyles.view)}>View</a>
				</div>
				<div dangerouslySetInnerHTML={{__html: this.props.data.html}}/>
				<a className={classNames(globalStyles.editContent, globalStyles.editContentSeparator)}
				   href={this.props.editPath} target='_blank' rel='noopener noreferrer'>Improve this page</a>
			</div>
		);
	}
}

export default AnalysisDetail;
