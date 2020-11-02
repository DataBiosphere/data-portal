/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field path component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Clipboard from "../clipboardCopy/clipboardCopy";
import Icon from "../../icon/icon";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";
import Tooltip from "../../tooltip/tooltip";

// Styles
import compStyles from "./metadataSchemaPropertyFieldPath.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchemaPropertyFieldPath(props) {

    const {active, property, wrap} = props,
        {propertyPath} = property;
    const classNamesPropertyPath = classNames(fontStyles.hcaCode, compStyles.propertyPath);

    return (
        <Clipboard copyText={propertyPath}>
            <p className={classNamesPropertyPath}>
                <MetadataSchemaPropertyWordWrapper word={propertyPath} wrap={wrap}>
                    <Tooltip label={"Copy"}>
                        <Icon show={active}>file_copy</Icon>
                    </Tooltip>
                </MetadataSchemaPropertyWordWrapper>
            </p>
        </Clipboard>
    );
}

export default MetadataSchemaPropertyFieldPath;
