/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal root component; works as wrapper around site component.
 */

// Core dependencies
import normalize from 'normalize.css';
import Helmet from 'react-helmet';
import React from 'react';

// App dependencies
import Banner from './banner/banner';
import Footer from './footer/footer';
import Header from './header/header';

// Styles
import compStyles from './layout.module.css';

let classNames = require('classnames');

require(`prismjs/themes/prism-solarizedlight.css`);
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
		const {children} = this.props;
		return (
			<div>
				<Helmet>
					<title>{this.props.pageTitle ? this.props.pageTitle : 'HCA Data Portal'}</title>
					<link rel='stylesheet' href='https://use.typekit.net/qhb0geh.css'/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
					<link rel='stylesheet'
						  href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700'/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=PT+Mono'/>
					<link rel='stylesheet' href='https://use.typekit.net/qhb0geh.css'/>
				</Helmet>
				<div className={classNames(compStyles.site, {[compStyles.noScroll]: this.state.noScroll})}>
					<Header onMenuOpen={this.onMenuOpen.bind(this)}/>
					<Banner position={'top'} healthy={this.props.healthy}/>
					<div className={compStyles.content}>
						{children}
					</div>
					<Banner position={'bottom'}/>
					<Footer/>
				</div>
			</div>
		)
	}
}

export default Layout;
