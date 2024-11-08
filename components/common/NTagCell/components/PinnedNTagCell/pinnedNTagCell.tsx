import {
  MetadataValue,
  NTagCell,
} from "@databiosphere/findable-ui/lib/components/Index/components/NTagCell/nTagCell";
import { PinnedNTagCell as Cell } from "./pinnedNTagCell.styles";

export type MetadataValueTuple = [MetadataValue[], MetadataValue[]];

export interface PinnedNTagCellProps {
  label: string;
  values: MetadataValueTuple; // Metadata values as pinned and unpinned tuple.
}

export const PinnedNTagCell = ({
  label,
  values,
}: PinnedNTagCellProps): JSX.Element => {
  const [pinned, unpinned] = values;
  return (
    <Cell>
      {/* optionally pinned values */}
      {pinned.length > 0 && pinned.map((v) => <div key={v}>{v}</div>)}
      {/* +ntag values */}
      {unpinned.length > 0 && <NTagCell label={label} values={unpinned} />}
    </Cell>
  );
};
