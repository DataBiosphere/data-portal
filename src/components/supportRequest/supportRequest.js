/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component controlling button and toggle of support request form.
 */

// Core dependencies
import React, { useState } from "react";

// App dependencies
import SupportRequestButton from "./supportRequestButton";
import SupportRequestForm from "./supportRequestForm";
import { GASource } from "../../utils/dp-gtm/ga-source.model";

const SupportRequest = ({ active = false, source, onToggle }) => {
  const [supportRequestActive, setSupportRequestActive] = useState(active);

  React.useEffect(() => {
    setSupportRequestActive(active);
  }, [active]);

  const onToggleSupportRequestForm = (active, source) => {
    setSupportRequestActive(active);
    onToggle(active, source);
  };

  return (
    <>
      {supportRequestActive ? (
        <SupportRequestForm
          active={active}
          source={source}
          dismissFn={() =>
            onToggleSupportRequestForm(false, GASource.SUPPORT_REQUEST_FORM)
          }
        />
      ) : (
        <SupportRequestButton
          clickFn={() =>
            onToggleSupportRequestForm(true, GASource.SUPPORT_REQUEST_BUTTON)
          }
        />
      )}
    </>
  );
};

export default SupportRequest;
