/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal root component; works as wrapper around page templates.
 */

// Core dependencies
import normalize from 'normalize.css';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

// App dependencies
import Banner from '../components/banner/banner';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import compStyles from './index.module.css';

require(`prismjs/themes/prism-solarizedlight.css`);
require(`katex/dist/katex.min.css`);

const Layout = ({children, data}) => (
    <div className={compStyles.site}>
        <Helmet>
            <title>{data.site.siteMetadata.title}</title>
            <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Mono"/>
            <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css"/>
        </Helmet>
        <Header/>
        <Banner type={"environment"}/>
        <div className={compStyles.content}>
            {children()}
        </div>
        <Banner type={"privacy"}/>
        <Footer/>
    </div>
);

Layout.propTypes = {
    children: PropTypes.func,
};

export default Layout;

export const query = graphql`
    query SiteTitleQuery {
       site {
           siteMetadata {
               title
           }
       }
    }
`;
