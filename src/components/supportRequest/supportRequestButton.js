/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying the "Feedback and Support" button.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as compStyles from "./supportRequestButton.module.css";

const SupportRequestButton = ({ clickFn }) => {
  const onButtonClicked = () => {
    if (clickFn) {
      clickFn();
    }
  };

  return (
    <button className={compStyles.supportRequestBtn} onClick={onButtonClicked}>
      Feedback<span> &amp; Support</span>
    </button>
  );
};

export default SupportRequestButton;
