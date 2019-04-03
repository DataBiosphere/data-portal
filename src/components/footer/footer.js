/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// App dependencies
import {footerSiteMap} from '../../hooks/footer-siteMap';

// Images
import footerLogo from '../../../images/logo/logo-hca-white.png';

// Styles
import compStyles from './footer.module.css';
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

let classNames = require('classnames');

class Footer extends React.Component {

	render() {
		return (
			<div className={compStyles.footer}>
				<div className={classNames(globalStyles.wrapper, compStyles.footerWrapper)}>
					<a href='https://www.humancellatlas.org/' className={compStyles.logo}>
						<i className='material-icons'>chevron_left</i>
						<img src={footerLogo} alt='Human Cell Atlas'/>
					</a>
					<div className={compStyles.links}>
						{this.props.links.map((l, i) => <Link key={i} to={l.path}
															  className={classNames(fontStyles.s, fontStyles.bgDark)}>{l.name}</Link>)}
					</div>
				</div>
			</div>
		);
	}
}

export default () => {
	return (
		<Footer links={footerSiteMap()}/>
	)
}
