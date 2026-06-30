import { IconButton } from "@databiosphere/findable-ui/lib/components/common/IconButton/iconButton";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { JSX } from "react";
import { SearchPagination } from "../../hooks/common/entities";
import { usePagination } from "./hooks/UsePagination/hook";
import { PaginationActions, PaginationView } from "./pagination.styles";

interface PaginationProps {
  pagination?: SearchPagination;
}

export const Pagination = ({
  pagination,
}: PaginationProps): JSX.Element | null => {
  const { onPaginate } = usePagination();
  if (!pagination) return null;
  return (
    <PaginationView>
      <PaginationActions>
        <IconButton
          color="secondary"
          disabled={pagination.previousPage === 0}
          Icon={WestRoundedIcon}
          onClick={(): void => onPaginate(pagination.previousPage)}
          size="medium"
        />
        <IconButton
          color="secondary"
          disabled={pagination.nextPage === 0}
          Icon={EastRoundedIcon}
          onClick={(): void => onPaginate(pagination.nextPage)}
          size="medium"
        />
      </PaginationActions>
    </PaginationView>
  );
};
