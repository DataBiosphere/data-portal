/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal section component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import {SectionSiteMap} from '../../hooks/section-siteMap';

// Styles
import compStyles from './section.module.css';
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

class Section extends React.Component {

	render() {
		const {sectionName} = this.props;
		return (
			<div className={compStyles.hcaSection}>
				<div className={globalStyles.wrapper}>
					<div className={fontStyles.xxl}>{sectionName}</div>
				</div>
			</div>
		);
	}
}

export default (props) => {

	const sectionName = props.sectionTitle ? props.sectionTitle : props.docPath ? SectionSiteMap(props.docPath) : '';

	return (
		<Section sectionName={sectionName}/>
	);
}
