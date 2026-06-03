import {
  Tabs as DXTabs,
  TabValue,
} from "@databiosphere/findable-ui/lib/components/common/Tabs/tabs";
import {
  NETWORKS_ATLAS_PATTERN,
  NETWORK_ATLAS_DATASETS_PATTERN,
  NETWORK_ATLAS_SOURCE_STUDIES_PATTERN,
} from "constants/routes";
import { useAtlas } from "contexts/atlasContext";
import { useRouter } from "next/router";
import { JSX } from "react";

const ATLAS_OVERVIEW_TAB = {
  label: "Atlas Overview",
  value: NETWORKS_ATLAS_PATTERN,
};

const BASE_TABS = [
  ATLAS_OVERVIEW_TAB,
  {
    label: "Source Studies",
    value: NETWORK_ATLAS_DATASETS_PATTERN,
  },
];

const TRACKER_TABS = [
  ATLAS_OVERVIEW_TAB,
  {
    label: "Source Datasets",
    value: NETWORK_ATLAS_DATASETS_PATTERN,
  },
  {
    label: "Source Studies",
    value: NETWORK_ATLAS_SOURCE_STUDIES_PATTERN,
  },
];

export const Tabs = (): JSX.Element => {
  const router = useRouter();
  const {
    atlas: { path: atlasPath, tracker },
    network: { path: networkPath },
  } = useAtlas();
  const tabs = tracker ? TRACKER_TABS : BASE_TABS;

  const handleTabChanged = (value: TabValue): void => {
    router.push({
      pathname: value,
      query: { atlas: atlasPath, network: networkPath },
    });
  };

  return (
    <DXTabs
      onTabChange={handleTabChanged}
      value={router.pathname}
      tabs={tabs}
    />
  );
};
