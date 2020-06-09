/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal layout component; works as wrapper around site component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Banner from './banner/banner';
import Footer from './footer/footer';
import Header from './header/header';
import HCAMain from './hcaMain/hcaMain';
import PageHead from "./pageHead/pageHead";
import SEO from './seo/seo';

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
		const {children, description, docPath, healthy, homePage, homeTab, nav, pageTitle, sectionTitle, showAllMetadata} = this.props;
		return (
			<div>
				<PageHead pageTitle={pageTitle}/>
				<SEO description={description} pageTitle={pageTitle}/>
				<div className={classNames(compStyles.site, {[compStyles.noScroll]: this.state.noScroll})}>
					<Header onMenuOpen={this.onMenuOpen.bind(this)} homePage={homePage} docPath={docPath}/>
					<Banner position={'top'} healthy={healthy}/>
					{homePage ? children :
						<HCAMain docPath={docPath} homeTab={homeTab} nav={nav}
								 sectionTitle={sectionTitle} showAllMetadata={showAllMetadata}>{children}</HCAMain>}
					<Banner position={'bottom'}/>
					<Footer/>
				</div>
			</div>
		)
	}
}

export default Layout;
