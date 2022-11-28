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
import Color from "../../ui/color/color";

// Styles
import { searchClose } from "./metadataSearchClose.module.css";

function MetadataSearchClose() {
  const { onHandleSearchClose } = useContext(ContextMetadataSearch);

  return (
    <span className={searchClose}>
      <Button color={Color.GRAY_LIGHT} onClick={() => onHandleSearchClose()}>
        <Icon>close</Icon>
      </Button>
    </span>
  );
}

export default MetadataSearchClose;
