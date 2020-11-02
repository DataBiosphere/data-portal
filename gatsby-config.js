/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby configuration file.
 */

// Template variables
let contentPath = `${__dirname}/content`;
let metadataSchemaDocsPath = `${__dirname}/_metadata-schema/docs`;
let hcaGithubSystemStatusDocsPath = `${__dirname}/humancellatlas.github.io`;
let yamlPath = `${__dirname}/content`;

if (process.env.GATSBY_ENV == "LOCAL") {
    console.log("LAUNCHING USING LOCAL CONFIG");
    contentPath = './content';
    yamlPath = './content';
    metadataSchemaDocsPath = '../hca-metadata-schema/docs';
    hcaGithubSystemStatusDocsPath = '../humancellatlas.github.io';
}

let gtmId = process.env.GATSBY_GTM_ID;
let gtmAuth = process.env.GATSBY_GTM_AUTH;
let gtmEnvName = process.env.GATSBY_ENV_NAME;

module.exports = {
    siteMetadata: {
        title: 'HCA Data Portal'
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-tagmanager`,
            options: {
                id: gtmId,

                // Include GTM in development.
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,

                // Specify optional GTM environment details.
                gtmAuth: gtmAuth,
                gtmPreview: gtmEnvName,
            },
        },
        `gatsby-plugin-react-svg`,
        `gatsby-source-metadata`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: contentPath,
                name: 'markdown-pages',
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: metadataSchemaDocsPath,
                name: 'metadata-markdown-pages',
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: hcaGithubSystemStatusDocsPath,
                name: 'status-markdown-pages',
            }
        },
        `gatsby-transformer-json-system-status`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: hcaGithubSystemStatusDocsPath,
                name: 'json-status',
            },
        },
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: yamlPath,
            },
        },
        {
            resolve: `gatsby-plugin-favicon`,
            options: {
                logo: './images/favicon/favicon.png',

                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: false
                }
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
            resolve: `gatsby-plugin-sharp`,
            options: {
                quality: 100
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                excerpt_separator: `<!-- end -->`,
                plugins: [
                    {
                        resolve: "gatsby-remark-component",
                        options: {components: ["internal-link", "data-lifecycle-diagram", "link-to-browser", "system-status"]}
                    },
                    {
                        resolve: `gatsby-remark-copy-linked-files`,
                        options: {
                            // don't copy linked markdown files but do the normal skipping of images so they can be handled by gatsby-remark-images
                            ignoreFileExtensions: ['png', 'jpg', 'jpeg', 'bmp', 'tiff', 'md'],
                        }
                    },
                    {
                        resolve: `gatsby-remark-embed-video`,
                        options: {
                            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
                            height: 316,
                            width: 560,
                            related: false //Optional: Will remove related videos from the end of an embedded YouTube video.
                        }
                    },
                    {
                        resolve: `gatsby-remark-external-links`,
                        options: {
                            target: '_blank',
                            rel: 'nofollow'
                        }
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 640,
                            linkImagesToOriginal: false
                        }
                    },
                    `gatsby-remark-images-medium-zoom`,
                    `gatsby-remark-katex`,
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-responsive-iframe`,
                    `gatsby-remark-metadata-absolute-linker`,
                    `gatsby-remark-relative-linker`,
                    `gatsby-remark-autointernallink-headers`
                ],
            },
        },
        // `gatsby-plugin-catch-links`,
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: 'src/utils/typography.js'
            }
        }
    ]
};
