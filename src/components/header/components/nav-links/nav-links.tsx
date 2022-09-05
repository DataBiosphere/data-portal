import { navigate } from "gatsby";
import { Box, Button } from "@mui/material";
import React from "react";
import { NavLinkItem } from "../../common/entities";

interface Props {
  center?: boolean;
  links: NavLinkItem[];
}

export default function NavLinks({
  center = false,
  links,
}: Props): JSX.Element {
  return (
    <Box
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
      {links.map(({ label, url }) => (
        <Button
          key={url}
          onClick={() => navigate(url)}
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
