/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata displaying component.
 */

// Core dependencies
import {navigate} from "gatsby";
import React from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";

class ProviderMetadataDisplaying extends React.Component {

    constructor(props) {
        super(props);
        this.highlightTimerRef = React.createRef();

        this.onHandleNavigationHit = (result) => {

            const {showAllMetadata} = this.state;
            const {primaryRequired, required, type, urlTo} = result || {};
            const toggleMetadata = !showAllMetadata && /property/.test(type) && !(required && primaryRequired);

            /* Toggle required fields "Show required fields only". */
            /* If the result is a property, and the property is not required. */
            /* Then set showAllMetadata to true to ensure the result is viewable. */
            if ( toggleMetadata ) {

                this.setState({showAllMetadata: true});
            }

            /* Handle the display of highlight on search hit result page. */
            this.onHandleSearchHit(urlTo);

            /* Navigate. */
            navigate(urlTo);
        };

        this.onHandleToggleRequiredFields = () => {

            const {showAllMetadata} = this.state;

            this.setState({showAllMetadata: !showAllMetadata});
        };

        this.state = ({
            highlightActive: false,
            highlightValue: "",
            showAllMetadata: true,
            onHandleNavigationHit: this.onHandleNavigationHit,
            onHandleToggleRequiredFields: this.onHandleToggleRequiredFields
        });
    }

    componentDidMount() {

        /* Get the local storage values. */
        this.getLocalStorageValues();
    }

    componentDidUpdate(_, prevState) {

        this.setLocalStorageValues();
        this.onUpdateHighlight(prevState);
    }

    componentWillUnmount() {

        /* Set local storage values. */
        this.setLocalStorageValues();

        /* Clear timeout. */
        clearTimeout(this.highlightTimerRef.current);
    }

    getLocalStorageValues = () => {

        /* Grab the local storage values. */
        /* Note, returned value from local storage is a string. */
        const highlightActive = localStorage.getItem("highlightActive") === "true";
        const highlightValue = localStorage.getItem("highlightValue");
        const showMetadata = localStorage.getItem("showMetadata") === "true";

        this.setState({highlightActive: highlightActive, highlightValue: highlightValue, showAllMetadata: showMetadata});
    };

    onHandleSearchHit = (urlTo) => {

        this.setState({highlightActive: true, highlightValue: urlTo})
    };

    onUpdateHighlight = (prevState) => {

        const {highlightValue} = this.state;
        const stateChanged = prevState.highlightValue !== highlightValue;

        if ( stateChanged ) {

            /* Clear any previously set timeout. */
            if ( this.highlightTimerRef.current ) {

                clearTimeout(this.highlightTimerRef.current);
            }

            /* Set and maintain highlight for a period, and then clear the highlight. */
            this.highlightTimerRef.current = setTimeout(() => {

                this.setState({highlightActive: false, highlightValue: ""})
            }, 10000);
            return () => clearTimeout(this.highlightTimerRef.current);
        }
    };

    setLocalStorageValues = () => {

        const {highlightActive, highlightValue, showAllMetadata} = this.state;

        /* Set the local storage values. */
        localStorage.setItem("highlightActive", highlightActive);
        localStorage.setItem("highlightValue", highlightValue);
        localStorage.setItem("showMetadata", showAllMetadata);
    };

    render() {
        const {children} = this.props,
            {highlightValue, highlightActive, showAllMetadata, onHandleNavigationHit, onHandleToggleRequiredFields} = this.state;
        return (
            <ContextMetadataDisplaying.Provider value={{highlightActive, highlightValue, showAllMetadata, onHandleNavigationHit, onHandleToggleRequiredFields}}>
                {children}
            </ContextMetadataDisplaying.Provider>
        )
    }
}

export default ProviderMetadataDisplaying;
