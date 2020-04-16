/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata template component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Layout from '../components/layout';
import Metadata from '../components/metadata/metadata';
import {MetadataSiteMap} from "../hooks/metadata-siteMap";
import {MetadataTypeSiteMap} from "../hooks/metadata-type-sitemap";
import * as StringFormatService from '../utils/string-format.service';

// Styles
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';
import compStyles from './metadataTemplate.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
class MetadataTemplate extends React.Component {

	constructor(props) {
		super(props);
		this.state = ({showAllMetadata: true});
	}

	componentDidMount() {

		const showMetadata = localStorage.getItem('showMetadata') !== "false";
		this.setState({showAllMetadata: showMetadata});
	}

	componentWillUnmount() {

		localStorage.setItem('showMetadata', this.state.showAllMetadata);
	}

	onShowMetadata = (event) => {

		this.setState({showAllMetadata: !event});
	};

	render() {
		const {docPath, references, type} = this.props,
			{description} = type,
			name = type.name,
			coreEntity = StringFormatService.convertSentenceCaseToTitleCase(type.coreEntity),
			title = type.title,
			pageTitle = `${coreEntity} - ${title}`,
			showAllMetadata = this.state.showAllMetadata;
		return (
			<Layout pageTitle={pageTitle} docPath={docPath} showAllMetadata={showAllMetadata}>
				<h1 className={classNames(globalStyles.md, compStyles.meta)}>{pageTitle}</h1>
				<p className={fontStyles.hcaCode}>{name}</p>
				<p className={fontStyles.l}>{description}</p>
				<p className={fontStyles.xxs}>* Indicates a required field</p>
				<Metadata entity={type} onShowMetadata={this.onShowMetadata.bind(this)} references={references}
						  showAllMetadata={showAllMetadata}
						  unFriendly={name}/>
			</Layout>
		);
	}
}

export default (props) => {

	const docPath = props.path;
	const metadataPath = props.pageContext.metadataPath;
	const types = MetadataTypeSiteMap();
	const references = MetadataSiteMap();

	const type = types.find(type => type.relativeFilePath === metadataPath);

	// Relocate provenance to the end of properties
	if ( type && type.properties[0].name === "provenance" ) {

		const provenance = type.properties.shift();
		type.properties.push(provenance);
	}

	return (
		<MetadataTemplate docPath={docPath} references={references} type={type}/>
	);
}
