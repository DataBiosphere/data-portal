import { Divider } from "@mui/material";
import { Count, Label, Metric, Metrics } from "./summaryCounts.styles";

export const SummaryCounts = (): JSX.Element => {
  return (
    <Metrics>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>41M</Count>
        <Label>Cells</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>6.1k</Count>
        <Label>Donors</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>324</Count>
        <Label>Projects</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count>524</Count>
        <Label>Labs</Label>
      </Metric>
    </Metrics>
  );
};
