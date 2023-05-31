import { HeaderProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import logoHca from "images/logoHca.png";
import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { BROWSER_URL, LOGO_ALT, socials } from "./constants";

const header: HeaderProps = {
  authenticationEnabled: false,
  logo: { alt: LOGO_ALT, link: BROWSER_URL, src: logoHca, height: 32 },
  navAlignment: ELEMENT_ALIGNMENT.LEFT,
  navLinks: [
    {
      label: "Explore",
      url: '/',
    },
    {
      label: 'BioNetworks',
      url: '/bio-networks'
    },
    {
      label: "Guides",
      url: `${BROWSER_URL}/guides`,
    },
    {
      label: "Metadata",
      url: `${BROWSER_URL}/metadata`,
    },
    {
      label: "Pipelines",
      url: `${BROWSER_URL}/pipelines`,
    },
    {
      label: "Analysis Tools",
      url: `${BROWSER_URL}/analyze`,
    },
    {
      label: "Contribute",
      url: `${BROWSER_URL}/contribute`,
    },
    {
      label: "APIs",
      url: `${BROWSER_URL}/apis`,
    },
    {
      label: "Updates",
      url: `${BROWSER_URL}/dcp-updates`,
    },
  ],
  searchEnabled: true,
  searchURL: `${BROWSER_URL}/search`,
  socials,
};

export default header;
