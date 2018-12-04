/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal banner component.
 */

// Core dependencies
import Environment from './environment'
import Privacy from './privacy'
import React from 'react';
import compStyles from './banner.module.css'

const classNames = require('classnames');

class Banner extends React.Component {

    getBannerClassName = (bannerType) => {

        if (bannerType === "environment") {

            return classNames({
                [compStyles.banner]: true,
                [compStyles.environment]: true
            });
        }

        return classNames({
            [compStyles.banner]: true
        });
    };

    isTestEnvironment = () => {

        let environment = process.env.GATSBY_EXPLORE_URL.split("//")[1].split(".")[0];
        return ((environment === "dev") || (environment === "integration") || (environment === "staging"));
    };

    render(props) {
        let testMessage = "This is a test environment and periodically may be unavailable and/or may contain test data.",
            prodMessage = "This is a Beta test environment and periodically features, content, or data may change or be unavailable.";
        return (
            <div className={this.getBannerClassName(this.props.type)}>
                {this.props.type === "environment" ? this.isTestEnvironment() ?
                    <Environment cookieName="environmentAccepted" message={testMessage}/> : <Environment cookieName="prodEnvironmentAccepted" message={prodMessage}/> : null}
                {this.props.type === "privacy" ? <Privacy cookieName="privacyAccepted"/> : null}
            </div>
        );
    }
}

export default Banner;
