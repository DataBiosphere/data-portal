import { SiteConfig } from "../entities";
import logoLungmap from "../../../images/lungmap/logoLungmap.png";
import { BROWSER_URL, PROJECTS_URL } from "../hca/config";

const config: SiteConfig = {
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: "LungMAP Data Browser",
        height: 32,
        link: "/",
        src: logoLungmap,
      },
      navLinks: [
        {
          label: "Explore",
          url: `${BROWSER_URL}${PROJECTS_URL}`,
        },
        {
          label: "Metadata",
          url: "/metadata",
        },
        {
          label: "APIs",
          url: "/apis",
        },
      ],
      searchEnabled: true,
      slogan: undefined,
      socials: [
        {
          type: "twitter",
          url: "https://twitter.com/lungmapnet",
        },
      ],
    },
  },
  search: {
    partners: [
      { label: "All Results", value: "" },
      { label: "Pipelines", value: "pipelines" },
      { label: "Metadata", value: "metadata" },
    ],
    searchEngineId: process.env.GATSBY_ATLAS,
    searchPath: "/search",
  },
  theme: {
    palette: {
      primary: {
        dark: "#003662",
        main: "#005295",
      },
    },
  },
};

export default config;
