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

// Images
import favicon from "../../images/favicon/favicon.png";

const Attributions = () => (
        <div>
            <Section sectionTitle={"Attributions"}/>
            <TabNav noTab={true}/>
                <div className={compStyles.wrapper}>
                    <div className={compStyles.hcaContent}>
                        <div className={compStyles.attributions}>
                            <img className={compStyles.mosaic} src={favicon}/>
                            <p className={compStyles.s}>The mosaic circle is a trademark of the Human Cell Atlas consortium, registered by Broad
                                Institute and used with permission.</p>
                        </div>
                    </div>
                </div>
            </div>
    )
;

export default Attributions;
