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
import Header from '../components/header/header';
import compStyles from './index.module.css';

const Layout = ({children, data}) => (
    <div className={compStyles.site}>
        <Helmet>
            <title>{data.site.siteMetadata.title}</title>
            <link rel="stylesheet" href="https://use.typekit.net/qhb0geh.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title}/>
        <div
            style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0,
            }}
        >
            {children()}
        </div>
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
