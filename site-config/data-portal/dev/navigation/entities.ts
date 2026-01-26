import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";

export type Navigation = NavItem & Pick<NavLinkItem, "selectedMatch">;

export type NavigationConfig = Record<NAVIGATION_KEY, NavigationEntry>;

export interface NavigationEntry {
  nodes: NavigationNode[];
}

export enum NAVIGATION_KEY {
  ABOUT = "about",
  APIS = "apis",
  CONTACT = "contact",
  CONTRIBUTE = "contribute",
  DCP_UPDATES = "dcp-updates",
  GUIDES = "guides",
  HELP = "help",
  METADATA = "metadata",
  PRIVACY = "privacy",
}

export interface NavigationNode extends Pick<NavLinkItem, NavLinkItemKeys> {
  key?: string;
  label?: string;
  layoutStyle?: LayoutStyle;
  navigation?: Navigation[];
  slugs: string[]; // A list of slugs that are valid for the node.
  url?: string;
}

type NavLinkItemKeys = "flatten" | "selectedMatch" | "visible";

export type SlugByFilePaths = Map<string, string[]>;
