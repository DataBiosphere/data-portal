/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal nav component.
 */

// Core dependencies
import Link from 'gatsby-link';
import React from 'react';

// App dependencies
import {metadataSiteMap} from '../../hooks/metadata-siteMap';
import {navSiteMap} from '../../hooks/nav-siteMap';
import * as NavigationService from '../../utils/navigation.service';

// Styles
import compStyles from './nav.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

let active;
let expanded;
let initialShowNav = false;
let tab;

class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {showNav: initialShowNav};
		this.toggleNav = this.toggleNav.bind(this);
	}

	/**
	 * Get tabs.
	 */
	componentDidMount() {
		this.getTab();
	}

	getNavClassName = (docPath, nav) => {

		active = nav.key === docPath;
		expanded = (NavigationService.getKeyOfPath(docPath, 3) === NavigationService.getKeyOfPath(nav.key, 3) && nav.secondaryLinks);

		return classNames({
			[compStyles.expanded]: expanded,
			[compStyles.selected]: active
		});
	};

	getTab = () => {

		if (tab !== NavigationService.getKeyOfPath(this.props.docPath, 2)) {
			this.setState({showNav: false});
			tab = NavigationService.getKeyOfPath(this.props.docPath, 2);
		}
	};

	toggleNav = () => {

		// Navigation closes when new tab selected
		this.getTab();

		// Toggle the navigation open/closed
		this.setState({showNav: !this.state.showNav});

		initialShowNav = !this.state.showNav;
	};

	render() {
		const {docPath, nav} = this.props;
		return (
			<div className={compStyles.hcaNav}>
				<ul className={compStyles.hcaSideNav}>
					{nav.map((p, i) =>
						<div key={i}>
							<li className={this.getNavClassName(docPath, p)} key={i}><Link
								to={NavigationService.getPath(p)} className={fontStyles.navPrimary}>{p.name}</Link></li>
							{p.secondaryLinks && expanded ?
								<ul>
									{p.secondaryLinks.map((c, j) => <li className={this.getNavClassName(docPath, c)}
																		key={j}><Link
										to={NavigationService.getPath(c)}
										className={fontStyles.navSecondary}>{c.name}</Link></li>)}
								</ul> : null}
						</div>)}
				</ul>
				<ul className={compStyles.hcaSideNav}>
					<li className={compStyles.select} onClick={this.toggleNav}>
						<span>Also in this section</span><i className='material-icons'>keyboard_arrow_down</i>
					</li>
					{this.state.showNav ?
						nav.map((p, i) =>
							<div key={i}>
								<li className={this.getNavClassName(docPath, p)} key={i}
									onClick={p.secondaryLinks ? expanded ? this.toggleNav : null : this.toggleNav}><Link
									to={NavigationService.getPath(p)} className={fontStyles.navPrimary}>{p.name}</Link>
								</li>
								{p.secondaryLinks && expanded ?
									<ul>
										{p.secondaryLinks.map((c, j) => <li className={this.getNavClassName(docPath, c)}
																			key={j} onClick={this.toggleNav}><Link
											to={NavigationService.getPath(c)}
											className={fontStyles.navSecondary}>{c.name}</Link></li>)}
									</ul> : null}
							</div>) : null}
				</ul>
			</div>
		);
	}
}

export default (props) => {

	let docPath = props.docPath,
		metaNav = docPath.includes('/metadata/dictionary/'),
		pagesSiteMap = navSiteMap(docPath),
		metaSiteMap = metaNav ? metadataSiteMap(docPath) : '';

	const nav = metaNav ? pagesSiteMap.concat(metaSiteMap) : docPath ? pagesSiteMap : '';

	return (
		<Nav nav={nav} {...props}/>
	);
}
