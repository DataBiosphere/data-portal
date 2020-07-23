/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata type component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Layout from "../layout";
import MetadataProperties from "../metadataProperties/metadataProperties";
import MetadataToggleRequiredFields from "../metadataToggleRequiredFields/metadataToggleRequiredFields";
import * as StringFormatService from "../../utils/string-format.service";

// Styles
import compStyles from "../metadataType/metadataType.module.css";
import fontStyles from "../../styles/fontsize.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class MetadataType extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({showAllMetadata: true});
    }

    handleToggle = (event) => {

        this.setState({showAllMetadata: event});
    };

    render() {
        const {core, nav, type} = this.props,
            {name} = core,
            {description, fields, name: schemaName, properties, title} = type || {},
            {slug} = fields,
            {showAllMetadata} = this.state;
        const categoryName = StringFormatService.convertSentenceCaseToTitleCase(name);
        const pageTitle = `${categoryName} - ${title}`;
        return (
            <Layout description={description}
                    docPath={slug}
                    nav={nav}
                    pageTitle={pageTitle}
                    showAllMetadata={showAllMetadata}>
                <h1 className={classNames(globalStyles.md, compStyles.metadataType)}>{pageTitle}</h1>
                <p className={fontStyles.hcaCode}>{schemaName}</p>
                <p className={fontStyles.l}>{description}</p>
                <p className={fontStyles.xxs}>* Indicates a required field</p>
                <MetadataToggleRequiredFields handleToggle={this.handleToggle}/>
                <MetadataProperties properties={properties} showAllMetadata={showAllMetadata}/>
            </Layout>
        );
    }
}

export default MetadataType;
