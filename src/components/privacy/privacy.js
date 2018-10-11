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
import compStyles from './privacy.module.css'

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
                <div className={compStyles.wrapper}>
                    <div>
                        <p className={compStyles.xxs}>This website requires cookies, and the limited processing of your
                            personal
                            data in order to function.</p>
                        <p className={compStyles.xxs}><span>By using the site you are agreeing to this as outlined in our </span>
                            <Link to="/privacy/privacy/privacy">Privacy Notice</Link><span>.</span></p>
                    </div>
                    <a className={compStyles.dismiss} onClick={() => {
                        this.accept()
                    }}>I agree, dismiss this banner</a>
                </div>
            </div>
        );
    }
}

export default Privacy;
export {Cookies};
