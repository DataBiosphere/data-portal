/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata displaying component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";

class ProviderMetadataDisplaying extends React.Component {

    constructor(props) {
        super(props);
        this.highlightTimerRef = React.createRef();

        this.onHandleSearchHit = (e) => {

            this.setState({highlightActive: true, highlightValue: e})
        };

        this.onHandleToggleRequiredFields = () => {

            const {showAllMetadata} = this.state;

            this.setState({showAllMetadata: !showAllMetadata});
        };

        this.state = ({
            highlightActive: false,
            highlightValue: "",
            showAllMetadata: true,
            onHandleSearchHit: this.onHandleSearchHit,
            onHandleToggleRequiredFields: this.onHandleToggleRequiredFields
        });
    }

    componentDidMount() {

        /* Get the local storage toggle required fields value. */
        this.getLocalStorage();
    }

    componentDidUpdate(_, prevState) {

        this.setLocalStorage();
        this.onUpdateHighlight(prevState);
    }

    componentWillUnmount() {

        /* Set local storage with toggle required fields value. */
        this.setLocalStorage();
    }

    getLocalStorage = () => {

        /* Grab the local storage values. */
        /* Note, returned value from local storage is a string. */
        const highlightActive = localStorage.getItem("highlightActive") === "true";
        const highlightValue = localStorage.getItem("highlightValue");
        const showMetadata = localStorage.getItem("showMetadata") === "true";

        this.setState({highlightActive: highlightActive, highlightValue: highlightValue, showAllMetadata: showMetadata});
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

    setLocalStorage = () => {

        const {highlightActive, highlightValue, showAllMetadata} = this.state;

        /* Set the local storage values. */
        localStorage.setItem("highlightActive", highlightActive);
        localStorage.setItem("highlightValue", highlightValue);
        localStorage.setItem("showMetadata", showAllMetadata);
    };

    render() {
        const {children} = this.props,
            {highlightValue, highlightActive, showAllMetadata, onHandleSearchHit, onHandleToggleRequiredFields} = this.state;
        return (
            <ContextMetadataDisplaying.Provider value={{highlightActive, highlightValue, showAllMetadata, onHandleSearchHit, onHandleToggleRequiredFields}}>
                {children}
            </ContextMetadataDisplaying.Provider>
        )
    }
}

export default ProviderMetadataDisplaying;
