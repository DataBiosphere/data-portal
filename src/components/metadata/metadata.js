/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';
import compStyles from './metadata.module.css'

// App dependencies
import Linkify from 'react-linkify';

let classNames = require('classnames');

class Metadata extends React.Component {

    constructor(props) {
        super(props);
    }

    getRequiredClassName = (isFieldRequired) => {

        return classNames({
            [compStyles.metadataName]: true,
            [compStyles.showTooltip]: isFieldRequired
        });
    };

    render() {
        return (
            <div>
                <h3>{this.props.entity.title}</h3>
                <div>
                    {this.props.entity.properties.filter((element) => {
                        return element.name !== "describedBy" && element.name !== "schema_version" && element.name !== "schema_type";
                    }).map((element, i) => <div key={i} className={compStyles.metadataRow}>
                        <div className={this.getRequiredClassName(element.required)}>
                            <span>{element.userFriendly ? element.userFriendly : element.name}<span>{element.required ? '*' : null}</span></span>
                        </div>
                        <Linkify>{element.description}</Linkify>
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Metadata;
