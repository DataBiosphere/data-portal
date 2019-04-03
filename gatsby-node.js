/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Imports
const path = require('path');
const {createFilePath} = require(`gatsby-source-filesystem`);

// find our template files
const contentTemplate = path.resolve(`src/templates/contentTemplate.js`);
const metadataTemplate = path.resolve(`src/templates/metadataTemplate.js`);
const systemStatusTemplate = path.resolve(`src/templates/systemStatusTemplate.js`);

function getTemplate(templateName) {

	// see if there is a template matching the template name from the front matter.
	if (templateName === 'metadataTemplate') {
		return metadataTemplate;
	}

	if (templateName === 'systemStatusTemplate') {
		return systemStatusTemplate;
	}

	// if not return the default content template.
	return contentTemplate;
}

// Returns document path or key.
function getKeyOrPath(key, siteMapPathOrKey) {

	const path = siteMapPathOrKey.get(key);

	if (path) {
		return path;
	}
	else {
		return key
	}
}

// sections -> tabs -> primary docs -> secondary docs
function keyToPath(siteMap) {
	return siteMap.reduce((acc, section) => {
		if (section.tabs) {
			return section.tabs.reduce((acc, tab) => {
				return tab.primaryLinks.reduce((acc, pLink) => {
					addToMap(acc, pLink);
					if (pLink.secondaryLinks) {
						pLink.secondaryLinks.forEach(sLink => addToMap(acc, sLink));
					}
					return acc;
				}, acc);
			}, acc);
		}
		return acc;
	}, new Map());
}

function addToMap(acc, doc) {

	if (doc.path) {
		acc.set(doc.key, doc.path);
	} else {
		acc.set(doc.key, doc.key);
	}
}

exports.createPages = ({actions, graphql}) => {
	const {createPage} = actions;

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
            fileAbsolutePath
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
	  allSiteMapYaml {
		  edges {
			  node {
				name
				key
				path
				tabs {
					name
					key
					primaryLinks {
						name
						key
						path
						secondaryLinks {
							name
							key
							path
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

		// get siteMap from data-portal-content
		let yamlSiteMap = result.data.allSiteMapYaml.edges.map(n => n.node);

		let yamlSiteMapPathOrKey = keyToPath(yamlSiteMap);

		// for each markdown page
		result.data.allMarkdownRemark.edges.forEach(({node}) => {

			// create the page

			let path;
			if (!node.frontmatter.path) {
				path = getPath(node.fileAbsolutePath);
			} else {
				path = node.frontmatter.path
			}

			if (path) {
				createPage({
					path: getKeyOrPath(path, yamlSiteMapPathOrKey),
					component: getTemplate(node.frontmatter.template),  // extract template name from front matter and use it to retrieve the template.
					context: {id: node.id, metadataCoreName: node.frontmatter.metadataCoreName} // additional data can be passed via context
				});
			}
		});
	});

};


// Create slugs for files.
exports.onCreateNode = ({node, getNode, actions}) => {

	const {createNodeField} = actions;

	if (node.internal.type === 'MarkdownRemark') {

		// path can come from frontmatter or... from associating a title to path
		let path;
		if (!node.frontmatter.path) {
			path = getPath(node.fileAbsolutePath);
		} else {
			path = node.frontmatter.path
		}

		const relativeFilePath = createFilePath({node, getNode, basePath: ''});

		//this adds the path under "fields"
		createNodeField({node, name: 'path', value: path});

		//this adds the gitHubPath under "fields"
		createNodeField({node, name: 'gitHubPath', value: relativeFilePath});
	}
};

function getPath(markdownId) {

	if (markdownId && markdownId.includes('docs/structure.md')) {
		return '/metadata/metadata/structure';
	} else if (markdownId && markdownId.includes('docs/rationale.md')) {
		return '/metadata/metadata/rationale';
	}

	else {
		return null;
	}
}



