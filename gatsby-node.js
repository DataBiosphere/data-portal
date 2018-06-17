/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;

    const contentTemplate = path.resolve(`src/templates/contentTemplate.js`);
    const aboutOverviewTemplate = path.resolve(`src/templates/aboutOverviewTemplate.js`);

    function getTemplate(templateName)
    {
        if (templateName) {
            return aboutOverviewTemplate;
        }
        return contentTemplate;
    }

    return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              template
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: getTemplate(node.frontmatter.template),
                context: {}, // additional data can be passed via context
            });
        });
    });
};
