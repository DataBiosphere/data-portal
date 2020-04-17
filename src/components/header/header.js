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
import {HeaderQuery} from '../../hooks/headerQuery';
import * as ReleaseService from '../../utils/release.service';
import ClickHandler from '../clickHandler/clickHandler';
import HeaderNavDropDown from '../headerNavDropDown/headerNavDropDown';

// Images
import headerLogo from '../../../images/logo/logo-hca.png';

// Styles
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';
import dropStyles from '../headerNavDropDown/headerNavDropDown.module.css';
import compStyles from './header.module.css';

const classNames = require('classnames');

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {menuNav: false, openNav: false};
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	componentDidMount() {

		// Set up header menu style
		this.setNavStyle();

		window.addEventListener('resize', this.setNavStyle);
	}

	componentWillUnmount() {

		window.removeEventListener('resize', this.setNavStyle);
	}

	shouldComponentUpdate(___, nextState) {

		return this.state !== nextState;
	}

	getReleasesUrl = () => {

		return `${process.env.GATSBY_EXPLORE_URL}releases/2020-mar`;
	};

	isActiveClassName = (docPath) => {

		return docPath && docPath.includes('/releases/');
	};

	setNavStyle = () => {

		const {openNav} = this.state;
		const useMenuNav = document.body.getBoundingClientRect().width < 840;
		const closeMenuNav = !useMenuNav;

		this.setState({menuNav: useMenuNav});

		if ( closeMenuNav && openNav ) {

			// Close the menu if resize occurs when menu is open and screen width is > 840
			this.setState({openNav: false})
		}
	};

	toggleMenu = () => {

		const {menuNav, openNav} = this.state;

		if ( menuNav ) {

			this.setState({openNav: !openNav});
			this.props.onMenuOpen(openNav);
		}
	};

	render() {
		const {docPath, homePage, links} = this.props,
			{menuNav, openNav} = this.state,
			browserLink = process.env.GATSBY_EXPLORE_URL,
			exploreDescription = 'Search for data in the HCA',
			exploreLabel = 'Explore',
			hideLinks = menuNav && !openNav,
			releaseDescription = 'Explore, visualize, and interact with 24 annotated datasets',
			releaseDocumentationUrl = '/releases/2020-mar',
			releaseLabel = 'March 2020 Release',
			releasesMenuActive = this.isActiveClassName(docPath),
			releaseVisible = ReleaseService.isReleaseVisible();

		const Description = (props) => {

			const {children} = props;

			return (
				<span className={classNames(fontStyles.xxs, compStyles.xxs)}>{children}</span>
			)
		};

		const ExternalLink = (props) => {

			const {children, className, linkTo} = props;

			return (
				<li className={className}>
					<a href={linkTo} onClick={this.toggleMenu}>{children}</a>
				</li>
			)
		};

		const HeaderNavDisplay = (props) => {

			const {description, label} = props,
				{menuNav} = this.state;

			return (
				<>
					<span className={classNames(fontStyles.xs, compStyles.xs)}>{label}</span>
					{menuNav ? <Description>{description}</Description> : null}
				</>
			)
		};

		const InternalLink = (props) => {

			const {children, className, path} = props;

			return (
				<li className={className}>
					<Link activeClassName={compStyles.active}
						  partiallyActive={true}
						  to={path}
						  onClick={this.toggleMenu}>{children}</Link>
				</li>
			)
		};

		const Nav = (props) => {

			const {nav} = props,
				{description, headerName, name, path} = nav || {},
				label = headerName ? headerName : name;

			return (
				<InternalLink path={path}>
					<HeaderNavDisplay description={description} label={label}/>
				</InternalLink>
			)
		};

		const NavExplore = () => {

			return(
				<ExternalLink linkTo={browserLink}>
					<HeaderNavDisplay description={exploreDescription} label={exploreLabel}/>
				</ExternalLink>
			)
		};

		const NavRelease = () => {

			const button = <HeaderNavDisplay description={releaseDescription} label={releaseLabel}/>,
				menu = (
							<ul>
								<ExternalLink linkTo={this.getReleasesUrl()}>
									<span className={classNames(fontStyles.xs, compStyles.xs, dropStyles.item)}>Datasets</span>
								</ExternalLink>
								<InternalLink path={releaseDocumentationUrl}>
									<span className={classNames(fontStyles.xs, compStyles.xs, dropStyles.item)}>Documentation</span>
								</InternalLink>
							</ul>
						),
				{openNav} = this.state;

			return (
				<HeaderNavDropDown activeClassName={classNames({[compStyles.active]: releasesMenuActive})} button={button} menu={menu} stack={openNav}/>
			)
		};

		return (
			<div className={classNames(compStyles.navBar, {[compStyles.hcaHeader]: homePage})}>
				<div className={classNames(globalStyles.wrapper, compStyles.headerWrapper)}>
					<Link to='/' className={compStyles.logo}>
						<img src={headerLogo} alt='HCA'/>
					</Link>
					<div className={classNames(compStyles.links, {[compStyles.small]: menuNav}, {[compStyles.hide]: hideLinks})}>
						<NavExplore/>
						{links.map((l, i) => <Nav key={i} nav={l}/>)}
						{releaseVisible ? <NavRelease/> : null}
					</div>
					<ClickHandler className={classNames(compStyles.menuDropDown, fontStyles.s, {[compStyles.hide]: !menuNav})}
								  clickAction={this.toggleMenu}
								  tag={'div'}>Menu</ClickHandler>
					<ClickHandler className={classNames(compStyles.overlay, {[compStyles.hide]: !openNav})}
								  clickAction={this.toggleMenu}
								  tag={'div'}/>
				</div>
			</div>
		);
	}
}

export default (props) => {

	const {docPath} = props;

	return (
		<Header links={HeaderQuery()} docPath={docPath} {...props}/>
	);
}
