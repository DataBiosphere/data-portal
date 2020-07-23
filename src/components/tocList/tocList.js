/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal TOC list component.
 */

// Core dependencies
import React from "react";

// Styles
import fontStyles from "../../styles/fontsize.module.css";
import compStyles from "./tocList.module.css";

const classNames = require("classnames");

class TOCList extends React.Component {

    isTOCActive = () => {

        const {activeTOC, toc} = this.props,
            {anchor, name} = toc;

        if ( activeTOC === name ) {

            return true;
        }
        else if ( activeTOC.includes(anchor) ) {

            return true;
        }

        return false;
    };

    render() {
        const {toc} = this.props,
            {anchor, depth, name} = toc;
        const classTOCLink = classNames({[compStyles.depth3]: depth === 3}, fontStyles.xs);
        const classTOCList = classNames({[compStyles.active]: this.isTOCActive()}, compStyles.toc);
        return (
            <li className={classTOCList}>
                <a className={classTOCLink} href={anchor}>{name}</a>
            </li>
        );
    }
}

export default TOCList;
