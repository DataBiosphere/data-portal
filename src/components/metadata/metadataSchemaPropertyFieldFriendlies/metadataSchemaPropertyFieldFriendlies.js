/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field friendlies component.
 * Displays combined friendly schema name and friendly property name.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./metadataSchemaPropertyFieldFriendlies.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSchemaPropertyFieldFriendlies(props) {

    const {property} = props,
        {propertyFriendlies} = property || {};
    const showFriendlies = propertyFriendlies && propertyFriendlies.length > 0;
    const friendlyDepth = showFriendlies ? propertyFriendlies.length - 1 : 0;

    const Friendly = (props) => {

        const {counter, friendly, friendlyDepth} = props;
        const lastSlash = counter === friendlyDepth;
        const showSlash = !lastSlash;

        return (
            <span>
                <span>{friendly}</span>
                {showSlash ? <span> / </span> : null}
            </span>
        )
    };

    return (
        showFriendlies ?
            <span className={classNames(compStyles.friendly, fontStyles.s, fontStyles.regular)}>
                {propertyFriendlies.map((friendly, f) => <Friendly key={f} counter={f} friendly={friendly} friendlyDepth={friendlyDepth}/>)}
            </span> : null
    );
}

export default MetadataSchemaPropertyFieldFriendlies;
