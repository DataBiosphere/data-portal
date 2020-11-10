/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content component.
 * Provides navigation and TOC for backpages and metadata.
 */

// Core dependencies
import React from "react";

// App dependencies
import Nav from "../nav/nav";
import TOC from "../toc/toc";

// Styles
import compStyles from "./hcaContent.module.css";

let classNames = require("classnames");

class HCAContent extends React.Component {

    render() {
        const {activeLocation, children, docPath, links, showAllMetadata, tabKey} = this.props;
        const linksExist = links && links.length;
        return (
            <div
                className={classNames(compStyles.hcaContent, {[compStyles.noNav]: !linksExist})}>
                {linksExist ? <Nav links={links} tabKey={tabKey}/> : null}
                <div id={"hcaContent"} className={compStyles.hcaContentInner}>{children}</div>
                {linksExist ?
                    <TOC activeLocation={activeLocation}
                         docPath={docPath}
                         showAllMetadata={showAllMetadata}/> : null}
            </div>
        );
    }
}

export default HCAContent;
