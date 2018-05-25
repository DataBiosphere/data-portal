/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal learn template component.
 */

// Core dependencies
import React from "react";

var classNames = require('classnames');

// App dependencies
import compStyles from './learn.module.css';

let getTabClassName = () => {
    return classNames({
        [compStyles.hcaTab]: true,
        [compStyles.active]: false
    });
};

const LearnPage = () => (
        <div>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaHeading}>Learn</div>
            </div>
            <div className={compStyles.hcaTabs}>
                <div className={compStyles.wrapper}>
                    <div className={compStyles.hcaTabList}>
                        <div className={getTabClassName()}>How it works</div>
                        <div className={classNames(compStyles.hcaTab, compStyles.active)}>Userguides</div>
                        <div className={getTabClassName()}>Metadata Dictionary</div>
                    </div>
                </div>
            </div>
            <div className={compStyles.wrapper}>
                <div className={compStyles.hcaContent}>
                    <ul className={compStyles.hcaContentNav}>
                        <li><span>Accessing Data</span></li>
                        <li className={compStyles.expanded}>
                            <span>Contributing Data</span>
                            <ul>
                                <li><span>About</span></li>
                                <li className={compStyles.selected}><span>How to upload data</span></li>
                                <li><span>Prepping your metadata CSV</span></li>
                                <li><span>Submission</span></li>
                                <li><span>FAQs</span></li>
                            </ul>
                        </li>
                        <li><span>Learning about analysis pipelines</span></li>
                    </ul>
                    <div>I am content</div>
                </div>
            </div>
        </div>
    )
;

export default LearnPage;

