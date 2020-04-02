/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal main [content] component.
 * Wraps around back pages and markdown templates (content) and provides the title and tab navigation.
 */

// Core dependencies
import React from 'react';

// App dependencies
import HCAContent from '../hcaContent/hcaContent';
import Section from '../section/section';
import TabNav from '../tabNav/tabNav';

// Styles
import compStyles from './hcaMain.module.css';
import globalStyles from '../../styles/global.module.css';

class HCAMain extends React.Component {

	render() {
		const {children, docPath, homeTab, noNav, noTab, sectionTitle, showAllMetadata} = this.props;
		return (
			<div className={globalStyles.pageWrapper}>
				<Section docPath={docPath} sectionTitle={sectionTitle}/>
				<TabNav docPath={docPath} homeTab={homeTab} noTab={noTab}/>
				<div className={compStyles.main}>
					<div className={globalStyles.wrapper}>
						<HCAContent docPath={docPath} noNav={noNav} showAllMetadata={showAllMetadata}>{children}</HCAContent>
					</div>
				</div>
			</div>
		);
	}
}

export default (props) => {

	return (
		<HCAMain {...props}/>
	);
}
