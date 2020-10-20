/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal icon component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./icon.module.css";

const classNames = require("classnames");

function Icon(props) {

    const {children, show} = props;
    return (
        <i className={classNames(compStyles.icon, {[compStyles.show]: show})}>{children}</i>
    );
}

export default Icon;
