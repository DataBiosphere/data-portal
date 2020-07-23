/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata toggle required fields component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ToggleButton from "../toggleButton/toggleButton";

// Styles
import buttonStyles from "../toggleButton/toggleButton.module.css";

class MetadataToggleRequiredFields extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({showAllMetadata: true});
    }

    componentDidMount() {

        const showMetadata = localStorage.getItem("showMetadata") !== "false";
        this.setState({showAllMetadata: showMetadata});
    }

    componentDidUpdate(_, prevState) {

        if ( prevState !== this.state ) {

            const {showAllMetadata} = this.state;

            localStorage.setItem("showMetadata", showAllMetadata);
            this.props.handleToggle(showAllMetadata);
        }
    }

    componentWillUnmount() {

        localStorage.setItem("showMetadata", this.state.showAllMetadata);
    }

    toggleRequiredMetadata = () => {

        const {showAllMetadata} = this.state;
        this.setState({showAllMetadata: !showAllMetadata});
    };

    render() {
        const {showAllMetadata} = this.state;
        const toggleMessage = showAllMetadata ? "Show Required Fields Only" : "Show All Fields";
        return (
            <ToggleButton className={buttonStyles.metadata}
                          clickAction={this.toggleRequiredMetadata}>{toggleMessage}</ToggleButton>
        );
    }
}

export default MetadataToggleRequiredFields;
