/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tab component.
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";

// Styles
import compStyles from "./tab.module.css"

const classNames = require("classnames");

class Tab extends React.Component {

    render() {
        const {back, secondary, tab} = this.props,
            {active, name, path} = tab || {};
        const classNamesTab = classNames(
            {[compStyles.active]: active},
            {[compStyles.back]: back},
            {[compStyles.secondary]: secondary},
            compStyles.tab);
        return (
            path ?
                <div className={classNamesTab}>
                    {back ? <i className="material-icons">keyboard_arrow_left</i> : null}
                    <Link to={path}>{name}</Link>
                </div> : null
        );
    }
}

export default Tab;
