/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';

class Metadata extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>{this.props.entity.title}</h3>
                <table>
                    <tbody>
                    {this.props.entity.properties.filter((element) => {
                        return element.name !=="describedBy" && element.name !=="schema_version" && element.name !== "schema_type";
                    }).map((element, i) => <tr key={i}>
                        <td><strong>{element.userFriendly ? element.userFriendly : element.name}</strong></td>
                        <td>{element.description}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Metadata;
