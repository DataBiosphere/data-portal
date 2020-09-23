/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component controlling button and toggle of support request form.
 */

// Core dependencies
import React, {useState} from "react";

// App dependencies
import SupportRequestForm from "./supportRequestForm";
import SupportRequestButton from "./supportRequestButton";

const SupportRequest = () => {

    const [supportRequestActive, setSupportRequestActive] = useState(false);

    const onToggleSupportRequestForm = (active) => {
        setSupportRequestActive(active);
    };

    return (
        <>
            {supportRequestActive ?
                <SupportRequestForm dismissFn={() => onToggleSupportRequestForm(false)}/> :
                <SupportRequestButton clickFn={() => onToggleSupportRequestForm(true)}/>
                }
        </>
    );
};

export default SupportRequest;
