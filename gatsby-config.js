/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby configuration file.
 */


// gatsby-config.js

module.exports = {
    siteMetadata: {
        title: 'HCA Data Portal'
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/node_modules/data-portal-content/content`,
                path: `/Users/dave/projects/data-portal-content/content`,

        name: "markdown-pages",
            }
        },
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
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                excerpt_separator: `<!-- end -->`,
                plugins: [
                    `gatsby-remark-autolink-headers`,
                    `gatsby-remark-copy-linked-files`,
                    {
                        resolve: `gatsby-remark-embed-video`,
                        options: {
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            height: 316,
                            width: 560,
                            related: false //Optional: Will remove related videos from the end of an embedded YouTube video.
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 740,
                        },
                    },
                    `gatsby-remark-katex`,
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-responsive-iframe`
                ],
            },
        },
        `gatsby-plugin-catch-links`,
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.js',
                EXPLORE_URL: `${process.env.EXPLORE_URL}`
            }
        }
    ]
};
