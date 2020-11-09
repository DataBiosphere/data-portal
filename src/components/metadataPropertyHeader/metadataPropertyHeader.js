/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata property header component.
 */

// Core dependencies
import React from "react";

// App dependencies
import InternalLink from "../internal-link/internalLink";

// Styles
import compStyles from "./metadataPropertyHeader.module.css";
import fontStyles from "../../styles/fontsize.module.css";

const classNames = require("classnames");

class MetadataPropertyHeader extends React.Component {

    render() {
        const {anchor, dataType, firstInGroup, label ,required} = this.props;
        const classHeader = classNames({[fontStyles.l]: firstInGroup}, {[fontStyles.semiBold]: !firstInGroup}, {[fontStyles.xs]: !firstInGroup});
        return (
            <span>
                <span className={classHeader}>{label}</span>
                {required ? <span className={classNames(compStyles.required, fontStyles.xs)}>*</span> : null}
                {firstInGroup ? <span className={classNames(fontStyles.xxs, compStyles.dataType)}>({dataType})</span> : null}
                {anchor ? <InternalLink anchor={anchor}/> : null}
            </span>
        );
    }
}

export default MetadataPropertyHeader;
