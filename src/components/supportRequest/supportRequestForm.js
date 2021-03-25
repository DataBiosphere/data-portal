/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component displaying the Zendesk support request form, and handling the various success, error and
 * intermittent form states. 
 */

// Core dependencies
import Dropzone from "../dropzone/dropzone";
import React from "react";
import validate from "validate.js";

// App dependencies
import AttachmentError from "./attachmentError";
import ButtonLoader from "../buttonLoader/buttonLoader";
import Select from "../select/select";
import SupportRequestError from "./supportRequestError";
import * as SupportRequestService from "./supportRequest.service";
import SupportRequestSubmitted from "./supportRequestSubmitted";
import * as DPGTMService from "../../utils/dp-gtm/dp-gtm.service";

// Styles
import globalStyles from "../../styles/global.module.css";
import compStyles from "./supportRequestForm.module.css";

// Class name helper
const classNames = require("classnames");

// Validation constraints
const constraints = {
    email: {presence: {allowEmpty: false}, email: true},
    description: {presence: {allowEmpty: false}},
    name: {presence: {allowEmpty: false}},
    subject: {presence: {allowEmpty: false}}
};

class SupportRequestForm extends React.Component {

    /**
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = this.initForm();
        this.requestRef = React.createRef();
    }

    /**
     * Create the set of class names for the specified input.
     * 
     * @param {{[key: string]: string}} errors
     * @param {string} inputName
     * @returns {{[key: string]: boolean}}
     */
    buildInputClassnames = (errors, inputName) => {
        return {
            [compStyles.inputError]: this.isInputError(errors, inputName)
        };
    };

    /**
     * Build support request model from form values.
     */
    buildSupportRequest = () => {

        const {attachmentToken, description, email, name, subject, type} = this.state;
        const requestedFromUrl = window.location.href;
        return {
            attachmentToken, description, email, name, requestedFromUrl, subject, type
        }
    };

    /**
     * Build initial form state.
     */
    initForm() {
        return {
            attachmentName: "",
            attachmentRejected: false, // Upload fails on drop of file
            attachmentRejections: [], // Failure reasons
            attachmentToken: "",
            attachmentUploading: false,
            description: "",
            email: "",
            name: "",
            subject: "",
            submitError: false,
            submitted: false,
            submitting: false,
            touched: {},
            type: "question"
        };
    }

    /**
     * Return true if the specified field has an invalid value.
     * 
     * @param {{[key: string]: string}} errors
     * @param {string} inputName
     * @returns {boolean}
     */
    isInputError = (errors, inputName) => {
        
        if ( !errors ) {
            return false;
        }

        return this.state.touched[inputName] && errors[inputName];
    };

    /**
     * Delete attachment.
     */
    onAttachmentDeleted = () => {

        this.setState({attachmentToken: ""});
    };

    /**
     * Upload file to add as attachment to request.
     *
     * @param files
     */
    async onAttachmentDropped(files) {

        try {
            this.setState({
                attachmentRejected: false,
                attachmentRejections: [],
                attachmentUploading: true
            });
            const response = await SupportRequestService.uploadAttachment(files[0]);
            const attachmentToken = response.token;
            const attachmentName = response.attachment.file_name;
            this.setState({
                attachmentToken, attachmentName, attachmentUploading: false
            });
        }
        catch (error) {
            this.setState({
                attachmentRejected: true,
                attachmentRejections: [],
                attachmentUploading: false
            });
            console.log(error);
        }
    }

    /**
     * Attachment has been rejected (on drop of file).
     */
    onAttachmentRejected = (fileRejections) => {

        // We can assume there is a single error as we are not doing multiple uploads
        const rejection = fileRejections[0] || {};
        this.setState({
            attachmentRejected: true,
            attachmentRejections: rejection.errors
        });
    };

    /**
     * Indicate input field has been touched.
     *
     * @param event
     */
    onInputBlur = (event) => {

        const target = event.target;
        this.setState({
            touched: {
                ...this.state.touched,
                [target.name]: true
            }
        });
    };

    /**
     * Bind input value to state.
     *
     * @param event
     */
    onInputChange = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    /**
     * Bind type drop down value to state on select of value.
     *
     * @param selectedOption
     */
    onTypeChange = (selectedOption) => {

        this.setState({
            type: selectedOption.value
        });
    };
    
    /**
     * Handle cancel of support request form.
     */
    onSupportRequestDismissed = () => {

        const {dismissFn} = this.props; 
        if ( dismissFn ) {
            dismissFn();
        }
    };

