/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search input component.
 */

// Core dependencies
import classNames from "classnames"; // classname helper
import React, {
  FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// App dependencies
import { ToggleSearchBarFn } from "../searchBar/searchBar";
import SearchFormActions from "../searchFormActions/searchFormActions";
import SearchInputIcon from "../searchInputIcon/searchInputIcon";

// Styles
import { input, lungmap as darkTheme } from "./searchInput.module.css";

interface Props {
  lungmap: boolean;
  searchBarOpen: boolean;
  searchTerms: string;
  toggleSearchBar: ToggleSearchBarFn;
}

export default function SearchInput({
  lungmap,
  searchBarOpen,
  searchTerms,
  toggleSearchBar,
}: Props): JSX.Element {
  const refInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(searchTerms);
  const showClearButton = !!inputValue && searchBarOpen;

  /**
   * Clears input.
   */
  const onClearInput = (): void => {
    /* Clear button. */
    if (refInput.current) {
      setInputValue("");
      refInput.current.value = "";
      refInput.current.focus(); // required; maintains focus for firefox
    }
  };

  /**
   * On keydown event "escape", the input element will blur.
   */
  const onHandleKeyDown = useCallback(
    (keyEvent: KeyboardEvent): void => {
      if (searchBarOpen && keyEvent.key === "Escape") {
        if (refInput.current) {
          refInput.current.blur();
        }
      }
    },
    [searchBarOpen]
  );

  /**
   * On focus event (blur):
   * If the submit button was clicked:
   * - return (allows event to bubble to form).
   * If the clear button was clicked:
   * - the input value is cleared, and
   * - the input element will re-focus.
   * Otherwise, the blur event will proceed as expected and the search bar is closed.
   * @param focusEvent
   * @param toggleSearchBar
   */
  const onInputBlur = (
    focusEvent: FocusEvent<HTMLInputElement>,
    toggleSearchBar: ToggleSearchBarFn
  ): void => {
    const { currentTarget, relatedTarget } = focusEvent;
    const { parentNode: formEl } = currentTarget;
    const actionButtonsClicked = formEl?.contains(relatedTarget);

    /* Action button is clicked (clear or submit) - maintain focus. */
    if (actionButtonsClicked) {
      if (refInput.current) {
        refInput.current.focus();
      }
    } else {
      /* Close search bar. */
      toggleSearchBar(false);
    }
  };

  /**
   * Adds and removes event listener - "keydown".
   */
  useEffect((): (() => void) => {
    document.addEventListener("keydown", onHandleKeyDown);
    return () => {
      document.removeEventListener("keydown", onHandleKeyDown);
    };
  }, [onHandleKeyDown]);

  /**
   * Updates input blur/focus.
   * Executes with any changes to:
   * - search bar.
   */
  useEffect((): void => {
    if (!searchBarOpen) {
      /* Search bar is closed; blur input. */
      refInput.current?.blur();
    } else {
      /* Search bar is open; focus input. */
      refInput.current?.focus();
    }
  }, [searchBarOpen]);

  return (
    <>
      <SearchInputIcon lungmap={lungmap} />
      <input
        className={classNames(input, { [darkTheme]: lungmap })}
        defaultValue={searchTerms}
        onBlur={(focusEvent) => onInputBlur(focusEvent, toggleSearchBar)}
        onChange={(changeEvent) => setInputValue(changeEvent.target.value)}
        onFocus={() => toggleSearchBar(true)}
        name={"searchPortal"}
        placeholder={"Search all content"}
        ref={refInput}
        spellCheck="false"
        type="text"
      />
      <SearchFormActions
        lungmap={lungmap}
        onClearInput={onClearInput}
        showClearButton={showClearButton}
      />
    </>
  );
}
