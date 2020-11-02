/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal TOC component.
 */

// Core dependencies
import React from "react";

// App dependencies
import TOCItem from "../tocItem/tocItem";
import * as TOCService from "../../utils/toc.service";

// Styles
import compStyles from "./toc.module.css";

class TOC extends React.Component {

    componentDidMount() {

        /* Handle show/hide TOC. */
        this.onHandleUseTOC();
    }

    onHandleUseTOC = () => {

        const {useTOC} = this.props;

        this.props.onHandleUseTOC(useTOC);
    };

    render() {
        const {activeLocation, tocs} = this.props;
        return (
            <div className={compStyles.tocs}>
                <ul>
                    {tocs ? tocs.map((toc, t) => <TOCItem key={t} activeLocation={activeLocation} toc={toc}/>) : null}
                </ul>
            </div>
        );
    }
}

export default (props) => {

    const {docPath, showAllMetadata} = props;
    const tocs = TOCService.getTOCs(docPath, showAllMetadata);
    const useTOC = tocs.length > 0;

    return (
        <TOC tocs={tocs} useTOC={useTOC} {...props}/>
    );
}
