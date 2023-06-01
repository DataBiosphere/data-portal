import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import footer from "./footer";
import header from "./header";

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
        dark: "#005EA9",
        main: "#035C94",
      },
    },
  },
};

export default config;
