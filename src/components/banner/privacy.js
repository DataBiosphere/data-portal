/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal privacy component.
 */

// Core dependencies
import Cookies from "js-cookie";
import Link from 'gatsby-link';
import React from 'react';

// Styles
import compStyles from './privacy.module.css'
import fontStyles from '../../styles/fontsize.module.css';
import globalStyles from '../../styles/global.module.css';

let classNames = require('classnames');

class Privacy extends React.Component {

    constructor(props) {
        super(props);
        this.accept.bind(this);
        this.state = {visible: false};
    }

    componentDidMount() {

        const {cookieName} = this.props;

        if (Cookies.get(cookieName) === undefined) {
            this.setState({visible: true});
        }

        if (Cookies.get(cookieName) === true) {
            this.setState({visible: false});
        }
    }

    accept = () => {

        const {cookieName} = this.props;

        Cookies.set(cookieName, true);
        this.setState({visible: false});
    };

    render() {

        if (!this.state.visible) {
            return null;
        }

        return (
            <div className={compStyles.privacy}>
                <div className={globalStyles.bannerWrapper}>
                    <div>
                        <p className={classNames(fontStyles.xxs, fontStyles.noMargin)}>This website requires cookies,
                            and the limited processing of your
                            personal data in order to function.</p>
                        <p className={classNames(fontStyles.xxs, fontStyles.noMargin)}><span>By using the site you are agreeing to this as outlined in our </span>
                            <Link to="/privacy/privacy/privacy">Privacy Notice</Link><span>.</span></p>
                    </div>
                    <a className={classNames(globalStyles.button, globalStyles.primary, globalStyles.outline, compStyles.narrow)} onClick={() => {
                        this.accept()
                    }}>I agree, dismiss this banner</a>
                </div>
            </div>
        );
    }
}

export default Privacy;
export {Cookies};
