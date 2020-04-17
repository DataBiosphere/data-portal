/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal seo component.
 */

// Core dependencies
import Helmet from 'react-helmet';
import React from 'react';

// App dependencies
import * as EnvironmentService from '../../utils/environment.service';

class SEO extends React.Component {

	render() {
		const {description, pageTitle} = this.props,
			title = pageTitle ? pageTitle : 'HCA Data Portal';

		return (
			<Helmet>
				<title>{title}</title>
				{EnvironmentService.isProd() ? null : <meta name='robots' content='noindex'/>}
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
				<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700'/>
				<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=PT+Mono'/>
				<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400'/>
				<link rel='stylesheet' href='https://use.typekit.net/qhb0geh.css'/>
				<meta property='og:title' content={title}/>
				<meta property='og:site_name' content='HCA Data Portal'/>
				<meta property='twitter:title' content={title}/>
				{description ? <meta property='twitter:description' content={description}/> : null}
				<meta name='twitter:card' content='summary'/>
			</Helmet>
		);
	}
}

export default SEO;
