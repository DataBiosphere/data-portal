import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

/**
 * Custom X icon (socials).
 */

export const XIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M10.1723 8.0327L14.7597 2.7002H13.6727L9.68942 7.33033L6.50801 2.7002H2.83862L7.64954 9.70178L2.83862 15.2937H3.92576L8.13217 10.4041L11.492 15.2937H15.1614L10.1721 8.0327H10.1723ZM8.68335 9.76347L8.1959 9.06627L4.31746 3.51857H5.98724L9.11718 7.99574L9.60463 8.69294L13.6732 14.5126H12.0034L8.68335 9.76373V9.76347Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
