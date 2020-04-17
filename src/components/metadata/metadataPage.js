/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata page template component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import * as StringFormatService from '../../utils/string-format.service';
import Layout from '../layout';
import Metadata from '../metadata/metadata';

// Styles
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';
import compStyles from './metadataPage.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
class MetadataPage extends React.Component {

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
		const {references, type} = this.props,
			{description, fields, title} = type,
			{path} = fields,
			name = type.name,
			coreEntity = StringFormatService.convertSentenceCaseToTitleCase(type.coreEntity),
			pageTitle = `${coreEntity} - ${title}`,
			{showAllMetadata} = this.state;
		return (
			<Layout pageTitle={pageTitle} docPath={path} showAllMetadata={showAllMetadata}>
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

	const references = props.references,
	type = props.type;

	return (
		<MetadataPage references={references} type={type}/>
	);
}
