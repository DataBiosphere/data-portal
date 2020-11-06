/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal button component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./button.module.css";

const classNames = require("classnames");

function Button(props) {

    const {children, clickAction, icon} = props;
    const classNamesButton = classNames(compStyles.button, {[compStyles.icon]:icon});

    const onHandleClickAction = () => {

        if ( clickAction ) {

            clickAction();
        }
    };

    return (
        <button className={classNamesButton}
                onClick={() => onHandleClickAction()}>{children}</button>
    );
}

export default Button;
