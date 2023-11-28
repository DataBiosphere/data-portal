import { Divider } from "@mui/material";
import { Count, Label, Metric, Metrics } from "./summaryCounts.styles";

export const SummaryCounts = (): JSX.Element => {
  return (
    <Metrics>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>52.5M</Count>
        <Label>Cells</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>7.9k</Count>
        <Label>Donors</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>413</Count>
        <Label>Projects</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>685</Count>
        <Label>Labs</Label>
      </Metric>
    </Metrics>
  );
};
