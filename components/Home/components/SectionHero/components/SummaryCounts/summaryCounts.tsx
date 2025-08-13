import { formatCountSize } from "@databiosphere/findable-ui/lib/utils/formatCountSize";
import { Divider } from "@mui/material";
import { useSummary } from "../../../../../../contexts/summaryContext";
import { Count, Label, Metric, Metrics } from "./summaryCounts.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export const SummaryCounts = (): JSX.Element => {
  const summary = useSummary();
  return (
    <Metrics>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}>
          {formatCountSize(summary.cellCount)}
        </Count>
        <Label variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}>Cells</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}>
          {formatCountSize(summary.donorCount)}
        </Count>
        <Label variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}>Donors</Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}>
          {formatCountSize(summary.projectCount)}
        </Count>
        <Label variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}>
          Projects
        </Label>
      </Metric>
      <Metric>
        <Divider flexItem orientation="vertical" variant="middle" />
        <Count variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}>
          {formatCountSize(summary.labCount)}
        </Count>
        <Label variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_400}>Labs</Label>
      </Metric>
    </Metrics>
  );
};
