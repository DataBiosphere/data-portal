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
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/markdown`,
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
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 740,
                        },
                    },
                    {
                        resolve: "gatsby-remark-embed-video",
                        options: {
                            width: 800,
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            height: 400, // Optional: Overrides optional.ratio
                            related: false //Optional: Will remove related videos from the end of an embedded YouTube video.
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-katex`,
                    `gatsby-remark-autolink-headers`,
                    `gatsby-remark-copy-linked-files`
                ],
            },
        },
        `gatsby-plugin-catch-links`,
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.js',
            }
        }
    ]
};
