/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata property component.
 */

// Core dependencies
import React from "react";
import Linkify from "react-linkify";

// App dependencies
import MetadataPropertyHeader from "../metadataPropertyHeader/metadataPropertyHeader";
import MetadataPropertyPath from "../metadataPropertyPath/metadataPropertyPath";

// Styles
import compStyles from "./metadataProperty.module.css";
import fontStyles from "../../styles/fontsize.module.css";

const classNames = require("classnames");

class MetadataProperty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeProperty: false};
    }

    onMouseEnter = () => {

        this.setState({activeProperty: true});
    };

    onMouseLeave = () => {

        this.setState({activeProperty: false});
    };

    render() {
        const {property, showAllMetadata} = this.props,
            {anchor, dataType, description, example, grouped, label, primary, primaryRequired, required, unfriendly} = property,
            {activeProperty} = this.state;
        const classDataType = classNames(compStyles.type, fontStyles.xxs);
        const classDescription = classNames(compStyles.description, fontStyles.xs);
        const classExample = classNames(compStyles.example, fontStyles.xs);
        const classProperty = classNames({[compStyles.grouped]: grouped}, {[compStyles.primary]: primary}, compStyles.property);
        const firstInGroup = grouped && primary;
        const show = showAllMetadata ? true : (primaryRequired && required);
        return (
            show ?
            <div id={anchor}
                 className={classProperty}
                 onMouseEnter={() => this.onMouseEnter()}
                 onMouseLeave={() => this.onMouseLeave()}
                 role="presentation">
                <div>
                    <MetadataPropertyHeader anchor={anchor}
                                            dataType={dataType}
                                            firstInGroup={firstInGroup}
                                            label={label}
                                            required={required}/>
                    <MetadataPropertyPath activeProperty={activeProperty} firstInGroup={firstInGroup} unfriendly={unfriendly}/>
                    {firstInGroup ? null : <span className={classDataType}>{dataType}</span>}
                    {description ? <Linkify><span className={classDescription}>{description}</span></Linkify> : null}
                    {example ? <span className={classExample}>{example}</span> : null}
                </div>
            </div> : null
        );
    }
}

export default MetadataProperty;