    /**
     * Handle submit of support request form.
     */
    onSupportRequestSubmitted = async () => {

        const request = this.buildSupportRequest();
        try {
            this.setState({
                submitError: false,
                submitting: true
            });
            await SupportRequestService.createSupportRequest(request);
            this.setState({
                submitting: false,
                submitted: true
            });
            this.requestRef.current.scrollTo(0, 0);
            DPGTMService.trackSupportRequestCreated(this.props.source);
            setTimeout(() => this.onSupportRequestDismissed(), 3000);
        }
        catch(error) {
            this.setState({
                submitError: true,
                submitting: false
            });
            console.log(error);
        }
    };

    render() {
        const {attachmentName, attachmentRejected, attachmentRejections, attachmentToken, description,
            email, name, submitError, submitted, submitting, subject, type, attachmentUploading} = this.state;
        
        // Set up select options, selected value and styles.
        const typeOptions = [
            {value: "question", label: "Question"},
            {value: "bug", label: "Bug"},
            {value: "feature_request", label: "Feature Request"}
        ];
        const selectedTypeOption = typeOptions.filter(option => option.value === type);

        // Active drag styles
        const draggingStyle = {
            cursor: "copy"
        };

        // Determine error state of form
        const errors = validate(this.buildSupportRequest(), constraints);

        // Max file attachment
        const maxAttachmentSize = 20 * 1024 * 1024;

        return (
            <div className={classNames(compStyles.supportRequest, {[compStyles.submitted]: submitted})} ref={this.requestRef}>
                <Dropzone activeStyle={draggingStyle}
                          disabled={!!attachmentToken}
                          maxSize={maxAttachmentSize}
                          multiple={false}
                          onDropAccepted={(files) => this.onAttachmentDropped(files)}
                          onDropRejected={this.onAttachmentRejected}>
                    {({dragging, openUploader}) => (
                        <>
                            {submitted ? <SupportRequestSubmitted/> : null}
                            <div className={classNames({[compStyles.hidden]: submitted})}>
                                <h2>Contact Us</h2>
                                <h3>Type *</h3>
                                    <Select name="type"
                                            value={selectedTypeOption}
                                            isSearchable={false}
                                            onChange={this.onTypeChange}
                                            options={typeOptions}/>
                                <h3>How can we help you? *</h3>
                                <input className={classNames(
                                    compStyles.inputSubject, 
                                    this.buildInputClassnames(errors, "subject"))}
                                       type="text"
                                       name="subject"
                                       placeholder="Enter a subject"
                                       value={subject}
                                       onBlur={this.onInputBlur}
                                       onChange={this.onInputChange}/>
                                <textarea
                                    className={classNames(this.buildInputClassnames(errors, "description"))}
                                    name="description"
                                    placeholder="Enter a description"
                                    value={description}
                                    onBlur={this.onInputBlur}
                                    onChange={this.onInputChange}/>
                                <h3>Attachment</h3>
                                {attachmentRejected ?
                                    <AttachmentError rejections={attachmentRejections}/> :
                                    null}
                                {attachmentToken ?
                                    <div className={compStyles.inputAttachmentAttached}>
                                        <div className={compStyles.inputAttachmentFileName}>{attachmentName}</div>
                                        <button className={compStyles.inputAttachmentDelete}
                                                aria-label="Delete Attachment"
                                                onClick={this.onAttachmentDeleted}/>
                                    </div> :
                                    <button className={classNames(compStyles.inputAttachment,
                                                                {[compStyles.inputAttachmentDragging]: dragging})}
                                            onClick={openUploader}>
                                        {attachmentUploading ?
                                            <ButtonLoader/> :
                                            <div>Drag or <span>click</span> to attach file.</div>}
                                    </button>}
                                <h3>Contact Details *</h3>
                                <input className={classNames(this.buildInputClassnames(errors, "name"))}
                                       type="text"
                                       name="name"
                                       placeholder="Enter your name"
                                       value={name}
                                       onBlur={this.onInputBlur}
                                       onChange={this.onInputChange}/>
                                <input className={classNames(this.buildInputClassnames(errors, "email"))}
                                       type="text"
                                       name="email"
                                       placeholder="Enter your email"
                                       value={email}
                                       onBlur={this.onInputBlur}
                                       onChange={this.onInputChange}/>
                                {submitError ?
                                    <SupportRequestError>An error has occurred. Please try again later.</SupportRequestError> :
                                    null}                                
                                <div className={compStyles.buttons}>
                                    <button className={classNames(globalStyles.button, compStyles.buttonCancel)}
                                            onClick={this.onSupportRequestDismissed}>Cancel</button>
                                    <button className={classNames(globalStyles.button, compStyles.buttonSubmit)}
                                            disabled={!!errors || submitting}
                                            onClick={this.onSupportRequestSubmitted}>
                                        {submitting ? <ButtonLoader/> : "Send"}
                                        </button>
                                </div>
                            </div>
                        </>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default SupportRequestForm;
