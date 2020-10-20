/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextMetadataToggleRequiredFields from "./contextMetadataToggleRequiredFields/contextMetadataToggleRequiredFields";
import Layout from "../layout";
import MetadataSchema from "./metadataSchema/metadataSchema";
import * as MetadataService from "../../utils/metadata.service";

function Metadata(props) {

    const {entities, nav, sitePageId} = props;
    const {showAllMetadata} = useContext(ContextMetadataToggleRequiredFields);
    const entity = MetadataService.getMetadataEntity(entities);
    const category = MetadataService.getMetadataCategory(sitePageId, entities);
    const schema = MetadataService.getMetadataSchema(category, sitePageId, showAllMetadata);
    const {description, fields, title} = schema || {},
        {slug} = fields;

    return (
        <Layout description={description}
                docPath={slug}
                metadataContent={true}
                nav={nav}
                pageTitle={title}
                showAllMetadata={showAllMetadata}>
            <MetadataSchema entity={entity}
                            nav={nav}
                            schema={schema}/>
        </Layout>
    );
}

export default Metadata;
