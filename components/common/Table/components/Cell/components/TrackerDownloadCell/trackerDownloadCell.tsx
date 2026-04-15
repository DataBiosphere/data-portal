import { JSX } from "react";
import { useAtlas } from "../../../../../../../contexts/atlasContext";
import { CXGDownloadCell } from "../CXGDownloadCell/cxgDownloadCell";
import type { TrackerDownloadCellProps } from "./types";
import { buildDatasetAssets } from "./utils";

/**
 * Download cell for tracker source datasets. Reads network and atlas
 * tracker config from AtlasContext to construct the S3 download URL.
 * @param props - Cell context for the tracker source dataset row.
 * @param props.row - Table row containing the tracker source dataset.
 * @returns CXGDownloadCell with tracker dataset assets, or null if not a tracker atlas.
 */
export const TrackerDownloadCell = ({
  row,
}: TrackerDownloadCellProps): JSX.Element | null => {
  const { atlas, network } = useAtlas();
  const { tracker } = atlas;
  if (!tracker) return null;
  const sourceDataset = row.original;
  return (
    <CXGDownloadCell
      datasetAssets={buildDatasetAssets(
        sourceDataset,
        network.key,
        tracker.shortNameSlug,
        tracker.version
      )}
      title={sourceDataset.title}
    />
  );
};
