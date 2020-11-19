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
import ContentWrapper from "../contentWrapper/contentWrapper";
import Nav from "../nav/nav";
import TOC from "../toc/toc";

// Styles
import compStyles from "./hcaContent.module.css";

let classNames = require("classnames");

class HCAContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({showTOC: true});
    }

    isUseNav = () => {

        const {links} = this.props;

        return links && links.length > 0;
    };

    isUseToc = () => {

        const {showTOC} = this.state;

        return showTOC;
    };

    onHandleUseTOC = (event) => {

        this.setState({showTOC: event});
    };

    render() {
        const {activeLocation, children, docPath, label, links, metadataContent, tabKey} = this.props;
        const useToc = this.isUseToc();
        const useNav = this.isUseNav();
        const classNamesContent = classNames(
            compStyles.hcaContent,
            {[compStyles.metadataContent]: metadataContent});

        return (
            <div className={classNamesContent}>
                <ContentWrapper marginLeft={!useNav} marginRight={!useToc}>
                    {useNav ?
                        <Nav label={label} links={links} tabKey={tabKey}/> : null}
                        <div id={"hcaContent"} className={compStyles.innerContainer}>{children}</div>
                    {useToc ?
                        <TOC activeLocation={activeLocation}
                             docPath={docPath}
                             onHandleUseTOC={this.onHandleUseTOC.bind(this)}/> :
                        null}
                </ContentWrapper>
            </div>
        );
    }
}

export default HCAContent;
