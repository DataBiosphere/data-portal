/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Imports
const path = require('path');
const {createFilePath} = require(`gatsby-source-filesystem`);
const siteMap = require('./src/siteMap');


// find our template files
const contentTemplate = path.resolve(`src/templates/contentTemplate.js`);
const metadataTemplate = path.resolve(`src/templates/metadataTemplate.js`);


function getTemplate(templateName) {

	// see if there is a template matching the template name from the front matter.
	if (templateName === 'metadataTemplate') {
		return metadataTemplate;
	}

	// if not return the default content template.
	return contentTemplate;
}


exports.createPages = ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators;


	// create the markdown pages
	return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              path
              template
              metadataCoreName
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
		result.data.allMarkdownRemark.edges.forEach(({node}) => {

			// create the page

			let path;
			if (!node.frontmatter.path) {
				path = getPath(node.id);
			} else {
				path = node.frontmatter.path
			}

			if (path) {
				createPage({
					path: siteMap.getPath(path),
					component: getTemplate(node.frontmatter.template),  // extract template name from front matter and use it to retrieve the template.
					context: {id: node.id, metadataCoreName: node.frontmatter.metadataCoreName} // additional data can be passed via context
				});
			}
		});
	});

};


// Create slugs for files.
exports.onCreateNode = ({node, getNode, boundActionCreators}) => {

	const {createNodeField} = boundActionCreators;

	if (node.internal.type === 'MarkdownRemark') {

		// path can come from frontmatter or... from associating a title to path
		let path;
		if (!node.frontmatter.path) {
			path = getPath(node.id);
		} else {
			path = node.frontmatter.path
		}

		const relativeFilePath = createFilePath({
			node,
			getNode,
			basePath: ""
		});

		//this adds the path under "fields"
		createNodeField({
			node,
			name: 'path',
			value: path
		});

		//this adds the gitHubPath under "fields"
		createNodeField({
			node,
			name: 'gitHubPath',
			value: relativeFilePath
		});
	}
};

function getPath(markdownId) {

	if (markdownId.includes('docs/structure.md')) {
		return '/learn/metadata/structure';
	} else if (markdownId.includes('docs/rationale.md')) {
		return '/learn/metadata/rationale';
	}

	else {
		return null;
	}
}



