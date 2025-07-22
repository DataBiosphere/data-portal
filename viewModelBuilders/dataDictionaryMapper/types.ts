import { Attribute as BaseAttribute } from "@databiosphere/findable-ui/lib/common/entities";
import { LinkProps } from "@mui/material";

export interface Attribute extends BaseAttribute {
  source: LinkProps;
}
