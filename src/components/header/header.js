/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal header component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// App dependencies
import {HeaderSiteMap} from '../../hooks/header-siteMap';

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
		const {homePage} = this.props;
		return (
			<div className={classNames(compStyles.navBar, {[compStyles.hcaHeader]: homePage})}>
				<div className={classNames(globalStyles.wrapper, compStyles.headerWrapper)}>
					<Link to='/' className={compStyles.logo}><img src={headerLogo} alt='HCA'/></Link>
					{this.state.showNav ?
						<div className={classNames(compStyles.links, compStyles.small)}>
							<a href={process.env.GATSBY_EXPLORE_URL} onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>Explore</span>
								<span
									className={classNames(fontStyles.xxs, compStyles.xxs)}>Search for data in the HCA</span>
							</a>
							{this.props.links.map((l, i) => <Link key={i} activeClassName={compStyles.active} to={l.path}
								  onClick={this.toggleMenu}>
								<span className={classNames(fontStyles.xs, compStyles.xs)}>{l.headerName? l.headerName : l.name}</span>
								<span
									className={classNames(fontStyles.xxs, compStyles.xxs)}>{l.description}</span>
							</Link>)}
						</div> : null}
					<div className={classNames(compStyles.links)} ref={(div) => this.links = div}>
						<a href={process.env.GATSBY_EXPLORE_URL}>
							<span className={compStyles.linkTo}>Explore</span>
						</a>
						{this.props.links.map((l, i) => <div key={i}>
							<Link activeClassName={compStyles.active} partiallyActive={true} to={l.path}>
								<span className={compStyles.linkTo}>{l.headerName? l.headerName : l.name}</span>
							</Link>
						</div>)}
					</div>
					<div className={classNames(compStyles.menuDropDown, fontStyles.s)} onClick={this.toggleMenu}>Menu
					</div>
					{this.state.showNav ? <div className={compStyles.hcaNavOverlay} onClick={this.toggleMenu}/> : null}
				</div>
			</div>
		);
	}
}

export default (props) => {
	return (
		<Header links={HeaderSiteMap()} {...props}/>
	);
}
