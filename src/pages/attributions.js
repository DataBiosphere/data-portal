/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying attributions page.
 */

// Core dependencies
import compStyles from './attributions.module.css';
import React from 'react';
import Section from "../components/section/section";
import TabNav from "../components/tabNav/tabNav";

const Attributions = () => (
    <div>
        <Section sectionTitle={"Attributions"}/>
        <TabNav noTab={true}/>
        <div className={compStyles.error}>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <p>The mosaic circle is a trademark of the Human Cell Atlas consortium, registered by Broad Institute and used with permission.</p>
                </div>
            </div>
        </div>
    </div>
);

export default Attributions;
