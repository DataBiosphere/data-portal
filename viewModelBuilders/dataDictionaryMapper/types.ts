import { ChipProps, LinkProps } from "@mui/material";
import {
  Attribute as BaseAttribute,
  DataDictionary as BaseDataDictionary,
  Class as BaseClass,
} from "@databiosphere/findable-ui/lib/common/entities";

export interface Attribute extends Omit<BaseAttribute, "required"> {
  required: ChipProps;
  source: LinkProps;
}

/**
 * TODO(cc): Remove when DataDictionary is updated to support generic RowData.
 */
export interface Class extends Omit<BaseClass, "attributes"> {
  attributes: Attribute[];
}

/**
 * TODO(cc): Remove when DataDictionary is updated to support generic RowData.
 */
export interface DataDictionary extends Omit<BaseDataDictionary, "classes"> {
  classes: Class[];
}
