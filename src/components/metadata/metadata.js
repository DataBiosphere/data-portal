/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Linkify from 'react-linkify';

// Styles
import compStyles from './metadata.module.css'

class Metadata extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={compStyles.metadata}>
                <h3>{this.props.entity.title}</h3>
                <div>
                    {this.props.entity.properties.filter((element) => {
                        return element.name !== "describedBy" && element.name !== "schema_version" && element.name !== "schema_type";
                    }).map((element, i) => <div key={i} className={compStyles.metadataRow}>
                        <div className={compStyles.metadataName}>
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
