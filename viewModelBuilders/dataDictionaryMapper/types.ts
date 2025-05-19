import { Attribute as BaseAttribute } from "@databiosphere/findable-ui/lib/common/entities";
import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

export interface Attribute extends BaseAttribute {
  source: LinkProps;
}
