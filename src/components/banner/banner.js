/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal banner component.
 */

// Core dependencies
import Environment from './environment'
import Privacy from './privacy';
import React from 'react';
import compStyles from './banner.module.css'

class Banner extends React.Component {

    isTestEnvironment = () => {

        let environment = process.env.GATSBY_EXPLORE_URL.split("//")[1].split(".")[0];
        return ((environment === "dev") || (environment === "integration") || (environment === "staging"));
    };

    render() {
        return (
            <div className={compStyles.banner}>
                <Privacy cookieName="privacyAccepted"/>
                {this.isTestEnvironment() ? <Environment cookieName="environmentAccepted"/> : null}
            </div>
        );
    }
}

export default Banner;
