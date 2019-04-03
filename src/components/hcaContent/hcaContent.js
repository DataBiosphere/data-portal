/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content component.
 * Wraps around back pages and markdown templates to provide the title and navigation.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Nav from '../nav/nav';
import Section from '../section/section';
import TabNav from '../tabNav/tabNav';

// Styles
import compStyles from './hcaContent.module.css';
import globalStyles from '../../styles/global.module.css';

let classNames = require('classnames');

class HCAContent extends React.Component {

	render() {
		const {children, docPath, homeTab, noNav, noTab, sectionTitle} = this.props;
		return (
			<div className={globalStyles.pageWrapper}>
				<Section docPath={docPath} sectionTitle={sectionTitle}/>
				<TabNav docPath={docPath} homeTab={homeTab} noTab={noTab}/>
				<div style={{position: 'relative'}}>
					<div className={globalStyles.wrapper}>
						<div
							className={classNames(compStyles.hcaContent, {[compStyles.noNav]: noNav})}>
							{noNav ? null : <Nav docPath={docPath}/>}
							<div className={globalStyles.hcaContentInner}>{children}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HCAContent;
