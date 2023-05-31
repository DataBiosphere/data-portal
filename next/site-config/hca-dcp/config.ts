import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import header from "./header";
import footer from "./footer";

const config: SiteConfig = {
  browserURL: "",
  dataSource: {
    url: "",
  },
  entities: [],
  explorerTitle: "",
  layout: {
    footer,
    header,
  },
  redirectRootToPath: "/",
  themeOptions: {
    palette: {
      primary: {
        dark: "#003E76",
        main: "#035C94",
      },
    },
  },
};

export default config;
