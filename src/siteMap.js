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
                                key: "accessing-data",
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
                            }

                        ]
                    },
                    {
                        name: "Metadata Dictionary",
                        key: "metadata-dictionary",
                        children: [
                            {
                                name: "document",
                                key: "/learn/metadata-dictionary/sam"
                            },
                            {
                                name: "document",
                                key: "/learn/metadata-dictionary/joe"
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
                            key: "/learn/how-it-works/data-lifecycle",
                        },
                        {

                            name: "Tertiary portal development guidt",
                            key: "//build/development-guide/tertiary-portal-development-guide"
                        },
                        {

                            name: "Ingest data brokers development guide",
                            key: "/learn/how-it-works/data-use-butter"
                        }
                    ]
                },
                {
                    name: "API Documentation",
                    key: "api-documentation",
                },
                {
                    name: "Reusing DCP Infrastructure",
                    key: "reusing-dcp-infrastructure",
                }
            ]
        }
    ];

export function getSection(path) {

    const key = path.split("/")[1];
    const section = siteMap.find((s) => {
        return s.key === key;
    });
    return section;
}

export function getTabs(path) {
    const section = getSection(path);
    return section.children;
}

export function getTab(path) {
    const tabs = getTabs(path);
    const key = path.split("/")[2];
    const tab = tabs.find((s) => {
        return s.key === key;
    });
    return tab;
}

export function getNav(path) {
    const tab = getTab(path);
    return tab.children;
}


