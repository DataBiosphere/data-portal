/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React from 'react';

let metadataTable = [
    {
        title: "Donor Organism",
        elements: [
            {
                name: "Biomaterial ID",
                description: "A unique ID for this biomaterial"
            },
            {
                name: "Biomaterial Name",
                description: "A short, descriptive name for the biomaterial that need not be unique"
            },
            {
                name: "Biomaterial Description",
                description: "A general description of the biomaterial"
            }
        ]
    }];

class Metadata extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h3>{metadataTable[0].title}</h3>
                <table>
                    <tbody>
                    {metadataTable[0].elements.map((element, i) => <tr key={i}>
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
