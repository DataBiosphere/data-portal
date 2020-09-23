/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying error messages when attachment has been rejected on drop of file.
 */

// Core dependencies
import React from "react";

// App dependencies
import SupportRequestError from "./supportRequestError";

class AttachmentError extends React.Component {

    render() {
        const {rejections} = this.props;
        const fileSizeError = rejections.find((rejection) => rejection.code === "file-too-large");
        const errorMessage = !!fileSizeError ? "File must be less than 20 MB." : "Unable to upload file.";
        return (
            <SupportRequestError field={true}>{errorMessage}</SupportRequestError>
        );
    }
}

export default AttachmentError;
