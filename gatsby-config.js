/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby configuration file.
 */


// gatsby-config.js

let contentPath = `${__dirname}/node_modules/data-portal-content/content`;
let metadataSchemaDocsPath = `${__dirname}/_metadata-schema/docs`;
let metadataSchemaJsonPath = `${__dirname}/_metadata-schema/json_schema`;

if (process.env.GATSBY_DEV_ENV == "LOCAL") {
	console.log("LAUNCHING USING LOCAL CONFIG");
	// uncomment to use the local content repo vs the npm repo.
	// contentPath = "/Users/franmcdade/sandbox/data-portal-content/content";
	// contentPath = "/Users/dave/projects/data-portal-content/content";
	metadataSchemaDocsPath = "../hca-metadata-schema/docs";
	metadataSchemaJsonPath = "../hca-metadata-schema/json_schema"
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
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: contentPath,
				name: "markdown-pages",
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: metadataSchemaDocsPath,
				name: "metadata-markdown-pages",
			}
		},
		`gatsby-transformer-json-schema`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: metadataSchemaJsonPath,
				name: "json-schema",
			},
		},
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: "./images/favicon/favicon.png",

				// WebApp Manifest Configuration
				appName: 'Gatsby site',
				appDescription: null,
				developerName: null,
				developerURL: null,
				dir: 'auto',
				lang: 'en-US',
				background: '#fff',
				theme_color: '#fff',
				display: 'standalone',
				orientation: 'any',
				start_url: '/?homescreen=1',
				version: '1.0',

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
			resolve: `gatsby-transformer-remark`,
			options: {
				excerpt_separator: `<!-- end -->`,
				plugins: [
					`gatsby-remark-autolink-headers`,
					{
						resolve: "gatsby-remark-copy-linked-files",
						options: {
							// dont copy linked markdown files but do the normal skipping of images so they can be handled by gatsby-remark-images
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
						resolve: "gatsby-remark-external-links",
						options: {
							target: "_blank",
							rel: "nofollow"
						}
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 740,
							linkImagesToOriginal: false,
						}
					},
					`gatsby-remark-katex`,
					`gatsby-remark-prismjs`,
					`gatsby-remark-responsive-iframe`,
					'gatsby-remark-relative-linker'
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
