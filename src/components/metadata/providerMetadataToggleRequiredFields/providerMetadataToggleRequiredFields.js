/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata toggle required fields component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ContextMetadataToggleRequiredFields from "../contextMetadataToggleRequiredFields/contextMetadataToggleRequiredFields";

class ProviderMetadataToggleRequiredFields extends React.Component {

    constructor(props) {
        super(props);

        this.onHandleToggleRequiredFields = () => {

            const {showAllMetadata} = this.state;

            this.setState({showAllMetadata: !showAllMetadata});
        };

        this.state = ({
            showAllMetadata: true,
            onHandleToggleRequiredFields: this.onHandleToggleRequiredFields
        });
    }

    componentDidMount() {

        /* Get the local storage toggle required fields value. */
        this.getLocalStorage();
    }

    componentDidUpdate() {

        this.setLocalStorage();
    }

    componentWillUnmount() {

        /* Set local storage with toggle required fields value. */
        this.setLocalStorage();
    }

    shouldComponentUpdate(_, nextState) {

        const {showAllMetadata} = this.state;

        return nextState.showAllMetadata !== showAllMetadata;
    }

    getLocalStorage = () => {

        /* Grab the local storage value. */
        /* Note, returned value from local storage is a string. */
        const showMetadata = localStorage.getItem("showMetadata") === "true";

        this.setState({showAllMetadata: showMetadata});
    };

    setLocalStorage = () => {

        const {showAllMetadata} = this.state;

        /* Store required fields toggle value. */
        localStorage.setItem("showMetadata", showAllMetadata);
    };

    render() {
        const {children} = this.props,
            {showAllMetadata, onHandleToggleRequiredFields} = this.state;
        return (
            <ContextMetadataToggleRequiredFields.Provider value={{showAllMetadata, onHandleToggleRequiredFields}}>
                {children}
            </ContextMetadataToggleRequiredFields.Provider>
        )
    }
}

export default ProviderMetadataToggleRequiredFields;
