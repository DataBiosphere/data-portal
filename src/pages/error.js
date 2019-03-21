/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Page displaying 404 (page not found) errors.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Layout from '../components/layout';
import Section from '../components/section/section';
import TabNav from '../components/tabNav/tabNav';

// Styles
import compStyles from './404.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

const ErrorPage = () => (
	<Layout>
		<Section sectionTitle={'Error'}/>
		<TabNav homeTab={false} noTab={true}/>
		<div className={compStyles.error}>
			<div className={globalStyles.wrapper}>
				<div className={compStyles.hcaContent}>
					<h2>Oops!</h2>
					<p className={fontStyles.m}>An error has occurred processing your request.</p>
				</div>
			</div>
		</div>
	</Layout>
);

export default ErrorPage;
