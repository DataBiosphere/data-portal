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
            name: "Learn",
            key: "learn",
            children:
                [
                    {
                        name: "How it works",
                        key: "how-it-works",
                        children: [
                            {
                                name: "Data lifecycle",
                                key: "/learn/how-it-works/data-lifecycle",
                            },
                            {
                                name: "Data use agreement",
                                key: "/learn/how-it-works/data-use-agreement",
                            }
                        ]
                    },
                    {
                        name: "Userguides",
                        key: "userguides",
                        children: [
                            {
                                name: "Accessing Data",
                                key: "/learn/userguides/accessing-data",
                                children: [
                                    {

                                        name: "Using the Data Browser to access data",
                                        key: "/learn/userguides/accessing-data/using-the-data-browser-to-access-data"

                                    },
                                    {
                                        name: "Using the CLI to access data",
                                        key: "/learn/userguides/accessing-data/using-the-cli-to-access-data"
                                    },
                                    {
                                        name: "How to go from query to annotated clusters",
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
                                    {
                                        name: "Registering a Project",
                                        key: "/learn/userguides/contributing-data/registering-a-project"

                                    },
                                    {
                                        name: "Submitting Project Data",
                                        key: "/learn/userguides/contributing-data/submitting-project-data"
                                    },
                                    {
                                        name: "Updating Project Data",
                                        key: "/learn/userguides/contributing-data/updating-project-data"
                                    }

                                ]
                            },
                            {

                                name: "Secondary Analysis",
                                key: "/learn/userguides/secondary-analysis",
                                children: [
                                    {
                                        name: "What is the Seondary Analysis Service?",
                                        key: "/learn/userguides/secondary-analysis/what-is-the-secondary-analysis-service"
                                    },
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
                                        name: "Service Portability",
                                        key: "/learn/userguides/secondary-analysis/service-portability"
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
                            }

                        ]
                    },
                    {
                        name: "Metadata Dictionary",
                        key: "metadata-dictionary",
                        children: [
                            {
                                name: "Metadata Dictionary Overview",
                                key: "/learn/metadata-dictionary"
                            }
                        ]
                    }
                ]
        },
        {
            name: "Build",
            key: "build",
            children: [
                {
                    name: "Development Guides",
                    key: "development-guides",
                    children: [
                        {
                            name: "Pipeline development guide",
                            key: "/build/development-guides/pipeline-development-guide"
                        },
                        {

                            name: "Contributing a pipeline to the hca dcp",
                            key: "/build/development-guides/contributing-a-pipeline-to-the-hca-dcp",
                        },
                        {

                            name: "Tertiary portal development guidt",
                            key: "/build/development-guides/tertiary-portal-development-guide"
                        },
                        {

                            name: "Ingest data brokers development guide",
                            key: "/build/development-guides/ingest-broker-development-guide"
                        }
                    ]
                },
                {
                    name: "API Documentation",
                    key: "api-documentation",
                    children: [
                        {
                            name: "Data Store Consumer API",
                            key: "/build/api-documentation/data-store-consumer-api"
                        }
                    ]
                }
                // {
                //     name: "Reuse DCP Components",
                //     key: "reusing-dcp-infrastructure",
                //     children: [
                //         {
                //
                //             name: "Butter and Toast",
                //             key: "/build/development-guides/butter-and-toast",
                //         }
                //     ]
                // }
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
                    name: "Peanuts",
                    key: "peanuts",
                    children: [
                        {
                            name: "Pipeline development guide",
                            key: "/analyze/peanuts/data-lifecycle",
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

    if(!section){
        throw new Error("section with key: '" +key + "' is not foundango!");
        // return {
        //
        //     key:"test"
        // }
    }
    return section;
}

export function getTabs(path) {

    const section = getSection(path);

    if(!section.children){
        throw new Error("No children for section: '" + section.key+ "'");
    }

    section.children.forEach((tab) =>{
        if(!tab.children || tab.children.length == 0){
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

    if(!tab){
        throw new Error("No tab for key: '" + key+ "'");
    }
    return tab;
}

export function getNav(path) {
    const tab = getTab(path);
    if(!tab){
        return [];
    }
    return tab.children;
}


