/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search close button wrapper component.
 * Closes search results panel, clears and blurs search <input>, clears search params from url.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Button from "../../button/button";
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import Icon from "../../icon/icon";

// Styles
import compStyles from "./metadataSearchClose.module.css";

function MetadataSearchClose() {
  const { onHandleSearchClose } = useContext(ContextMetadataSearch);

  return (
    <span className={compStyles.close}>
      <Button clickAction={onHandleSearchClose} icon>
        <Icon button showHover={true} showIcon={true}>
          close
        </Icon>
      </Button>
    </span>
  );
}

export default MetadataSearchClose;
