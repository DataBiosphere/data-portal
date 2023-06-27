import { Button } from "@clevercanary/data-explorer-ui/lib/components/common/Button/button";
import React from "react";

export const ButtonPrimary = ({
  ...props /* Spread props to allow for Button specific prop overrides. */
}): JSX.Element => {
  return <Button color="primary" variant="contained" {...props} />;
};
