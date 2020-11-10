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
		const {activeLocation, children, docPath, homeTab, nav, sectionTitle, showAllMetadata} = this.props,
			{links, section, tabKey, tabs} = nav || {};
		return (
			<div className={globalStyles.pageWrapper}>
				<Section section={section} sectionTitle={sectionTitle}/>
				<TabNav homeTab={homeTab} tabs={tabs}/>
				<div className={compStyles.main}>
					<div className={globalStyles.wrapper}>
						<HCAContent activeLocation={activeLocation} docPath={docPath} links={links}
									showAllMetadata={showAllMetadata} tabKey={tabKey}>{children}</HCAContent>
					</div>
				</div>
			</div>
		);
	}
}

export default HCAMain;
