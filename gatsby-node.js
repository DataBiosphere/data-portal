/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Gatsby node APIs.
 */

// App dependencies
const express = require("express");
const {createFilePath} = require("gatsby-source-filesystem");
const {buildPostSlug, isPostNodeEnabled, isPostNodeFeatured} = require("./src/utils/node/create-node.service");
const {buildPostPath, getPostTemplate} = require("./src/utils/node/create-pages.service");
const {buildMetadataKeysByTitle,
    buildMetadataLinks,
    getMetadataPostNavigation,
    getPostNavigation,
    removeBlacklistedPosts} = require("./src/utils/node/create-node-navigation.service");
const {buildPostKeysByPath} = require("./src/utils/node/site-map.service");

/**
 * Create new node fields, placed under the "fields" key on the extended node object.
 *
 * @param node
 * @param getNode
 * @param actions
 */
exports.onCreateNode = ({node, getNode, actions}) => {

    const {createNodeField} = actions;
    const {internal, relativeFilePath} = node,
        {type} = internal;

    /* Create new node fields for the posts featured. */
    if ( isPostNodeFeatured(type, relativeFilePath) ) {

        const {frontmatter} = node,
            {draft, version} = frontmatter || {};

        const filePath = createFilePath({node, getNode, basePath: ""});
        const nodeValueEnabled = isPostNodeEnabled(draft, version);
        const nodeValueSlug = buildPostSlug(filePath);

        /* Create nodes */
        /* "enabled" */
        createNodeField({
            node,
            name: "enabled",
            value: nodeValueEnabled
        });
        /* "slug" */
        createNodeField({
            node,
            name: "slug",
            value: nodeValueSlug
        });
    }
};

/**
 * Create pages.
 *
 * @param graphql
 * @param actions
 */
exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              enabled
              slug
            }
            frontmatter {
              path
              template
            }
            id
          }
        }
      }
      allMetadataSchemaEntity(filter: {schemaType: {eq: "type"}}, sort: {fields: title}) {
        edges {
          node {
            fields {
              slug
            }
            id
            title
          }
        }
      }
      allSiteMapYaml {
        edges {
          node {
            key
            name
            path
            tabs {
              key
              name
              primaryLinks {
                key
                name
                path
                secondaryLinks {
                  key
                  name
                  path
                }
              }
            }
          }
        }
      }
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
    `).then(result => {

        /* If there is an error, return. */
        if ( result.errors ) {

            return Promise.reject(result.errors);
        }

        const {data} = result,
            {allMarkdownRemark, allMetadataSchemaEntity, allSiteMapYaml} = data;

        /* For all site map documents associate the document key with a path. */
        /* The postKeysByPath object will shape post navigation outcomes - i.e. the removal of blacklisted posts. */
        const postsKeysByPath = buildPostKeysByPath(allSiteMapYaml, allMarkdownRemark);
        const postsSiteMap = removeBlacklistedPosts(postsKeysByPath, allSiteMapYaml);

        /* For all metadata schema documents associate the document key with a title. */
        const metadataPostsKeysByTitle = buildMetadataKeysByTitle(allMetadataSchemaEntity);

        /* Pre-build the metadata primary and secondary navigation links. */
        const metaLinks = buildMetadataLinks(metadataPostsKeysByTitle);

        /* For each markdown file create a post. */
        allMarkdownRemark.edges.forEach(({node}) => {

            const {id, fields, frontmatter} = node,
                {enabled, slug} = fields,
                {template} = frontmatter || {};

            const path = buildPostPath(slug, postsKeysByPath);

            /* Create a post, if there is a slug and the post is enabled. */
            if ( path && enabled ) {

                const postComponent = getPostTemplate(template);

                /* Get the post's navigation. */
                const postNav = getPostNavigation(slug, postsSiteMap, metaLinks);

                createPage({
                    path: path,
                    component: postComponent,
                    context: {
                        id: id,
                        nav: postNav
                    }
                });
            }
        });

        /* For each metadata type create a post. */
        allMetadataSchemaEntity.edges.forEach(({node}) => {

            /* Find the node's slug. */
            const {fields, id} = node,
                {slug} = fields;

            /* Create a page, if there is a slug. */
            if ( slug ) {

                /* Get the metadata post's navigation. */
                const metaNav = getMetadataPostNavigation(slug, metaLinks, postsSiteMap);

                createPage({
                    path: slug,
                    component: getPostTemplate("METADATA"),
                    context: {
                        id: id,
                        nav: metaNav
                    }
                });
            }
        });

    });
};

/* Required for Edge. This function can be removed once Gatsby upgrades to @babel-preset-gatsby@0.2.3. */
/* See: https://github.com/gatsbyjs/gatsby/issues/14848 */
exports.onCreateBabelConfig = ({actions}) => {
    actions.setBabelPlugin({
        name: `@babel/plugin-transform-spread`,
        options: {
            loose: false,
        },
    });
};

/**
 * See: https://github.com/gatsbyjs/gatsby/issues/18213
 * See: https://github.com/gatsbyjs/gatsby/issues/13072
 * To access static folder while in develop mode.
 */
exports.onCreateDevServer = ({app}) => {

    app.use(express.static("public"))
};
