import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";
import type { ChipProps, GridProps } from "@mui/material";
import {
  REQUIREMENT_LABEL,
  type RequirementLabel,
} from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";

export const GRID_PROPS: GridProps = {
  container: true,
  direction: "row",
  spacing: 2,
  wrap: "wrap",
};

export const REQUIREMENT_LABEL_COLOR: Record<
  RequirementLabel,
  ChipProps["color"]
> = {
  [REQUIREMENT_LABEL.RECOMMENDED]: CHIP_PROPS.COLOR.DEFAULT,
  [REQUIREMENT_LABEL.REQUIRED]: CHIP_PROPS.COLOR.ERROR,
  [REQUIREMENT_LABEL.STRONGLY_RECOMMENDED]: CHIP_PROPS.COLOR.WARNING,
};
