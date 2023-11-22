import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

/**
 * Custom Facebook icon (socials).
 */

export const FacebookIcon = ({
  fontSize = "xsmall",
  viewBox = "0 0 18 18",
  ...props /* Spread props to allow for Mui SvgIconProps specific prop overrides e.g. "htmlColor". */
}: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon fontSize={fontSize} viewBox={viewBox} {...props}>
      <path
        d="M15.975 9.00039C15.975 5.14824 12.8522 2.02539 9.00002 2.02539C5.14787 2.02539 2.02502 5.14824 2.02502 9.00039C2.02502 12.2714 4.27711 15.0162 7.31514 15.77V11.132H5.8769V9.00039H7.31514V8.08192C7.31514 5.70791 8.38957 4.60754 10.7203 4.60754C11.1623 4.60754 11.9248 4.6943 12.2367 4.78079V6.71287C12.0721 6.69557 11.7861 6.68692 11.431 6.68692C10.2873 6.68692 9.84539 7.12021 9.84539 8.24653V9.00039H12.1237L11.7323 11.132H9.84539V15.9243C13.2986 15.5072 15.975 12.5666 15.975 9.00039Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
