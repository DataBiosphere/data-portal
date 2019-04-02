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
		this.state = {showNav: false};
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu = () => {
		this.setState({showNav: !this.state.showNav});
		this.props.onMenuOpen(this.state.showNav);
	};

	render() {
		return (
			<div className={classNames(compStyles.navBar, {[compStyles.hcaHeader]: this.props.homePage})}>
				<div className={classNames(globalStyles.wrapper, compStyles.headerWrapper)}>
					<Link to='/' className={compStyles.logo}><img src={headerLogo} alt='HCA'/></Link>
					{this.state.showNav ?
						<div className={classNames(compStyles.links, compStyles.small)}>
							<a href={process.env.GATSBY_EXPLORE_URL} onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Explore</span>
								<span
									className={classNames(fontStyles.xxs, compStyles.xxs)}>Search for data in the HCA</span>
							</a>
							<Link activeClassName={compStyles.active} to='/guides'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Guides</span>
								<span
									className={classNames(fontStyles.xxs, compStyles.xxs)}>Find user guides and how-to’s here</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/metadata'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Metadata</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Fields used to describe datasets in the Human Cell Atlas</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/pipelines'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Pipelines</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Pipelines</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/analyze'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Analysis Tools</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>Find a list of Apps</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/contribute'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Contribute</span>
								<span
									className={classNames(fontStyles.xxs, compStyles.xxs)}>Submit your data to the HCA</span>
							</Link>
							<Link activeClassName={compStyles.active} to='/apis'
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>APIs</span>
								<span className={classNames(fontStyles.xxs, compStyles.xxs)}>APIs</span>
							</Link>
						</div> : null}
					<div className={classNames(compStyles.links)} ref={(div) => this.links = div}>
						<a href={process.env.GATSBY_EXPLORE_URL}>
							<span className={compStyles.linkTo}>Explore</span>
						</a>
						<div>
							<Link activeClassName={compStyles.active} partiallyActive={true} to='/guides'>
								<span className={compStyles.linkTo}>Guides</span>
							</Link>
						</div>
						<div>
							<Link activeClassName={compStyles.active} partiallyActive={true} to='/metadata'>
								<span className={compStyles.linkTo}>Metadata</span>
							</Link>
						</div>
						<div>
							<Link activeClassName={compStyles.active} partiallyActive={true} to='/pipelines'>
								<span className={compStyles.linkTo}>Pipelines</span>
							</Link>
						</div>
						<div>
							<Link activeClassName={compStyles.active} partiallyActive={true} to='/analyze'>
								<span className={compStyles.linkTo}>Analysis Tools</span>
							</Link>
						</div>
						<div>
							<Link activeClassName={compStyles.active} partiallyActive={true} to='/contribute'>
								<span className={compStyles.linkTo}>Contribute</span>
							</Link>
						</div>
						<div>
							<Link activeClassName={compStyles.active} partiallyActive={true} to='/apis'>
								<span className={compStyles.linkTo}>APIs</span>
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
