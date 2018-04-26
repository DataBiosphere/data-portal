/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby configuration file.
 */

module.exports = {
    siteMetadata: {
        title: 'HCA Data Portal',
    },
    plugins: [
        {
            resolve: `gatsby-plugin-react-css-modules`,
            options: {
                // *.css files are included by default.
                // To support another syntax (e.g. SCSS),
                // add `postcss-scss` to your project's devDependencies
                // and add the following option here:
                filetypes: {
                    ".scss": { syntax: `postcss-scss` },
                },
                // Exclude global styles from the plugin using a RegExp:
                exclude: `\/global\/`
            }
        },
        'gatsby-plugin-react-helmet'
    ],
};
