/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby configuration file.
 */

// Template variables
let contentPath = `${__dirname}/content`;
let metadataSchemaDocsPath = `${__dirname}/_metadata-schema/docs`;
let siteMapPath = `${__dirname}/site-map`;

if (process.env.GATSBY_ENV == "LOCAL") {
  console.log("LAUNCHING USING LOCAL CONFIG");
  contentPath = "./content";
  metadataSchemaDocsPath = "../hca-metadata-schema/docs";
}

let gtmId = process.env.GATSBY_GTM_ID;
let gtmAuth = process.env.GATSBY_GTM_AUTH;
let gtmEnvName = process.env.GATSBY_ENV_NAME;

const lungmap = process.env.GATSBY_ATLAS === "lungmap";

const siteMetadata = lungmap ?
  {
    title: "LungMAP Data Browser",
    siteUrl: "https://data-browser.lungmap.net"
  } :
  {
    title: "HCA Data Portal",
    siteUrl: "https://data.humancellatlas.org/"

  };

module.exports = {
  siteMetadata,
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
        gtmPreview: gtmEnvName
      }
    },
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-sitemap`,
    `gatsby-source-metadata`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentPath,
        name: "markdown-pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: metadataSchemaDocsPath,
        name: "metadata-markdown-pages"
      }
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: siteMapPath
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: lungmap
          ? "./images/lungmap/favicon/favicon.png"
          : "./images/favicon/favicon.png",

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
      resolve: "gatsby-plugin-react-css-modules",
      options: {
        filetypes: {
          ".scss": { syntax: "postcss-scss" }
        },
        // Exclude global styles from the plugin
        exclude: "/global/"
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        quality: 100
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: [
          `gatsby-remark-component`,
          {
            resolve: `gatsby-remark-component-parent2div`,
            options: {
              components: [
                "button-cta",
                "internal-link",
                "data-lifecycle-diagram",
                "link-to-browser",
                "metadata-type-entity-schemas"
              ]
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              // don't copy linked markdown files but do the normal skipping of images so they can be handled by gatsby-remark-images
              ignoreFileExtensions: ["png", "jpg", "jpeg", "bmp", "tiff", "md"]
            }
          },
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              ratio: 1.77, // Defaults to 16/9 = 1.77
              height: 316,
              width: 800,
              related: false // Removes related videos from the end of an embedded YouTube video.
            }
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: "_blank",
              rel: "nofollow"
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
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
        ]
      }
    },
    // `gatsby-plugin-catch-links`,
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography.js"
      }
    }
  ]
};
