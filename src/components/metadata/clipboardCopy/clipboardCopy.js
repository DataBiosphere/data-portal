/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal copy to clipboard component.
 */

// Core dependencies
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

function Clipboard(props) {

    const {children, copyText} = props;
    return (
        <CopyToClipboard text={copyText}>
            {children}
        </CopyToClipboard>
    );
}

export default Clipboard;
