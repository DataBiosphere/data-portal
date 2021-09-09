/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying error message when attempting to submit Zendesk support request form.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./supportRequestError.module.css";

class SupportRequestError extends React.Component {
  render() {
    // Error is displayed either at top of form as an overall submit error, or above an individual form element.
    const { children, field } = this.props;
    return (
      <p
        className={classNames(
          compStyles.supportRequestError,
          { [compStyles.field]: field },
          { [compStyles.submit]: !field }
        )}
      >
        {children}
      </p>
    );
  }
}

export default SupportRequestError;
