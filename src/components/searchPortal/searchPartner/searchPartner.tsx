/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search partner component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React from "react";

// App dependencies
import Button from "../../button/button";
import { Partner } from "../common/entities";
import { onSelectSiteSearchPartner } from "../common/utils";

// Styles
import { active, partner as searchPartner } from "./searchPartner.module.css";

type UpdateSelectedPartnerFn = (selectedPartner: string) => void;

interface Props {
  partner: Partner;
  searchPath: string;
  searchTerms: string;
  selectedPartner: string;
  updateSelectedPartnerFn: UpdateSelectedPartnerFn;
}

export default function SearchPartner({
  partner,
  searchPath,
  searchTerms,
  selectedPartner,
  updateSelectedPartnerFn,
}: Props): JSX.Element {
  const { label, value } = partner;
  const classNamesPartner = classNames(
    { [active]: selectedPartner === value },
    searchPartner
  );

  /**
   * Updates search partner with selected partner.
   * @param searchStr - Current search term.
   * @param searchPathname - Search pathname.
   * @param searchPartner - Selected search partner.
   */
  const updateSiteSearchPartner = (
    searchStr: string,
    searchPathname: string,
    searchPartner: string
  ) => {
    updateSelectedPartnerFn(searchPartner);
    onSelectSiteSearchPartner(searchStr, searchPathname, searchPartner);
  };

  return (
    <li className={classNamesPartner}>
      <Button
        onClick={() => updateSiteSearchPartner(searchTerms, searchPath, value)}
      >
        {label}
      </Button>
    </li>
  );
}
