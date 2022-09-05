/* eslint-disable react/jsx-props-no-spreading -- allow prop spreading for optionally defined props. */
import { Box, Drawer } from "@mui/material";
import React, { Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  desktop: boolean;
  drawerOpen: boolean;
  modalPosition: number;
  onDrawerClose: () => void;
}

export default function Content({
  children,
  desktop,
  drawerOpen,
  modalPosition,
  onDrawerClose,
}: Props): JSX.Element {
  const HeaderContent = desktop ? Fragment : Drawer;
  const HeaderContentContainer = desktop ? Fragment : Box;
  const contentProps = desktop
    ? {}
    : {
        ModalProps: { sx: { top: `${modalPosition}px` } },
        PaperProps: {
          elevation: 0,
          sx: { marginTop: modalPosition / 4, width: "100%" },
        },
        hideBackdrop: true,
        onClose: onDrawerClose,
        open: drawerOpen,
      };
  const contentContainerProps = desktop
    ? {}
    : { sx: { display: "grid", gap: 2, py: 4 } };
  return (
    <HeaderContent {...contentProps}>
      <HeaderContentContainer {...contentContainerProps}>
        {children}
      </HeaderContentContainer>
    </HeaderContent>
  );
}
/* eslint-enable react/jsx-props-no-spreading -- allow prop spreading. */
