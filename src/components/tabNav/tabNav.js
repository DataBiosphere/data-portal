/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tab nav component.
 */

// Core dependencies
import React from 'react';
import Link from 'gatsby-link';

// App dependencies
import {tabsSiteMap} from '../../hooks/tabs-siteMap';
import * as NavigationService from '../../utils/navigation.service';

// Styles
import compStyles from './tabNav.module.css'
import globalStyles from '../../styles/global.module.css';

const classNames = require('classnames');

class TabNav extends React.Component {

	getLinkForTab = (tab) => {

		return tab.primaryLinks[0].path ? tab.primaryLinks[0].path : tab.primaryLinks[0].key ? tab.primaryLinks[0].key : '/';
	};

	render() {
		const {docPath, homeTab, noTab, tabs} = this.props;
		return (
			<div className={compStyles.hcaTabs}>
				<div className={classNames(globalStyles.wrapper, compStyles.tabNavWrapper)}>
					<div className={compStyles.hcaTabList}>
						{homeTab ? <div className={compStyles.hcaBackTab}>
							<Link to='/'>
								<i className='material-icons'>keyboard_arrow_left</i><span>Home</span>
							</Link></div> : noTab ?
							<div className={compStyles.hcaTab}/> : tabs.map((tab, i) =>
								<div key={i}
									 className={classNames(compStyles.hcaTab, {[compStyles.active]: tab.key === NavigationService.getKeyOfPath(docPath, 2)})}>
									<Link to={this.getLinkForTab(tab)}>{tab.name}</Link>
								</div>)}
					</div>
				</div>
			</div>
		);
	}
}

export default (props) => {

	const tabs = props.noTab ? '' : props.docPath ? tabsSiteMap(props.docPath) : '';

	return (
		<TabNav tabs={tabs} {...props}/>
	);
}
