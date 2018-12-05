/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal production environment component.
 */

// Core dependencies
import Cookies from "js-cookie";
import React from 'react';
import compStyles from './environment.module.css'

class Environment extends React.Component {

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
            <div className={compStyles.environment}>
                <div className={compStyles.wrapper}>
                    <div>
                        <p className={compStyles.s}>{this.props.message}</p>
                    </div>
                    <a className={compStyles.dismiss} onClick={() => {
                        this.accept()
                    }}>Ok</a>
                </div>
            </div>
        );
    }
}

export default Environment;
export {Cookies};
