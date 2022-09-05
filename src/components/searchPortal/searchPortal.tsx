/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal portal search component.
 */

// Core dependencies
import { useLocation } from "@reach/router";
import React, { useEffect, useState } from "react";

// App dependencies
import { partitionSearchParams } from "./common/utils";
import { PORTAL_URL } from "../../config/hca/config";
import { SITE, useConfig } from "../../hooks/useConfig";
import SearchPagination from "./searchPagination/searchPagination";
import SearchPartners from "./searchPartners/searchPartners";
import SearchProgressIndicator from "./searchProgressIndicator/searchProgressIndicator";
import { SearchResponse } from "./searchResult/searchResult";
import SearchResults from "./searchResults/searchResults";
import { getGCSERequestURL } from "../../utils/dp-gcse/dp-gcse.service";
import { isLungMAP } from "../../utils/environment/environment.service";

interface GCSEQuery {
  nextPage: any[];
  previousPage: any[];
  request: GCSERequest[];
}

export interface GCSERequest {
  searchTerms: string;
  startIndex: number;
}

interface GCSEResponse {
  items: SearchResponse[];
  queries: GCSEQuery; // "queries" from GCSE response is an object...
}

export interface SearchParameters {
  searchError: boolean;
  searchLoading: boolean;
  searchPage: number;
  searchPartner: string;
  searchTerms: string;
}

export default function SearchPortal(): JSX.Element | null {
  const [GCSEResponse, setGCSEResponse] = useState<GCSEResponse>();
  const [searchParams, setSearchParams] = useState<SearchParameters>(() => ({
    searchError: false,
    searchLoading: false,
    searchPage: 1,
    searchPartner: "",
    searchTerms: "",
  }));
  /* Grab the search config. */
  const portalUrl = PORTAL_URL;
  const site = isLungMAP() ? SITE.LUNGMAP : SITE.HCA;
  const currentConfig = useConfig(site);
  const searchConfig = currentConfig.search;
  const { partners, searchEngineId, searchPath } = searchConfig;
  /* Grab the current location and current search params. */
  const { search } = useLocation();
  const [newTerms, newPartner] = partitionSearchParams(search);
  const { queries: query, items: searchResponses } = GCSEResponse || {};
  const showNextPagination = Boolean(query?.nextPage?.length);
  const showPrevPagination = Boolean(query?.previousPage?.length);
  const showPagination = showNextPagination || showPrevPagination;
  const { searchError, searchLoading, searchPage, searchPartner, searchTerms } =
    searchParams;

  /**
   * Updates search page.
   * @param pageIncrement - Position or negative increment of the current page index.
   */
  const onSiteSearchPageRequest = (pageIncrement: number): void => {
    /* Update start with page request (page 1, 11, 21 etc). */
    setSearchParams((prevSiteSearch: SearchParameters) => {
      const nextIndex = prevSiteSearch.searchPage + pageIncrement * 10;
      return {
        ...prevSiteSearch,
        searchLoading: true,
        searchPage: nextIndex,
      };
    });
  };

  /**
   * Fetches GCSE results when searchLoading is true and search terms are defined.
   * Executes with any changes to:
   * - searchLoading,
   * - searchPage,
   * - searchPartner, or
   * - searchTerms.
   */
  useEffect(() => {
    if (searchLoading && searchTerms && portalUrl) {
      /* Grab the Google Custom SE request URL. */
      const GCSERequestURL = getGCSERequestURL(
        searchTerms,
        searchPartner,
        searchPage,
        portalUrl,
        searchEngineId
      );

      /* Fetch the SE results. */
      fetch(GCSERequestURL)
        .then((res) => res.json())
        .then((res) => {
          setGCSEResponse({ ...res });
          setSearchParams((prevSearchParams) => ({
            ...prevSearchParams,
            searchError: false,
            searchLoading: false,
          }));
        })
        .catch((err) => {
          setSearchParams((prevSearchParams) => ({
            ...prevSearchParams,
            searchError: false,
            searchLoading: false,
          }));
          console.log(err, "Error requesting Google Custom SE.");
        });
    }

    /* End search progress indicator if searchLoading and undefined searchTerms. */
    if ((searchLoading && !searchTerms) || !portalUrl) {
      const delayProgressIndicatorFinish = setTimeout(() => {
        setSearchParams((prevSearchParams) => ({
          ...prevSearchParams,
          searchError: true,
          searchLoading: false,
        }));
      }, 1000);

      return () => clearTimeout(delayProgressIndicatorFinish);
    }
  }, [
    portalUrl,
    searchEngineId,
    searchLoading,
    searchPage,
    searchPartner,
    searchTerms,
  ]);

  /**
   * Update state variables search terms or search partners.
   * Executes with any changes to terms or partner.
   */
  useEffect(() => {
    /* Set state searchParams with updated search terms and/or partner. */
    setSearchParams((prevSearchParams) => {
      return {
        ...prevSearchParams,
        searchLoading: true,
        searchPage: 1,
        searchPartner: newPartner,
        searchTerms: newTerms,
      };
    });
  }, [newTerms, newPartner]);

  if (searchLoading) {
    /* Return progress indicator. */
    return (
      <>
        <SearchPartners
          partners={partners}
          searchPath={searchPath}
          searchTerms={searchTerms}
          selectedPartner={searchPartner}
        />
        <SearchProgressIndicator />
      </>
    );
  }
  if (searchTerms) {
    if (searchResponses && searchResponses.length > 0) {
      /* Return search results. */
      return (
        <>
          <SearchPartners
            partners={partners}
            searchPath={searchPath}
            searchTerms={searchTerms}
            selectedPartner={searchPartner}
          />
          <SearchResults results={searchResponses} searchTerms={searchTerms} />
          {showPagination ? (
            <SearchPagination
              showNextPagination={showNextPagination}
              showPrevPagination={showPrevPagination}
              siteSearchPageRequestFn={onSiteSearchPageRequest}
            />
          ) : null}
        </>
      );
    }
    /* No search results for the search term. */
    return (
      <>
        <SearchPartners
          partners={partners}
          searchPath={searchPath}
          searchTerms={searchTerms}
          selectedPartner={searchPartner}
        />
        <p>No results.</p>
      </>
    );
  }
  if (searchError) {
    /* Search error - search term is not defined. */
    return (
      <>
        <SearchPartners
          partners={partners}
          searchPath={searchPath}
          searchTerms={searchTerms}
          selectedPartner={searchPartner}
        />
        <p>Please enter a query in the search box.</p>
      </>
    );
  }
  return null;
}
