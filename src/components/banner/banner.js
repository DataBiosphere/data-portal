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
        return (
            <div className={this.getBannerClassName(this.props.type)}>
                {this.isTestEnvironment() && this.props.type === "environment" ?
                    <Environment cookieName="environmentAccepted"/> : null}
                {this.props.type === "privacy" ? <Privacy cookieName="privacyAccepted"/> : null}
            </div>
        );
    }
}

export default Banner;
