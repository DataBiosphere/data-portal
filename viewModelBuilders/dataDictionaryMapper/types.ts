import { ChipProps, LinkProps } from "@mui/material";
import { Attribute as BaseAttribute } from "@databiosphere/findable-ui/lib/common/entities";

export interface Attribute extends Omit<BaseAttribute, "required"> {
  required: ChipProps;
  source: LinkProps;
}
