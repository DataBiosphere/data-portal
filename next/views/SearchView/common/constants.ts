import { Tab } from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";

export enum SEARCH_CATEGORY {
  GUIDES = "guides",
  PROJECTS = "projects",
}

export const TABS: Tab[] = [
  { label: "All", value: null },
  { label: "Projects", value: SEARCH_CATEGORY.PROJECTS },
  { label: "Guides", value: SEARCH_CATEGORY.GUIDES },
];
