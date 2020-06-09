/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal analyze component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// Styles
import compStyles from './analyze.module.css';
import fontStyles from '../../styles/fontsize.module.css';

class Analyze extends React.Component {

	getMarkdownFileName = (link) => {

		let path = link.childMarkdownRemark.fields.slug.split('/');
		return ('/' + path[1] + '/' + path[2] + '/' + path[4]);
	};

	render() {
		const {linked} = this.props;
		return (
			<div>
				{linked.map((link, i) => <Link to={this.getMarkdownFileName(link)}
														  className={compStyles.hcaAnalyzeList} key={i}>
					<div>
						<h5>{link.childMarkdownRemark.frontmatter.title}</h5>
						{link.childMarkdownRemark.frontmatter.author ?
							<p className={fontStyles.xxs}>{link.childMarkdownRemark.frontmatter.author}</p> : null}
						<p className={compStyles.description}>{link.childMarkdownRemark.frontmatter.description}</p>
					</div>
				</Link>)}
			</div>
		);
	}
}

export default Analyze;
