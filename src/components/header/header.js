/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// Images
import headerLogo from '../../../images/logo/logo-hca.png';

// Styles
import compStyles from './header.module.css';
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

const classNames = require('classnames');

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {showNav: false, tabId: null};
		this.clearActiveLink = this.clearActiveLink.bind(this);
		this.setActiveLink = this.setActiveLink.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	clearActiveLink = () => {
		this.setState({tabId: null})
	};

	getHeaderClassName = () => {

		const browser = typeof window !== 'undefined';
		let homePage = browser && window.location.href.split('/')[3];

		if (homePage) {
			return classNames({
				[compStyles.navBar]: true
			});
		}
		return classNames({
			[compStyles.hcaHeader]: true,
			[compStyles.navBar]: true
		});
	};

	setActiveLink = (activeLink) => {
		this.setState({tabId: activeLink})
	};

	toggleMenu = () => {
		this.setState({showNav: !this.state.showNav});
		this.props.onMenuOpen(this.state.showNav);
	};

	render() {
		return (
			<div className={this.getHeaderClassName()}>
				<div className={classNames(globalStyles.wrapper, compStyles.headerWrapper)}>
					<Link to='/' className={compStyles.logo}><img src={headerLogo} alt='HCA'/></Link>
					{this.state.showNav ?
						<div className={classNames(compStyles.links, compStyles.small)}>
							<a href={process.env.GATSBY_EXPLORE_URL} onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Data</span>
								<span
									className={classNames(fontStyles.xxs, compStyles.xxs)}>Search for data in the HCA</span>
							</a>
							<Link activeClassName={compStyles.active} to='/intro'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Intro</span>
								<span
									className={classNames(fontStyles.xxs, compStyles.xxs)}>Find user guides and how-to’s here</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/metadata'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Metadata</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Fields used to describe datasets in the Human Cell Atlas</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/vignettes'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Vignettes</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Consumer vignettes</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/analyze'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Analysis Tools</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Find a list of Apps</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/contribute'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Contributing</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Submit your data to the HCA</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/docs'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Docs</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Docs</span>
							</Link>
						</div> : null}
					<div className={classNames(compStyles.links)} ref={(div) => this.links = div}>
						<a href={process.env.GATSBY_EXPLORE_URL}>
							<span className={compStyles.linkTo}>Data</span>
						</a>
						<div id='linkIntro' onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
							<Link activeClassName={compStyles.active}
								  to='/intro' onMouseEnter={(e) => this.setActiveLink(1)}>
								<span className={compStyles.linkTo}>Intro</span>
							</Link>
						</div>
						<div id='linkMetadata' onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
							<Link activeClassName={compStyles.active}
								  to='/metadata' onMouseEnter={(e) => this.setActiveLink(0)}>
								<span className={compStyles.linkTo}>Metadata</span>
							</Link>
						</div>
						<div id='linkVignettes' onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
							<Link activeClassName={compStyles.active} to='/vignettes'
								  onMouseEnter={(e) => this.setActiveLink(2)}>
								<span className={compStyles.linkTo}>Vignettes</span>
							</Link>
						</div>
						<div id='linkAnalysis' onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
							<Link activeClassName={compStyles.active} to='/analyze'
								  onMouseEnter={(e) => this.setActiveLink(2)}>
								<span className={compStyles.linkTo}>Analysis Tools</span>
							</Link>
						</div>
						<div id='linkContributing' onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
							<Link activeClassName={compStyles.active} to='/contribute'
								  onMouseEnter={(e) => this.setActiveLink(2)}>
								<span className={compStyles.linkTo}>Contributing</span>
							</Link>
						</div>
						<div id='linkDocs' onMouseLeave={this.clearActiveLink} onClick={this.clearActiveLink}>
							<Link activeClassName={compStyles.active} to='/docs'
								  onMouseEnter={(e) => this.setActiveLink(2)}>
								<span className={compStyles.linkTo}>Docs</span>
							</Link>
						</div>
					</div>
					<div className={classNames(compStyles.menuDropDown, fontStyles.s)} onClick={this.toggleMenu}>Menu
					</div>
					{this.state.showNav ? <div className={compStyles.hcaNavOverlay} onClick={this.toggleMenu}/> : null}
				</div>
			</div>
		);
	}
}

export default Header;
