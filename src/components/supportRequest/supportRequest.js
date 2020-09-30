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

const SupportRequest = ({active = false, onToggle}) => {

    const [supportRequestActive, setSupportRequestActive] = useState(active);

    React.useEffect(() => {
        setSupportRequestActive(active);
    }, [active]);

    const onToggleSupportRequestForm = (active) => {
        setSupportRequestActive(active);
        onToggle(active);
    };

    return (
        <>
            {supportRequestActive ?
                <SupportRequestForm active={active} dismissFn={() => onToggleSupportRequestForm(false)}/> :
                <SupportRequestButton clickFn={() => onToggleSupportRequestForm(true)}/>
                }
        </>
    );
};

export default SupportRequest;
