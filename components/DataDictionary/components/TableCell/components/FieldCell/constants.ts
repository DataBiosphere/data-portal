import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";
import type { ChipProps, GridProps } from "@mui/material";
import {
  REQUIREMENT_LEVEL,
  type RequirementLevel,
} from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";

export const GRID_PROPS: GridProps = {
  container: true,
  direction: "row",
  spacing: 2,
  wrap: "wrap",
};

export const REQUIREMENT_LEVEL_COLOR: Record<
  RequirementLevel,
  ChipProps["color"]
> = {
  [REQUIREMENT_LEVEL.RECOMMENDED]: CHIP_PROPS.COLOR.DEFAULT,
  [REQUIREMENT_LEVEL.REQUIRED]: CHIP_PROPS.COLOR.ERROR,
  [REQUIREMENT_LEVEL.STRONGLY_RECOMMENDED]: CHIP_PROPS.COLOR.WARNING,
};
