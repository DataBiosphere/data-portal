/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal icon button component.
 */

// Core dependencies
import React, { ReactNode } from "react";

// App dependencies
import Button, { Props as ButtonProps } from "../button/button";
import ButtonVariant from "../button/buttonVariant";

interface Props extends ButtonProps {
  children: ReactNode;
}

export default function IconButton({ children, ...props }: Props): JSX.Element {
  return (
    <Button variant={ButtonVariant.ICON_BUTTON} {...props}>
      {children}
    </Button>
  );
}
