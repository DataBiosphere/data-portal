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
import TOCSpy from "./TOCSpy";

// Styles
import compStyles from "./hcaContent.module.css";

let classNames = require("classnames");

class HCAContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({activeTOC: "", showTOC: true});
    }

    onTOCChange = (event) => {

        this.setState({activeTOC: event});
    };

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
        const {children, docPath, label, links, metadataContent, showAllMetadata, tabKey} = this.props,
            {activeTOC} = this.state;
        const useToc = this.isUseToc();
        const useNav = this.isUseNav();
        const classNamesContent = classNames(
            compStyles.hcaContent,
            {[compStyles.metadataContent]: metadataContent});

        return (
            <div className={classNamesContent}>
                <ContentWrapper marginLeft={!useNav} marginRight={!useToc}>
                    {useNav ? <Nav label={label} links={links} tabKey={tabKey}/> : null}
                    {useToc ?
                        <>
                        <TOCSpy onTOCChange={this.onTOCChange.bind(this)} showAllMetadata={showAllMetadata}>
                            <div id={"hcaContent"} className={compStyles.innerContainer}>{children}</div>
                        </TOCSpy>
                        <TOC activeTOC={activeTOC} docPath={docPath} onHandleUseTOC={this.onHandleUseTOC.bind(this)} showAllMetadata={showAllMetadata}/>
                        </> :
                        <div className={compStyles.innerContainer}>{children}</div>}
                </ContentWrapper>
            </div>
        );
    }
}

export default HCAContent;
