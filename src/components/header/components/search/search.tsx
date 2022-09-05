import { Button, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "../../../common/custom-icon/components/search-icon/search-icon";
import {
  BREAKPOINT,
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";

type OpenSearchFn = () => void;

interface Props {
  openSearchFn: OpenSearchFn;
}

export default function Search({ openSearchFn }: Props): JSX.Element {
  const desktop = useBreakpointHelper(
    BREAKPOINT_FN_NAME.UP,
    BREAKPOINT.DESKTOP
  );
  return (
    <>
      {desktop ? (
        <Button onClick={openSearchFn} startIcon={<SearchIcon />} variant="nav">
          Search
        </Button>
      ) : (
        <IconButton color="ink" onClick={openSearchFn}>
          <SearchIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
}
