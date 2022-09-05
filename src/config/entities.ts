import { ThemeOptions } from "@mui/material";
import { Header } from "../components/header/common/entities";
import { Search } from "../components/searchPortal/common/entities";

export interface SiteConfig {
  layout: {
    header: Header;
  };
  search: Search;
  theme?: ThemeOptions;
}
