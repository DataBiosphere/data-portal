/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tab nav component.
 */

// Core dependencies
import React from 'react';
import Link from 'gatsby-link';

// Styles
import globalStyles from '../../styles/global.module.css';
import compStyles from './tabNav.module.css'

const classNames = require('classnames');

class TabNav extends React.Component {

	render() {
		const {homeTab, tabs} = this.props;
		return (
			<div className={compStyles.hcaTabs}>
				<div className={classNames(globalStyles.wrapper, compStyles.tabNavWrapper)}>
					<div className={compStyles.hcaTabList}>
						{homeTab ? <div className={compStyles.hcaBackTab}>
							<Link to='/'>
								<i className='material-icons'>keyboard_arrow_left</i><span>Home</span>
							</Link></div> : tabs ?
							tabs.map((tab, i) => <div key={i}
									 className={classNames(compStyles.hcaTab, {[compStyles.active]: tab.active})}>
									<Link to={tab.path}>{tab.name}</Link>
								</div>) : <div className={compStyles.hcaTab}/>}
					</div>
				</div>
			</div>
		);
	}
}

export default TabNav;
