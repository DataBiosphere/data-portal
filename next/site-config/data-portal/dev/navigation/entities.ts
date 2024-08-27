import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";

export type NavigationConfig = Record<NAVIGATION_KEY, NavigationEntry>;

export interface NavigationEntry {
  nodes: NavigationNode[];
}

export enum NAVIGATION_KEY {
  APIS = "apis",
  DCP_UPDATES = "dcp-updates",
  GUIDES = "guides",
}

export interface NavigationNode {
  key?: string;
  layoutStyle?: LayoutStyle;
  navigation?: NavItem[];
  slugs: string[]; // A list of slugs that are valid for the node.
}

export type SlugByFilePaths = Map<string, string[]>;
