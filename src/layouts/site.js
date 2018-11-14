/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal site component.
 */

// Core dependencies
import React from 'react';

// App dependencies
import Banner from '../components/banner/banner';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import compStyles from './site.module.css';

let classNames = require('classnames');

class Site extends React.Component {

    constructor(props) {
        super(props);
        this.state = {noScroll: false};
    }

    onMenuOpen = (event) => {
        this.setState({noScroll: !event});
    };

    render() {
        return (
            <div className={classNames({[compStyles.site]: true, [compStyles.noScroll]: this.state.noScroll})}>
                <Header onMenuOpen={this.onMenuOpen.bind(this)}/>
                <Banner type={"environment"}/>
                <div className={compStyles.content}>
                    {this.props.children}
                </div>
                <Banner type={"privacy"}/>
                <Footer/>
            </div>
        );
    }
}

export default Site;
