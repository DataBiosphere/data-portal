/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal system status component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// Styles
import compStyles from './systemStatus.module.css';
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

let classNames = require('classnames');

class SystemStatus extends React.Component {

	render() {
		return (
			<div className={compStyles.systemStatus}>
				<div className={classNames(globalStyles.bannerWrapper, compStyles.systemStatusWrapper)}>
					<i className={classNames('material-icons', fontStyles.bgDark)}>warning</i>
					<div>
						<p className={classNames(fontStyles.s, fontStyles.bgDark, fontStyles.noMargin)}>One or more
							of the systems composing the HCA DCP is currently unavailable. Please try
							again later, or monitor the full system status <Link to='/system-status'>here</Link>.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default SystemStatus;
