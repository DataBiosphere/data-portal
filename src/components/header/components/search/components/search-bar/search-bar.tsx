import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ButtonPrimary } from "../../../../../common/button/button.styles";
import SearchIcon from "../../../../../common/custom-icon/components/search-icon/search-icon";
import { IconButtonInk } from "../../../../../common/icon-button/icon-button.styles";
import { onSubmitSiteSearch } from "../../../../../searchPortal/common/utils";
import {
  SearchForm,
  SearchInput,
  SearchBar as SearchDialog,
} from "./search-bar.styles";

type CloseMenuFn = () => void;
type CloseSearchFn = () => void;

interface Props {
  closeMenuFn: CloseMenuFn;
  closeSearchFn: CloseSearchFn;
  modalPosition: number;
  searchOpen: boolean;
  searchPath: string;
}

export default function SearchBar({
  closeMenuFn,
  closeSearchFn,
  searchOpen,
  modalPosition,
  searchPath,
}: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * Clears search term and refocuses input.
   */
  const handleClear = (): void => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  /**
   * Callback fired when the search term is changed.
   * Sets state searchTerm with new search term.
   * @param event - Change event on input element.
   */
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  /**
   * Callback fired after the "exited" transition is applied.
   * Clears search term when search modal closes.
   */
  const handleExited = (): void => {
    setSearchTerm("");
  };

  /**
   * Callback fired when form is submitted.
   * @param formEvent - Form event when form is submitted.
   * @param searchStr - Current search string.
   * @param searchPathname - Current configured search path.
   */
  const handleSubmit = (
    formEvent: FormEvent<HTMLFormElement>,
    searchStr: string,
    searchPathname: string
  ): void => {
    if (searchStr) {
      closeMenuFn();
      closeSearchFn();
    }
    onSubmitSiteSearch(formEvent, searchStr, searchPathname);
  };

  return (
    <SearchDialog
      fullWidth
      hideBackdrop
      maxWidth={false}
      onClose={closeSearchFn}
      open={searchOpen}
      PaperProps={{ sx: { mt: modalPosition / 4 }, variant: "searchbar" }}
      TransitionProps={{ onExited: handleExited }}
    >
      <SearchForm
        onSubmit={(e: FormEvent<HTMLFormElement>) =>
          handleSubmit(e, searchTerm, searchPath)
        }
      >
        <SearchIcon fontSize="small" />
        <SearchInput
          autoFocus
          disableUnderline
          endAdornment={
            <IconButtonInk
              disabled={!searchTerm}
              edge="end"
              onClick={handleClear}
              size="small"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButtonInk>
          }
          fullWidth
          inputRef={inputRef}
          onChange={handleChange}
          placeholder="Type in keywords..."
          value={searchTerm}
        />
        <ButtonPrimary type="submit">Search</ButtonPrimary>
      </SearchForm>
    </SearchDialog>
  );
}
