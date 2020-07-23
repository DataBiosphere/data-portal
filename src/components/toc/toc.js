/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal TOC component.
 */

// Core dependencies
import React from "react";

// App dependencies
import TOCList from "../tocList/tocList";
import * as TOCService from "../../utils/toc.service";

// Styles
import compStyles from "./toc.module.css";

class TOC extends React.Component {

    render() {
        const {activeTOC, tocs} = this.props;
        return (
            <div className={compStyles.tocs}>
                <ul>
                    {tocs ? tocs.map((toc, t) => <TOCList key={t} activeTOC={activeTOC} toc={toc}/>) : null}
                </ul>
            </div>
        );
    }
}

export default (props) => {

    const {docPath, showAllMetadata} = props;
    const tocs = TOCService.getTOCs(docPath, showAllMetadata);

    return (
        <TOC tocs={tocs} {...props}/>
    );
}
