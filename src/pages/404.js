/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Page displaying 404 (page not found) errors.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// App dependencies
import Layout from '../components/layout';
import Section from '../components/section/section';
import TabNav from '../components/tabNav/tabNav';

// Styles
import compStyles from './404.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

const NotFoundPage = () => (
	<Layout>
		<Section sectionTitle={'Page Not Found'}/>
		<TabNav homeTab={true}/>
		<div className={compStyles.error}>
			<div className={globalStyles.wrapper}>
				<div className={compStyles.hcaContent}>
					<h2>Oops!</h2>
					<p className={fontStyles.m}>We can’t find the page you were looking for.</p>
					<p className={fontStyles.m}>Here are some helpful links instead:</p>
					<Link to='/'>Home Page</Link>
					<Link to='/contact'>Contact</Link>
				</div>
			</div>
		</div>
	</Layout>
);

export default NotFoundPage;
