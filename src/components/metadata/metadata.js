/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';
import compStyles from './metadata.module.css'

class Metadata extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>{this.props.entity.title}</h3>
                <div>
                    {this.props.entity.properties.filter((element) => {
                        return element.name !== "describedBy" && element.name !== "schema_version" && element.name !== "schema_type";
                    }).map((element, i) => <div key={i} className={compStyles.metadataRow}>
                        <span>{element.userFriendly ? element.userFriendly : element.name}</span>
                        <span>{element.description}</span>
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Metadata;
