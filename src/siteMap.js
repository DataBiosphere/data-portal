/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal site map component.
 */

// TODO move to yml and put in the content directory


// The  sitemap is an array of sections.
const siteMap =
    [
        {
            name: "About",
            key: "about",
            children: [
                {
                    name: "",
                    key: "platform",
                    children: [
                        {
                            name: "About the DCP",
                            key: "/about/platform/dcp",
                            path: "/about",
                        },
                        {
                            name: "About the HCA",
                            key: "/about/platform/hca",
                            path: "/about/hca",
                        },
                        {
                            name: "Attributions",
                            key: "/about/platform/attributions",
                            path: "/about/attributions",
                        }

                    ]
                }
            ]
        },
        {
            name: "Analysis Tools Registry",
            key: "analyze",
            children: [
                {
                    name: "Analysis Portals",
                    key: "portals",
                    children: [
                        {
                            name: "Analysis Portals",
                            key: "/analyze/portals/analysis-portals",
                            path: "/analyze",
                            children: [
                                {
                                    name: "Automated Single cell Analysis Platform (ASAP)",
                                    key: "/analyze/portals/analysis-portals/asap",
                                    path: "/analyze/portals/asap"
                                },
                                {
                                    name: "BioTuring Browser",
                                    key: "/analyze/portals/analysis-portals/bioturing-browser",
                                    path: "/analyze/portals/bioturing-browser"
                                },
                                {
                                    name: "cellxgene",
                                    key: "/analyze/portals/analysis-portals/cellxgene",
                                    path: "/analyze/portals/cellxgene"
                                },
                                {
                                    name: "Cytoscape",
                                    key: "/analyze/portals/analysis-portals/cytoscape",
                                    path: "/analyze/portals/cytoscape"
                                },

                                {
                                    name: "DNAstack",
                                    key: "/analyze/portals/analysis-portals/dnastack",
                                    path: "/analyze/portals/dnastack"
                                },
                                {
                                    name: "Single Cell Expression Atlas",
                                    key: "/analyze/portals/analysis-portals/single-cell-expression-atlas",
                                    path: "/analyze/portals/single-cell-expression-atlas"
                                },
                                {
                                    name: "Single Cell Portal",
                                    key: "/analyze/portals/analysis-portals/single-cell-portal",
                                    path: "/analyze/portals/single-cell-portal"
                                },
                                {
                                    name: "The GenePattern Notebook Environment",
                                    key: "/analyze/portals/analysis-portals/genepattern-notebook-environment",
                                    path: "/analyze/portals/genepattern-notebook-environment"
                                },
                                {
                                    name: "UCSC Cell Browser",
                                    key: "/analyze/portals/analysis-portals/ucsc-cell-browser",
                                    path: "/analyze/portals/ucsc-cell-browser"
                                },
                                {
                                    name: "UCSC Xena",
                                    key: "/analyze/portals/analysis-portals/ucsc-xena",
                                    path: "/analyze/portals/ucsc-xena"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Methods Packages",
                    key: "methods",
                    children: [
                        {
                            name: "Methods Packages",
                            key: "/analyze/methods/methods-packages",
                            path: "/analyze/methods",
                            children: [
                                {
                                    name: "MAGIC",
                                    key: "/analyze/methods/methods-packages/magic",
                                    path: "/analyze/methods/magic"
                                },
                                {
                                    name: "PHATE",
                                    key: "/analyze/methods/methods-packages/phate",
                                    path: "/analyze/methods/phate"
                                },
                                {
                                    name: "scmap",
                                    key: "/analyze/methods/methods-packages/scmap",
                                    path: "/analyze/methods/scmap"
                                },
                                {
                                    name: "Single-cell consensus clustering (SC3)",
                                    key: "/analyze/methods/methods-packages/sc3",
                                    path: "/analyze/methods/sc3"
                                },
                                {
                                    name: "Slingshot",
                                    key: "/analyze/methods/methods-packages/slingshot",
                                    path: "/analyze/methods/slingshot"
                                },
                                {
                                    name: "STREAM",
                                    key: "/analyze/methods/methods-packages/stream",
                                    path: "/analyze/methods/stream"
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "Visualization Packages",
                    key: "visualization",
                    children: [
                        {
                            name: "Visualization Packages",
                            key: "/analyze/visualization/visualization-packages",
                            path: "/analyze/visualization",
                            children: [
                                {
                                    name: "Anatomogram",
                                    key: "/analyze/visualization/visualization-packages/anatomogram",
                                    path: "/analyze/visualization/anatomogram"
                                },
                                {
                                    name: "Ideogram.js",
                                    key: "/analyze/visualization/visualization-packages/ideogram",
                                    path: "/analyze/visualization/ideogram"
                                },
                                {
                                    name: "igv.js",
                                    key: "/analyze/visualization/visualization-packages/igv",
                                    path: "/analyze/visualization/igv"
                                },
                                {
                                    name: "Morpheus",
                                    key: "/analyze/visualization/visualization-packages/morpheus",
                                    path: "/analyze/visualization/morpheus"
                                }

                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "Learn",
            key: "learn",
            children:
                [
                    {
                        name: "Introduction",
                        key: "userguides",
                        children: [
                            {
                                name: "Quick Start Guide",
                                key: "/learn/userguides/quick-start-guide",
                                path: "/learn"
                            },
                            {
                                name: "CLI Data Access",
                                key: "/learn/userguides/using-the-cli-to-access-data"
                            },
                            {
                                name: "Data Processing Pipelines",
                                key: "/learn/userguides/data-processing-pipelines/overview-of-data-processing-pipelines-user-guides",
                                children: [
                                    {
                                        name: "Smart-seq2 Workflow",
                                        key: "/learn/userguides/data-processing-pipelines/smart-seq2-workflow"
                                    },
                                    // {
                                    //     name: "Optimus Prime Workflow",
                                    //     key: "/learn/userguides/data-processing-pipelines/optimus-prime-workflow"
                                    //
                                    // },
                                    {
                                        name: "File Formats",
                                        key: "/learn/userguides/data-processing-pipelines/file-formats"
                                    },
                                    {
                                        name: "QC Metrics",
                                        key: "/learn/userguides/data-processing-pipelines/qc-mertics"
                                    },
                                    {
                                        name: "Pipeline Portability",
                                        key: "/learn/userguides/data-processing-pipelines/pipeline-portability"
                                    },
                                    {
                                        name: "Community Pipeline: 3' scRNA-seq",
                                        key: "/learn/userguides/data-processing-pipelines/community-pipeline-3-prime-scrna-seq"
                                    }
                                ]
                            },
                            {
                                name: "Data Lifecycle",
                                key: "/learn/userguides/data-lifecycle",
                            },
                            {
                                name: "Data Use Agreement",
                                key: "/learn/userguides/data-use-agreement",
                            }
                        ]
                    },
                    {
                        name: "Metadata",
                        key: "metadata",
                        children: [
                            {
                                name: "Metadata Dictionary",
                                key: "/learn/metadata/metadata-dictionary",
                                children: [
                                    {
                                        name: "Biomaterial",
                                        key: "/learn/metadata/metadata-dictionary/biomaterial"
                                    },
                                    {
                                        name: "Process",
                                        key: "/learn/metadata/metadata-dictionary/process"
                                    },
                                    {
                                        name: "Protocol",
                                        key: "/learn/metadata/metadata-dictionary/protocol"
                                    },
                                    {
                                        name: "Project",
                                        key: "/learn/metadata/metadata-dictionary/project"
                                    },
                                    {
                                        name: "File",
                                        key: "/learn/metadata/metadata-dictionary/file"
                                    }
                                ]
                            }
                            ,
                            {
                                name: "Metadata Structure",
                                key: "/learn/metadata/structure"
                            },
                            {
                                name: "Metadata Design Choices",
                                key: "/learn/metadata/rationale"
                            }


                        ]
                    },
                    {
                        name: "Development Guides",
                        key: "development-guides",
                        children: [
                            {
                                name: "Ingest Data Brokers",
                                key: "/learn/development-guides/ingest-broker-development-guide"
                            },
                            {
                                name: "Processing Pipelines",
                                key: "/learn/development-guides/pipeline-processing-development-guides/overview-pipeline-processing-development-guides",
                                children: [
                                    {
                                        name: "Pipeline Best Practices",
                                        key: "/learn/development-guides/pipeline-processing-development-guides/workflow-best-practices"
                                    },
                                    {
                                        name: "Building Pipelines",
                                        key: "/learn/development-guides/pipeline-processing-development-guides/pipeline-development-guide"
                                    },
                                    {
                                        name: "Testing Pipelines",
                                        key: "/learn/development-guides/pipeline-processing-development-guides/testing-pipelines"
                                    },
                                    {
                                        name: "Contributing Pipelines",
                                        key: "/learn/development-guides/pipeline-processing-development-guides/contributing-a-pipeline-to-the-hca-dcp"
                                    },
                                    {
                                        name: "Portability Service Environments",
                                        key: "/learn/development-guides/pipeline-processing-development-guides/adding-an-environment-to-the-portability-service"
                                    }
                                ]
                            },
                            {
                                name: "Analysis Applications",
                                key: "/learn/development-guides/analysis-applications"
                            },
                            {
                                name: "Data Consumer Vignettes",
                                key: "/learn/development-guides/consumer-vignettes"
                            }
                        ]
                    },
                    {
                        name: "API Documentation",
                        key: "api-documentation",
                        children: [
                            {
                                name: "Data Store API",
                                key: "/learn/api-documentation/data-store-consumer-api"
                            }
                        ]
                    }
                ]
        },
        {
            name: "Contact",
            key: "contact",
            children: [
                {
                    name: "",
                    key: "contact",
                    children: [
                        {
                            name: "Contact Us",
                            key: "/contact/contact/contact-us",
                            path: "/contact"
                        },
                        {
                            name: "Join the Discussion",
                            key: "/contact/contact/join-the-discussion",
                            path: "/contact/join-the-discussion"
                        }
                    ]
                }
            ]
        },
        {
            name: "Content Guide",
            key: "document",
            children: [
                {
                    name: "Creating Content",
                    key: "creating-content",
                    children: [
                        {
                            name: "Overview",
                            key: "/document/creating-content/overview"
                        },
                        {
                            name: "Editing an Existing Page",
                            key: "/document/creating-content/editing-an-existing-page"
                        },
                        {
                            name: "Creating Links",
                            key: "/document/creating-content/creating-links"
                        },
                        {
                            name: "Using Images",
                            key: "/document/creating-content/using-images"
                        },
                        {
                            name: "Creating a New Page",
                            key: "/document/creating-content/creating-a-new-page"
                        },
                        {
                            name: "Style Guide",
                            key: "/document/creating-content/content-style-guide"
                        }
                    ]
                }
            ]
        },
        {
            name: "Contribute",
            key: "contribute",
            children: [
                {
                    name: "",
                    key: "overview",
                    children: [
                        {
                            name: "Contributing Data",
                            key: "/contribute/overview/overview",
                            path: "/contribute"
                        },
                        {
                            name: "Contributing to the Analysis Tools Registry",
                            key: "/contribute/overview/analysis-tools-registry/contributing-to-the-analysis-tools-registry",
                            path: "/contribute/analysis-tools-registry",
                            children: [
                                {
                                    name: "Registry Standards",
                                    key: "/contribute/overview/analysis-tools-registry/registry-standards",
                                    path: "/contribute/registry-standards"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: "Help",
            key: "help",
            children: [
                {
                    name: "",
                    key: "help",
                    children: [
                        {
                            name: "Help & FAQ",
                            key: "/help/help/help-and-faq",
                            path: "/help"
                        }
                    ]
                }
            ]
        },
        {
            name: "Privacy",
            key: "privacy",
            children: [
                {
                    name: "",
                    key: "privacy",
                    children: [
                        {
                            name: "",
                            key: "/privacy/privacy/privacy",
                            path: "/privacy"
                        }
                    ]
                }
            ]
        }
    ];


/**
 * Determine the top level section from the path.
 * The document path is configured in the markdown front matter.
 * @param path
 * @returns {*}
 */
function getSection(path) {

    const key = path.split("/")[1];
    const section = siteMap.find((s) => {
        return s.key === key;
    });

    if (!section) {
        throw new Error("section with key: '" + key + "' is not found!");
    }
    return section;
}

/**
 * Given a path, retrun the set of tabs for the path's section.
 * If the section has no tabs throw an error. Every section must have one tab,
 * even if that tab has no name it will contain at least one document.
 *
 * This is used to draw out the tabs across a documents top section.
 * @param path
 */
function getTabs(path) {

    const section = getSection(path);

    if (!section.children) {
        throw new Error("No children for section: '" + section.key + "'");
    }

    section.children.forEach((tab) => {
        if (!tab.children || tab.children.length == 0) {
            throw new Error("Tab  '" + tab.name + "' has no children and therefore no landing page.");
        }
    });

    return section.children;
}


/**
 * Given a path return the children of the tab.
 * This is used to draw the left nav in the document page.
 * @param path
 * @returns {Array}
 */
function getNav(path) {
    const tab = getTab(path);

    // if (!tab) {
    //     // seems this cant happen.
    //     return [];
    // }
    return tab.children;
}

function getPath(key) {
    const path = keytoPath.get(key);
    if (path) {
        return path;
    }
    else {
        return key
    }
    ;

}

/**
 * Given a document path, find the tab associated with the document.
 * @param path
 * @returns {T|*}
 */
function getTab(path) {
    const tabs = getTabs(path);
    const key = path.split("/")[2];
    const tab = tabs.find((s) => {
        return s.key === key;
    });

    if (!tab) {
        throw new Error("No tab for key: '" + key + "'");
    }
    return tab;
}


/**
 * sections
 *    tabs
 *       docs
 *          subdocs
 * @type {*}
 */
const keytoPath = siteMap.reduce((acc, section) => {
    return section.children.reduce((acc, tab) => {
        return tab.children.reduce((acc, doc) => {
            addToMap(acc, doc);
            if (doc.children) {
                doc.children.forEach(childDoc => addToMap(acc, childDoc));
            }
            return acc;
        }, acc);
    }, acc);
}, new Map());


function addToMap(acc, doc) {
    if (doc.path) {
        acc.set(doc.key, doc.path);
    } else {
        acc.set(doc.key, doc.key);
    }
}

module.exports = {
    getSection,
    getTabs,
    getNav,
    getPath
}





