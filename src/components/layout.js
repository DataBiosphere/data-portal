/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal layout component; works as wrapper around site component.
 */

// Core dependencies
import Helmet from 'react-helmet';
import React from 'react';

// App dependencies
import * as EnvironmentService from "../utils/environment.service";
import Banner from './banner/banner';
import Footer from './footer/footer';
import Header from './header/header';
import HCAMain from './hcaMain/hcaMain';

// Styles
import compStyles from './layout.module.css';

let classNames = require('classnames');

require(`katex/dist/katex.min.css`);

class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {noScroll: false};
	}

	onMenuOpen = (event) => {
		this.setState({noScroll: !event});
	};

	render() {
		const {children, docPath, healthy, homePage, homeTab, noNav, noTab, pageTitle, sectionTitle} = this.props;
		return (
			<div>
				<Helmet>
					<title>{pageTitle ? pageTitle : 'HCA Data Portal'}</title>
					{EnvironmentService.isProd() ? null : <meta name="robots" content="noindex" />}
					<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
					<link rel='stylesheet'
						  href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700'/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=PT+Mono'/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400'/>
					<link rel='stylesheet' href='https://use.typekit.net/qhb0geh.css'/>
				</Helmet>
				<div className={classNames(compStyles.site, {[compStyles.noScroll]: this.state.noScroll})}>
					<Header onMenuOpen={this.onMenuOpen.bind(this)} homePage={homePage} docPath={docPath}/>
					<Banner position={'top'} healthy={healthy}/>
					{homePage ? children :
						<HCAMain docPath={docPath} homeTab={homeTab} noNav={noNav} noTab={noTab}
								 sectionTitle={sectionTitle}>{children}</HCAMain>}
					<Banner position={'bottom'}/>
					<Footer/>
				</div>
			</div>
		)
	}
}

export default Layout;
