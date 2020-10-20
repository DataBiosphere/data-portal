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
const {buildPostPath, getPostTemplate, setOfPostsBlacklisted} = require("./src/utils/node/create-pages.service");
const {buildMetadataEntityCategorySchemaTitleByKey,
    buildMetadataLinksByEntity,
    buildMetadataTabs,
    getMetadataPostNavigation,
    getPostNavigation,
    removeBlacklistedPosts} = require("./src/utils/node/create-pages-navigation.service");
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
    const {internal} = node,
        {type} = internal;

    /* Create new node fields for the posts of interest e.g. markdown pages, metadata schema. */
    if ( isPostNodeFeatured(type) ) {

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
    const {createPage, createRedirect} = actions;

    /* Redirect "/metadata" path to "/metadata/dictionary/biomaterial/cell_line". */
    createRedirect({fromPath: "/metadata", toPath: "/metadata/dictionary/biomaterial/cell_line", isPermanent: true, redirectInBrowser: true});

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
            }
            id
          }
        }
      }
      allMetadataEntity {
        edges {
          node {
            categories {
              categoryName
            }
            entityName
          }
        }
      }
      allMetadataSchema(sort: {fields: fields___slug}) {
        edges {
          node {
            category
            entity
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
    }
    `).then(result => {

        /* If there is an error, return. */
        if ( result.errors ) {

            return Promise.reject(result.errors);
        }

        const {data} = result,
            {allMarkdownRemark, allMetadataEntity, allMetadataSchema, allSiteMapYaml} = data;

        /* Create a set of all posts blacklisted i.e. posts not "enabled". */
        /* Posts blacklisted will be omitted from the navigation structure. */
        const postsByKeyBlacklisted = setOfPostsBlacklisted(allMarkdownRemark);

        /* For all site map documents associate the document key with a path. */
        /* This will be used to create the correct path for each post. */
        const postsKeysByPath = buildPostKeysByPath(allSiteMapYaml, postsByKeyBlacklisted);

        /* Build the site map, and remove any blacklisted posts. */
        const postsSiteMap = removeBlacklistedPosts(allSiteMapYaml, postsByKeyBlacklisted);

        /* For all metadata schema documents associate the document key with schema entity, category and schema title. */
        const metadataEntityCategorySchemaTitleByKey = buildMetadataEntityCategorySchemaTitleByKey(allMetadataSchema);

        /* Pre-build the metadata primary and secondary navigation links. */
        const metaLinksByEntity = buildMetadataLinksByEntity(metadataEntityCategorySchemaTitleByKey, allMetadataEntity);

        /* Pre-build the metadata secondary tabs. */
        const metaTabs = buildMetadataTabs(metadataEntityCategorySchemaTitleByKey, allMetadataEntity);

        /* For each markdown file create a post. */
        allMarkdownRemark.edges.forEach(({node}) => {

            const {id, fields, frontmatter} = node,
                {enabled, slug} = fields,
                {template} = frontmatter || {};

            const path = buildPostPath(slug, postsKeysByPath);

            /* Create a post, if there is a path and the post is enabled. */
            if ( path && enabled ) {

                const postComponent = getPostTemplate(template);

                /* Get the post's navigation. */
                const postNav = getPostNavigation(slug, postsSiteMap, metaLinksByEntity);

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
        allMetadataSchema.edges.forEach(({node}) => {

            /* Find the node's slug. */
            const {entity, fields, id} = node,
                {slug} = fields;

            /* Create a page, if there is a slug. */
            if ( slug ) {

                /* Get the metadata post's navigation. */
                const metaNav = getMetadataPostNavigation(slug, postsSiteMap, metaLinksByEntity, metaTabs, entity);

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

/**
 * Schema customization.
 *
 * @param actions
 * @returns {*}
 */
exports.createSchemaCustomization = ({actions}) => {

    const {createFieldExtension, createTypes} = actions;

    createTypes(`
    type Frontmatter {
        template: String
    }
    type MarkdownRemark implements Node {
        frontmatter: Frontmatter
    }`);
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
