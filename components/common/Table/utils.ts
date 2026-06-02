import { ROW_DIRECTION } from "@databiosphere/findable-ui/lib/components/Table/common/entities";
import { Breakpoint } from "@mui/material";

/**
 * Returns the row direction based on the breakpoint.
 * @param bp - The breakpoint.
 * @returns The row direction.
 */
export function getRowDirection(bp?: Breakpoint): ROW_DIRECTION {
  if (bp === "xs") return ROW_DIRECTION.VERTICAL;
  return ROW_DIRECTION.DEFAULT;
}
