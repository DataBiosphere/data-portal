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
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <h3>{this.props.entity.entity}</h3>
                <table>
                    <tbody>
                    {this.props.entity.properties.map((element, i) => <tr key={i}>
                        <td><strong>{element.name}</strong></td>
                        <td>{element.description}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Metadata;
