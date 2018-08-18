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
                            name: "Secondary Analysis",
                            key: "/about/what-is-the-platform/secondary-analysis"
                        }
                    ]
                },
                {
                    name: "Roadmap",
                    key: "roadmap",
                    children: [
                        {
                            name: "Roadmap",
                            key: "/about/roadmap/roadmap-overview"
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
                            name: "Pipeline Development Guide",
                            key: "/develop/development-guides/pipeline-development-guide"
                        },
                        {

                            name: "Contributing a Pipeline to the HCA DCP",
                            key: "/develop/development-guides/contributing-a-pipeline-to-the-hca-dcp",
                        },
                        {

                            name: "Adding an Environment to the Portability Service",
                            key: "/develop/development-guides/adding-an-environment-to-the-portability-service",
                        },
                        {

                            name: "Tertiary Portal Development Guide",
                            key: "/develop/development-guides/tertiary-portal-development-guide"
                        },
                        {

                            name: "Ingest Data Brokers Development Guide",
                            key: "/develop/development-guides/ingest-broker-development-guide"
                        },
                        {
                            name: "Pipeline Testing Guide",
                            key: "/develop/development-guides/testing-pipelines"
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

                                        name: "Using the Data Browser to Access Data",
                                        key: "/learn/userguides/accessing-data/using-the-data-browser-to-access-data"

                                    },
                                    {
                                        name: "Using the CLI to Access Data",
                                        key: "/learn/userguides/accessing-data/using-the-cli-to-access-data"
                                    },
                                    {
                                        name: "How to go from Query to Annotated Clusters",
                                        key: "/learn/userguides/accessing-data/how-to-go-from-query-to-annotated-clusters"
                                    },
                                    {
                                        name: "FAQ",
                                        key: "/learn/userguides/accessing-data/faq"
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
                                key: "/learn/userguides/secondary-analysis/what-is-the-secondary-analysis-service",
                                children: [
                                    {
                                        name: "Optimus Prime Workflow in Detail",
                                        key: "/learn/userguides/secondary-analysis/optimus-prime-workflow-in-detail"

                                    },
                                    {
                                        name: "File Formats",
                                        key: "/learn/userguides/secondary-analysis/file-formats"
                                    },
                                    {
                                        name: "QC Metrics",
                                        key: "/learn/userguides/secondary-analysis/qc-mertics"
                                    },
                                    {
                                        name: "Pipeline Portability",
                                        key: "/learn/userguides/secondary-analysis/pipeline-portability"
                                    },
                                    {
                                        name: "Smart-seq2 Workflow in Detail",
                                        key: "/learn/userguides/secondary-analysis/smart-seq2-workflow-in-detail"
                                    },
                                    {
                                        name: "Workflow Best Practices",
                                        key: "/learn/userguides/secondary-analysis/secondary-analsis-workflow-best-practices"
                                    }
                                ]
                            },
                            {

                                name: "Analysis Applications",
                                key: "/learn/userguides/tertiary-analysis"
                            }
                        ]
                    },
                    {
                        name: "Metadata Dictionary",
                        key: "metadata-dictionary",
                        children: [
                            {
                                name: "Metadata Dictionary",
                                key: "/learn/metadata-dictionary/metadata-dictionary"
                            },
                            {
                                name: "About Metadata Dictionary",
                                key: "/learn/metadata-dictionary/about-metadata-dictionary"
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
                    name: "Overview",
                    key: "overview",
                    children: [
                        {
                            name: "Overview",
                            key: "/contribute/overview/overview"
                        },
                        {
                            name: "What to Prepare",
                            key: "/contribute/overview/what-to-prepare"
                        },
                        {
                            name: "Terms and Conditions",
                            key: "/contribute/overview/terms-and-conditions"
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


