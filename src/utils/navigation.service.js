/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic navigation service.
 * Filters navigation by location and orders navigation links.
 */

import * as StringFormatService from './string-format.service';

/**
 * Filter navigation links by location (header, footer).
 * @param navigationLinks
 * @param locationType
 */
export function filterNavigationByLocation(navigationLinks, locationType) {

	return navigationLinks.filter(n => n.position && n.position.location === locationType);
}

/**
 * Order navigation links.
 * @param navigationLinks
 */
export function orderNavigationLinks(navigationLinks) {

	return navigationLinks.sort((nav0, nav1) => {
		if (nav0.position.order > nav1.position.order) {
			return 1;
		}
		if (nav0.position.order < nav1.position.order) {
			return -1;
		}
		return 0;
	});
}

/**
 * Determine the top level section from the path.
 * The document path is configured in the markdown front matter.
 * @param siteMap
 * @param docPath
 * @returns {section}
 */
export function sectionTitle(siteMap, docPath) {

	let section = siteMap.filter(n => n.key === getKeyOfPath(docPath, 1))[0].name;

	if (!section) {
		throw new Error('Section with key: ' + getKeyOfPath(docPath, 1) + ' is not found!');
	}

	return section;
}

/**
 * Given a path, return the set of tabs for the path's section.
 * If the section has no tabs throw an error. Every section must have one tab,
 * even if that tab has no name it will contain at least one document.
 * This is used to draw out the tabs across a documents top section.
 * @param siteMap
 * @param docPath
 * @returns {Array}
 */
export function getTabs(siteMap, docPath) {

	const section = siteMap.filter(n => n.key === getKeyOfPath(docPath, 1))[0];

	if (!section.tabs) {
		throw new Error('No tabs for section: ' + section);
	}

	section.tabs.forEach((tab) => {
		if (!tab.primaryLinks || tab.primaryLinks.length === 0) {
			throw new Error('Tab  ' + tab.name + ' has no children and therefore no landing page.');
		}
	});

	return section.tabs;
}

/**
 * Given a path return the links of the tab.
 * This is used to draw the left nav in the document page.
 * @param siteMap
 * @param docPath
 * @returns {Array}
 */
export function getNav(siteMap, docPath) {

	const tab = getTab(siteMap, docPath);

	return tab.primaryLinks;
}

/**
 * Given a path and the metadata json return the links of the tab the metadata belongs to.
 * This is used to draw the left nav in the document page for metadata dictionary pages.
 * @param metaMap
 * @param docPath
 */
export function getMetadataNav(metaMap, docPath) {

	let splitDocPath = docPath.split('/'),
		sectionAndTabPathName = `/${splitDocPath[1]}/${splitDocPath[2]}/`,
		core = metaMap.map(m => m.context.metadataCoreName).filter((v, i, a) => a.indexOf(v) === i).sort();

	return core.map((c, i) => {

		// Get the secondary links and order alphabetically.
		let secondaryLinks = metaMap.filter(m => m.context.metadataCoreName === c).map(sl => {

			return {name: sl.context.metadataTitle, key: sl.path, path: sl.path};
		}).sort((sl0, sl1) => {
			if (sl0.name.toUpperCase() > sl1.name.toUpperCase()) {
				return 1;
			}
			if (sl0.name.toUpperCase() < sl1.name.toUpperCase()) {
				return -1;
			}
			return 0;
		});

		// Get the first secondary link 's path and allocate it to the primary link path
		let primaryLinkPath = secondaryLinks[0].path;

		return {
			name: StringFormatService.convertSentenceCasetoTitleCase(c),
			key: `${sectionAndTabPathName}${c}`,
			path: primaryLinkPath,
			secondaryLinks: secondaryLinks
		};
	});
}

/**
 * Returns either the path (if there is one) or the key
 * @param link
 * @returns {*}
 */
export function getPath(link) {

	return link.path ? link.path : link.key ? link.key : '/';
}

/**
 * Given a document path, find the tab associated with the document.
 * @param siteMap
 * @param docPath
 * @returns {T|*}
 */
function getTab(siteMap, docPath) {
	const tabs = getTabs(siteMap, docPath);
	const key = getKeyOfPath(docPath, 2);
	const tab = tabs.find((s) => {
		return s.key === key;
	});

	if (!tab) {
		throw new Error('No tab for key: ' + key);
	}
	return tab;
}

/**
 * Given a document path, return either its corresponding section, tab, or primary link.
 * @param docPath
 * @param x
 * @returns {*}
 */
export function getKeyOfPath(docPath, x) {

	return docPath.split('/')[x];
}
