import { formatCountSize } from "@clevercanary/data-explorer-ui/lib/utils/formatCountSize";
import { Divider } from "@mui/material";
import { useSummary } from "../../../../../../contexts/summaryContext";
import { Count, Label, Metric, Metrics } from "./summaryCounts.styles";

export const SummaryCounts = (): JSX.Element => {
  const summary = useSummary();
  return (
    <Metrics>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>{formatCountSize(summary.cellCount)}</Count>
        <Label>Cells</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>{formatCountSize(summary.donorCount)}</Count>
        <Label>Donors</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>{formatCountSize(summary.projectCount)}</Count>
        <Label>Projects</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>{formatCountSize(summary.labCount)}</Count>
        <Label>Labs</Label>
      </Metric>
    </Metrics>
  );
};
