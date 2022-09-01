/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search partner component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { navigate } from "gatsby";
import React from "react";

// App dependencies
import Button from "../../button/button";
import { buildSearchPortalUrl } from "../searchPortal";

// Styles
import {
  active as activePartner,
  partner as searchPartner,
} from "./searchPartner.module.css";

export interface Partner {
  active: boolean;
  label: string;
  value: string;
}

interface Props {
  partner: Partner;
  searchTerms: string;
}

export default function SearchPartner({
  partner,
  searchTerms,
}: Props): JSX.Element {
  const { active, label, value } = partner;

  return (
    <li className={classNames({ [activePartner]: active }, searchPartner)}>
      <Button onClick={() => onSelectSearchPartner(searchTerms, value)}>
        {label}
      </Button>
    </li>
  );
}

/**
 * Updates session history with new search params.
 * @param searchTerms
 * @param searchPartner
 */
function onSelectSearchPartner(
  searchTerms: string,
  searchPartner: string
): void {
  const href = buildSearchPortalUrl(searchTerms, searchPartner);
  navigate(href, { state: { searchPage: 1 } });
}
