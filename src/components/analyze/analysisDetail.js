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
		const {data, editPath} = this.props,
			{frontmatter, html} = data,
			{author, githubUrl, title} = frontmatter;
		return (
			<div>
				<div className={compStyles.hcaAnalyzeDetail}>
					<div>
						<h1 className={globalStyles.md}>{title}</h1>
						<p className={classNames(fontStyles.s, compStyles.author)}>{author}</p>
					</div>
					<a href={githubUrl} target='_blank' rel='noopener noreferrer'
					   className={classNames(globalStyles.button, globalStyles.outline, globalStyles.primary, compStyles.view)}>View</a>
				</div>
				<div dangerouslySetInnerHTML={{__html: html}}/>
				<a className={classNames(globalStyles.editContent, globalStyles.editContentSeparator)}
				   href={editPath} target='_blank' rel='noopener noreferrer'>Improve this page</a>
			</div>
		);
	}
}

export default AnalysisDetail;
