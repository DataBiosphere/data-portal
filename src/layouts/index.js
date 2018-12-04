/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal root component; works as wrapper around site component.
 */

// Core dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// App dependencies
import Site from './site';

require(`prismjs/themes/prism-solarizedlight.css`);
require(`katex/dist/katex.min.css`);

const Layout = ({children, data}) => (
    <div>
        <Helmet>
            <title>{data.site.siteMetadata.title}</title>
            <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Mono"/>
            <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css"/>
        </Helmet>
        <Site children={children()}/>
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
