/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal TOC item component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaPropertyWordWrapper from "../metadata/metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

// Styles
import fontStyles from "../../styles/fontsize.module.css";
import compStyles from "./tocItem.module.css";

const classNames = require("classnames");

class TOCItem extends React.Component {

    isTOCActive = () => {

        const {activeTOC, toc} = this.props,
            {anchor, type} = toc;

        /* Handle case for markdown TOC. */
        if ( /docs/.test(type) ) {

            return activeTOC === anchor;
        }
        /* Handle case for metadata TOC. */
        else {

            const [toc0,] = activeTOC.split("-");
            const [toc1,] = anchor.split("-");

            return toc0 === toc1;
        }
    };

    render() {
        const {toc} = this.props,
            {anchor, depth, name} = toc;
        const classTOCLink = classNames({[compStyles.depth3]: depth === 3}, fontStyles.xs);
        const classTOCItem = classNames({[compStyles.active]: this.isTOCActive()}, compStyles.toc);
        const [tocName,] = name.split(" *");
        const metadataTOC = tocName.includes("_") && !tocName.includes(" ");
        const tocItem = metadataTOC ? <MetadataSchemaPropertyWordWrapper word={name}/> : name;
        return (
            <li className={classTOCItem}>
                <a className={classTOCLink} href={anchor}>{tocItem}</a>
            </li>
        );
    }
}

export default TOCItem;
