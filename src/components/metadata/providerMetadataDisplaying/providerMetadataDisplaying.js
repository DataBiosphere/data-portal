/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata displaying component.
 */

// Core dependencies
import { navigate } from "gatsby";
import React, { useCallback, useEffect, useRef, useState } from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import * as DPGTMService from "../../../utils/dp-gtm/dp-gtm.service";
import { GAEntityType } from "../../../utils/dp-gtm/ga-entity-type.model";

function ProviderMetadataDisplaying(props) {
  const { children } = props;
  const highlightTimerRef = useRef(0);
  const [highlightValue, setHighlightValue] = useState("");
  const [showAllMetadata, setShowAllMetadata] = useState(true);

  const getLocalStorageValues = useCallback(() => {
    /* Grab the local storage values. */
    /* Note, returned value from local storage is a string. */
    const storeHLValue = localStorage.getItem("highlightValue");
    const storeShowMetadata = localStorage.getItem("showMetadata") === "true";

    setHighlightValue(storeHLValue);
    setShowAllMetadata(storeShowMetadata);
  }, []);

  const onUpdateHighlight = useCallback(() => {
    /* Clear any previously set timeout. */
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
    }

    /* Set and maintain highlight for a period, and then clear the highlightValue. */
    highlightTimerRef.current = setTimeout(() => {
      setHighlightValue("");
    }, 10000);
    return () => clearTimeout(highlightTimerRef.current);
  }, []);

  const onHandleNavigationHit = result => {
    const { primaryRequired, required, type, urlTo } = result || {};
    const toggleMetadata =
      !showAllMetadata &&
      /property/.test(type) &&
      !(required && primaryRequired);

    /* Toggle required fields "Show required fields only". */
    /* If the result is a property, and the property is not required. */
    /* Then set showAllMetadata to true to ensure the result is viewable. */
    if (toggleMetadata) {
      setShowAllMetadata(true);
    }

    /* Handle the display of highlight on navigation to hit. */
    setHighlightValue(urlTo);

    /* Navigate. */
    navigate(urlTo);
  };

  const onHandleNavigationSearchHit = (result, inputValue) => {
    const { urlTo } = result || {};

    /* Execute tracking. */
    DPGTMService.trackMetadataSearchResultClick(
      urlTo,
      inputValue,
      GAEntityType.METADATA
    );

    /* Handle navigation of search hit. */
    onHandleNavigationHit(result);
  };

  const onHandleToggleRequiredFields = () => {
    setShowAllMetadata(showAllMetadata => !showAllMetadata);
  };

  const setLocalStorageValues = useCallback(() => {
    /* Set the local storage values. */
    localStorage.setItem("highlightValue", highlightValue);
    localStorage.setItem("showMetadata", showAllMetadata);
  }, [highlightValue, showAllMetadata]);

  /* useEffect - componentDidMount. */
  useEffect(() => {
    /* Get the local storage values. */
    getLocalStorageValues();
  }, [getLocalStorageValues]);

  /* useEffect - componentWillUnmount. */
  useEffect(() => {
    return () => {
      /* Clear timeout. */
      clearTimeout(highlightTimerRef.current);
    };
  }, []);

  /* useEffect - componentDidUpdate. */
  useEffect(() => {
    /* Set local storage values. */
    setLocalStorageValues();
  }, [setLocalStorageValues]);

  /* useEffect - componentDidUpdate. */
  useEffect(() => {
    /* Update highlight. */
    onUpdateHighlight();
  }, [onUpdateHighlight]);

  return (
    <ContextMetadataDisplaying.Provider
      value={{
        highlightValue,
        showAllMetadata,
        onHandleNavigationHit,
        onHandleNavigationSearchHit,
        onHandleToggleRequiredFields
      }}
    >
      {children}
    </ContextMetadataDisplaying.Provider>
  );
}

export default ProviderMetadataDisplaying;
