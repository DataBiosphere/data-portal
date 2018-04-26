/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby configuration file.
 */

module.exports = {
    siteMetadata: {
        title: 'HCA Data Portal'
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-react-css-modules',
            options: {
                filetypes: {
                    '.scss': {syntax: 'postcss-scss'},
                },
                // Exclude global styles from the plugin
                exclude: '\/global\/'
            }
        },
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.js',
            }
        }
    ]
};
