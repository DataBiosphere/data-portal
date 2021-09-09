/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field friendlies component.
 * Displays combined friendly schema name and friendly property name.
 */

// Core dependencies
import React from "react";

// App dependencies
import Highlight from "../../highlight/highlight";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataSchemaPropertyFieldFriendlies.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaPropertyFieldFriendlies(props) {
  const { children, property, searchTerm } = props,
    { propertyFriendlies } = property || {};
  const showFriendlies = propertyFriendlies && propertyFriendlies.length > 0;
  const friendlyDepth = showFriendlies ? propertyFriendlies.length - 1 : 0;

  const Friendly = props => {
    const { counter, friendly, friendlyDepth } = props;
    const lastFriendly = counter === friendlyDepth;
    const showArrow = !lastFriendly;
    const showHighlighter = searchTerm && lastFriendly;

    return (
      <span>
        {showHighlighter ? (
          <Highlight term={searchTerm}>
            <span>{friendly}</span>
          </Highlight>
        ) : (
          <span>{friendly}</span>
        )}
        {showArrow ? <span className={compStyles.arrow}>></span> : children}
      </span>
    );
  };

  return showFriendlies ? (
    <span
      className={classNames(
        compStyles.friendly,
        fontStyles.s,
        fontStyles.regular
      )}
    >
      {propertyFriendlies.map((friendly, f) => (
        <Friendly
          key={f}
          counter={f}
          friendly={friendly}
          friendlyDepth={friendlyDepth}
        />
      ))}
    </span>
  ) : null;
}

export default MetadataSchemaPropertyFieldFriendlies;
