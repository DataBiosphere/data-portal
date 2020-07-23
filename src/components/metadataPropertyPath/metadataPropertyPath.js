/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata property path component.
 */

// Core dependencies
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

// Styles
import compStyles from "./metadataPropertyPath.module.css";
import fontStyles from "../../styles/fontsize.module.css";

const classNames = require("classnames");

class MetadataPropertyPath extends React.Component {

    render() {
        const {activeProperty, firstInGroup, unfriendly} = this.props;
        const classUnFriendly = classNames({[compStyles.active]: activeProperty}, fontStyles.hcaCode, compStyles.unfriendly);
        const paths = unfriendly.split(".");
        const pathCount = paths.length;

        const UnFriendlyPath = (props) => {
            const {counter, pathCount, pathName} = props;
            const dot = counter !== 0 ? <span>.</span> : null;
            const fileCopyIcon = (counter === pathCount - 1) ? <i className="material-icons">file_copy</i> : null;
            return (
                <span>{dot}<span>{pathName}</span>{fileCopyIcon}</span>
            )
        };

        const UnFriendly = () => {

            return (
                <CopyToClipboard text={unfriendly}>
                        <span className={classUnFriendly}>
                            {paths.map((pathName, i) => <UnFriendlyPath key={i}
                                                                        counter={i}
                                                                        pathCount={pathCount}
                                                                        pathName={pathName}/>)}
                        </span>
                </CopyToClipboard>
            )
        };

        return (
            firstInGroup ? null : <UnFriendly/>
        );
    }
}

export default MetadataPropertyPath;
