/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// Images
import footerLogo from '../../../images/logo/logo-hca-white.png';

// Styles
import compStyles from './footer.module.css';
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

let classNames = require('classnames');

const Footer = () => (
	<div className={compStyles.footer}>
		<div className={classNames(globalStyles.wrapper, compStyles.footerWrapper)}>
			<a href='https://www.humancellatlas.org/' className={compStyles.logo}><i className='material-icons'>chevron_left</i><img
				src={footerLogo} alt='Human Cell Atlas'/></a>
			<div className={compStyles.links}>
				<Link to='/about' className={classNames(fontStyles.s, fontStyles.bgDark)}>About</Link>
				<Link to='/help' className={classNames(fontStyles.s, fontStyles.bgDark)}>Help</Link>
				<Link to='/privacy' className={classNames(fontStyles.s, fontStyles.bgDark)}>Privacy</Link>
				<Link to='/contact' className={classNames(fontStyles.s, fontStyles.bgDark)}>Contact</Link>
			</div>
		</div>
	</div>
);

export default Footer;
