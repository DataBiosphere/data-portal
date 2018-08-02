/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

const path = require("path");

// find our template files
const aboutOverviewTemplate = path.resolve(`src/templates/aboutOverviewTemplate.js`);
const contentTemplate = path.resolve(`src/templates/contentTemplate.js`);
const contributeOverviewTemplate = path.resolve(`src/templates/contributeOverviewTemplate.js`);



function getTemplate(templateName) {

    // see if there is a template matching the template name from the front matter.
    if (templateName === "aboutOverviewTemplate") {
        return aboutOverviewTemplate;
    }
    if (templateName === "contributeOverviewTemplate") {
        return contributeOverviewTemplate;
    }

    // if not return the default content template.
    return contentTemplate;
}






exports.createPages = ({ boundActionCreators, graphql }) => {
    const { createPage } = boundActionCreators;


    // create the markdown pages
    graphql(`
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
              linked {
               childMarkdownRemark{
                frontmatter{
                    title
                    subTitle
                }
               }
              }
            }
          }
        }
      }
    }
      `).then(result => {

        // if there is an error return
        if (result.errors) {
            return Promise.reject(result.errors);
        }

        // for each mardown page
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            console.log(node.frontmatter.path);

            // create the page
            createPage({
                path: node.frontmatter.path,
                component: getTemplate(node.frontmatter.template),  // extract template name from front matter and use it to retrieve the template.
                context: {}, // additional data can be passed via context
            });
        });
    });


};


