import { IconButton } from "@databiosphere/findable-ui/lib/components/common/IconButton/iconButton";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import React from "react";
import { OnSearchFn, SearchPagination } from "../../hooks/common/entities";
import { PaginationActions, PaginationView } from "./pagination.styles";

interface PaginationProps {
  onSearch: OnSearchFn;
  pagination?: SearchPagination;
}

export const Pagination = ({
  onSearch,
  pagination,
}: PaginationProps): JSX.Element | null => {
  if (!pagination) return null;
  return (
    <PaginationView>
      <PaginationActions>
        <IconButton
          color="secondary"
          disabled={pagination.previousPage === 0}
          Icon={WestRoundedIcon}
          onClick={(): void =>
            onSearch({ searchIndex: pagination.previousPage })
          }
          size="medium"
        />
        <IconButton
          color="secondary"
          disabled={pagination.nextPage === 0}
          Icon={EastRoundedIcon}
          onClick={(): void => onSearch({ searchIndex: pagination.nextPage })}
          size="medium"
        />
      </PaginationActions>
    </PaginationView>
  );
};
