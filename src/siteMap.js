/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal site map component.
 */

// TODO move to yml and put in the content directory

const siteMap =
    [
        {
            name: "About",
            key: "about",
            children: [
                {
                    name: "Overview",
                    key: "overview",
                    children: [
                        {
                            name: "Overview",
                            key: "/about/overview/overview"
                        }
                    ]
                },
                {
                    name: "What is the Platform",
                    key: "what-is-the-platform",
                    children: [
                        {
                            name: "What is the Platform",
                            key: "/about/what-is-the-platform/what-is-the-platform"
                        },
                        {
                            name: "Ingest Service",
                            key: "/about/what-is-the-platform/ingest-service"
                        },
                        {
                            name: "Data Store",
                            key: "/about/what-is-the-platform/data-store"
                        },
                        {
                            name: "Data Browser",
                            key: "/about/what-is-the-platform/data-browser"
                        },
                        {
                            name: "Data Processing Pipelines",
                            key: "/about/what-is-the-platform/data-processing-pipelines"
                        }
                    ]
                }
            ]
        },
        {
            name: "Analyze",
            key: "analyze",
            children: [
                {
                    name: "Portals",
                    key: "portals",
                    children: [
                        {
                            name: "Visualization Portals",
                            key: "/analyze/portals/visualization-portals"
                        },
                        {
                            name: "About Visualization Portals",
                            key: "/analyze/portals/about"
                        }
                    ]
                },
                {
                    name: "Methods",
                    key: "methods",
                    children: [
                        {
                            name: "Methods",
                            key: "/analyze/methods/methods"
                        },
                        {
                            name: "About Methods",
                            key: "/analyze/methods/about"
                        }
                    ]
                },
                {
                    name: "Visualization Components",
                    key: "visualization-components",
                    children: [
                        {
                            name: "Visualization Components",
                            key: "/analyze/visualization-components/visualization-components"
                        },
                        {
                            name: "About Visualization Components",
                            key: "/analyze/visualization-components/about"
                        }
                    ]
                }
            ]
        },
        {
            name: "Develop",
            key: "develop",
            children: [
                {
                    name: "Development Guides",
                    key: "development-guides",
                    children: [
                        {
                            name: "Overview",
                            key: "/develop/development-guides/development-guides-overview"
                        },
                        {

                            name: "Ingest Data Brokers Development Guide",
                            key: "/develop/development-guides/ingest-broker-development-guide"
                        },
                        {
                            name: "Pipeline Processing Development Guides",
                            key: "/develop/development-guides/pipeline-processing-development-guides/overview-pipeline-processing-development-guides",
                            children: [
                                {
                                    name: "Best Practices for Building Data Processing Pipelines",
                                    key: "/develop/development-guides/pipeline-processing-development-guides/workflow-best-practices"
                                },
                                {
                                    name: "Quick Start for Building Pipelines",
                                    key: "/develop/development-guides/pipeline-processing-development-guides/pipeline-development-guide"
                                },
                                {
                                    name: "Pipeline Testing Guide",
                                    key: "/develop/development-guides/pipeline-processing-development-guides/testing-pipelines"
                                },
                                {
                                    name: "Contributing a Pipeline to the HCA DCP",
                                    key: "/develop/development-guides/pipeline-processing-development-guides/contributing-a-pipeline-to-the-hca-dcp"
                                },
                                {
                                    name: "Adding an Environment to the Portability Service",
                                    key: "/develop/development-guides/pipeline-processing-development-guides/adding-an-environment-to-the-portability-service"
                                }
                            ]
                        },
                        {
                            name: "Analysis Applications",
                            key: "/develop/development-guides/analysis-applications"
                        },
                        {
                            name: "Data Consumer Vignettes",
                            key: "/develop/development-guides/consumer-vignettes"
                        }
                    ]
                },
                {
                    name: "API Documentation",
                    key: "api-documentation",
                    children: [
                        {
                            name: "Data Store Consumer API",
                            key: "/develop/api-documentation/data-store-consumer-api"
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
                        name: "Overview",
                        key: "overview",
                        children: [
                            {
                                name: "Overview",
                                key: "/learn/overview/overview",
                            },
                            {
                                name: "Data Lifecycle",
                                key: "/learn/overview/data-lifecycle",
                            },
                            {
                                name: "Data Use Agreement",
                                key: "/learn/overview/data-use-agreement",
                            }
                        ]
                    },
                    {
                        name: "User Guides",
                        key: "userguides",
                        children: [
                            {
                                name: "Accessing Data",
                                key: "/learn/userguides/accessing-data",
                                children: [
                                    {
                                        name: "Quick Start Guide",
                                        key: "/learn/userguides/accessing-data/quick-start-guide"
                                    },
                                    {
                                        name: "Using the CLI to Access Data",
                                        key: "/learn/userguides/accessing-data/using-the-cli-to-access-data"
                                    }
                                ]

                            }, {

                                name: "Contributing Data",
                                key: "/learn/userguides/contributing-data",
                                children: [
                                ]
                            },
                            {
                                name: "Data Processing Pipelines",
                                key: "/learn/userguides/data-processing-pipelines/overview-of-data-processing-pipelines-user-guides",
                                children: [
                                    {
                                        name: "Smart-seq2 Workflow",
                                        key: "/learn/userguides/data-processing-pipelines/smart-seq2-workflow"
                                    },
                                    {
                                        name: "Optimus Prime Workflow",
                                        key: "/learn/userguides/data-processing-pipelines/optimus-prime-workflow"

                                    },
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

                                name: "Analysis Applications",
                                key: "/learn/userguides/analysis-applications"
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
                                name: "Overview of Metadata Structure",
                                key: "/learn/metadata/structure"
                            },
                            {
                                name: "Metadata Design and Implementation Choices",
                                key: "/learn/metadata/rationale"
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
                            key: "/contact/contact/contact-us"
                        },
                        {
                            name: "Join the Discussion",
                            key: "/contact/contact/join-the-discussion"
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
                            name: "Overview",
                            key: "/contribute/overview/overview"
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
                            key: "/help/help/help-and-faq"
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
                            key: "/privacy/privacy/privacy"
                        }
                    ]
                }
            ]
        }
    ];

export function getSection(path) {

    const key = path.split("/")[1];
    const section = siteMap.find((s) => {
        return s.key === key;
    });

    if (!section) {
        throw new Error("section with key: '" + key + "' is not found!");
    }
    return section;
}

export function getTabs(path) {

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

export function getTab(path) {
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

export function getNav(path) {
    const tab = getTab(path);
    if (!tab) {
        return [];
    }
    return tab.children;
}

