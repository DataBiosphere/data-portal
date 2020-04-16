/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal toc component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import {TOCSiteMap} from '../../hooks/toc-siteMap';
import {MetadataTOCSiteMap} from "../../hooks/metatoc-siteMap";

// Styles
import compStyles from './toc.module.css';
import fontStyles from '../../styles/fontsize.module.css';

const classNames = require('classnames');

class TOC extends React.Component {

	constructor(props) {
		super(props);
		this.state = ({isTOC: true});
	}

	componentDidMount() {
		let isTOC = this.props.pagesTOC.length > 0;
		this.setState({isTOC: isTOC});
		this.props.isTOC(this.state.isTOC);
	};

	getAnchor = (heading) => {

		let specialCharacters = /[:?.,()]/g,
			whiteSpace = /\s/g;

		return heading.replace(whiteSpace, '-').replace(specialCharacters, '').toLowerCase();
	};

	filterMetadata = () => {

		const {metaTOC, showAllMetadata} = this.props,
			{properties, required} = metaTOC || {};

		if ( metaTOC && properties ) {

			if ( showAllMetadata ) {

				return properties;
			}
			else {

				return properties.filter(property => required.includes(property.name));
			}
		}
	};

	isActive = (heading, activeTOC) => {
		return `#${this.getAnchor(heading)}` === activeTOC;
	};

	isMetaActive = (property, activeTOC) => {
		return activeTOC.split('-')[1] === property;
	};

	render() {
		const {activeTOC, metaProp, metaTOC, pagesTOC} = this.props,
			{required} = metaTOC || {};
		const displayProperties = this.filterMetadata();
		return (
			<div className={compStyles.hcaToc}>
				<ul className={compStyles.tocs}>
					{pagesTOC ? pagesTOC.map((heading, i) =>
						<li key={i}
							className={classNames({[compStyles.active]: this.isActive(heading.value, activeTOC)})}>
							<a className={classNames(fontStyles.xs, {[compStyles.depth3]: heading.depth === 3})}
							   href={`#${this.getAnchor(heading.value)}`}>{heading.value}</a>
						</li>) : null}
					{metaTOC ? displayProperties.map((property, j) =>
					<li key={j}
							className={classNames({[compStyles.active]: this.isMetaActive(property.name, activeTOC)})}>
							<a className={fontStyles.xs}
							   href={`#${metaProp}-${property.name}`}>{property.properties.user_friendly ? property.properties.user_friendly : property.name}{required && required.includes(property.name) ?
								<span>*</span> : null}</a>
						</li>) : null}
				</ul>
			</div>
		);
	}
}

export default (props) => {

	let docPath = props.docPath,
		pagesTOC = TOCSiteMap(docPath) ? TOCSiteMap(docPath).headings.filter(heading => heading.depth > 1 && heading.depth <= 3) : '',
		metaNav = docPath.includes('/metadata/dictionary/'),
		docPathSplitByPath = docPath.split('/'),
		docPathSplitByPathLength = docPathSplitByPath.length - 1,
		metaType = metaNav ? docPathSplitByPath[3] : '',
		metaProp = metaNav ? docPathSplitByPath[docPathSplitByPathLength] : '',
		metaTOC = metaNav ? MetadataTOCSiteMap(metaType, metaProp) : null;

	// Relocate provenance to the end of properties
	if ( metaTOC && metaTOC.properties[0].name === "provenance" ) {

		const provenance = metaTOC.properties.shift();
		metaTOC.properties.push(provenance);
	}

	return (
		<TOC metaProp={metaProp} metaTOC={metaTOC} pagesTOC={pagesTOC} {...props}/>
	);
}
