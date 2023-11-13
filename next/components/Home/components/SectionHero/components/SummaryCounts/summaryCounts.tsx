import { Divider } from "@mui/material";
import { Count, Label, Metric, Metrics } from "./summaryCounts.styles";

export const SummaryCounts = (): JSX.Element => {
  return (
    <Metrics>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>50.1M</Count>
        <Label>Cells</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>7.7k</Count>
        <Label>Donors</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>405</Count>
        <Label>Projects</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>671</Count>
        <Label>Labs</Label>
      </Metric>
    </Metrics>
  );
};
