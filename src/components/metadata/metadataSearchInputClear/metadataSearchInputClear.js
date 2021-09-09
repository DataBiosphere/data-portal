/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search input clear button wrapper component.
 * Clears text in search <input>.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataSearchInputClear.module.css";

function MetadataSearchInputClear(props) {
  const { onHandleClearInput, showClear } = props;
  const classNamesInputClear = classNames(
    { [compStyles.active]: showClear },
    compStyles.clear
  );

  return (
    <span className={classNamesInputClear}>
      <Button clickAction={onHandleClearInput} icon>
        <Icon button fontSize={20} showHover={true} showIcon={showClear}>
          close
        </Icon>
      </Button>
    </span>
  );
}

export default React.memo(MetadataSearchInputClear);
