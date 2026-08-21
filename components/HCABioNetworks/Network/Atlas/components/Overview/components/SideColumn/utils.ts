import type { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import type { Atlas } from "../../../../../../../../@types/network";

const BIOTURING_URL =
  "https://talk2data.bioturing.com/?tab=studies&version_id=hca&params=N4IgbgpgTgzglgewHYgFwgBYGMCGIC%2BQA";

/**
 * Returns the "Data Exploration Tools" links for an atlas: the CELLxGENE data
 * portal links, followed by the BioTuring collection for atlases opted in with
 * the `bioTuring` flag.
 * @param atlas - Atlas.
 * @returns data exploration tool links.
 */
export function getDataExplorationTools(
  atlas: Atlas
): Pick<LinkProps, "label" | "url">[] {
  const { bioTuring, cxgDataPortal = [] } = atlas;

  if (!bioTuring) return cxgDataPortal;

  return [
    ...cxgDataPortal,
    { label: "BioTuring Collection", url: BIOTURING_URL },
  ];
}
