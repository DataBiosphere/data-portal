import { navigate } from "gatsby";
import { Box, Button } from "@mui/material";
import React from "react";
import { NavLinkItem } from "../../common/entities";

interface Props {
  center?: boolean;
  links: NavLinkItem[];
}

/**
 * Returns true if the given link is an internal link.
 * @param link - Link.
 * @returns true if the given link is an internal link.
 */
export function isClientSideNavigation(link: string): boolean {
  return /^\/(?!\/)/.test(link);
}

export default function NavLinks({
  center = false,
  links,
}: Props): JSX.Element {
  return (
    <Box
      data-testid="navigation"
      display="flex"
      flex={1}
      flexDirection={{ desktop: "row", mobile: "column" }}
      gap={2}
      justifyContent={{
        desktop: center ? "center" : "flex-start",
        mobile: undefined,
      }}
      marginLeft={{ desktop: center ? undefined : 6, mobile: undefined }}
    >
      {links.map(({ label, target = "_self", url }) => (
        <Button
          key={url}
          onClick={() =>
            isClientSideNavigation(url)
              ? navigate(url)
              : window.open(url, target)
          }
          sx={{
            justifyContent: { desktop: "unset", mobile: "flex-start" },
          }}
          variant="nav"
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}
