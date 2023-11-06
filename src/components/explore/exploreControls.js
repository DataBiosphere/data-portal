/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal explore controls component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../clickHandler/clickHandler";
import * as stringFormatter from "../../../src/utils/string-format.service";
import * as numberFormatter from "../../../src/utils/number-format.service";
import { Target } from "../../utils/anchor/target.model";

// Images
import arrow from "../../../images/icon/explore/arrow.png";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./exploreControls.module.css";

/* List of organ term names for display */
/* Excludes "development samples", "gut", "female reproductive", "male reproductive" */
let organTermList = [
  "blood",
  "kidney",
  "bone tissue",
  "liver",
  "brain",
  "lung",
  "pancreas",
  "heart",
  "immune system",
  "skin of body",
];

class ExploreControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeOrgan: "" };
    this.setOrganActive = this.setOrganActive.bind(this);
  }

  componentDidMount() {
    this.setOrganInteractions();
  }

  componentWillUnmount() {
    this.removeOrganInteractions();
  }

  clearOrganActive = () => {
    return () => {
      this.setState({ activeOrgan: "" });
      this.props.onActiveOrgan("");
    };
  };

  getCellCount = () => {
    const { totalCellCount } = this.props;
    const activeOrgan = this.state.activeOrgan;

    if (activeOrgan === "") {
      return totalCellCount; // No organ is active, show total cell count
    } else if (!this.isOrganSummarized(activeOrgan)) {
      return "00"; // For any organ not summarized by browser
    } else {
      // Organ is summarized and will return a cell count value
      return numberFormatter.formatCount(
        this.getOrganFilter(activeOrgan)[0].cellCount
      );
    }
  };

  getCellCountLabel = () => {
    const activeOrgan = this.state.activeOrgan;

    if (activeOrgan === "") {
      return "All"; // No organ is active
    } else {
      return this.getOrganDisplayLabel(activeOrgan); // Show display label for active organ
    }
  };

  getOrganDisplayLabel = (organ) => {
    const displayLabel = this.translateOrganNameToDisplayLabel(organ); // Converts any organ to corresponding display label (if specified)

    return stringFormatter.convertSentenceCaseToTitleCase(displayLabel);
  };

  getOrganEls = () => {
    return document.querySelectorAll("[id^=organ]");
  };

  getOrganFilter = (organ) => {
    const { cellCountSummaries } = this.props;

    if (!cellCountSummaries || cellCountSummaries.length === 0) {
      return []; // For when cell count summary is being fetched, or empty
    }

    return cellCountSummaries.filter(
      (cellCountSummary) => cellCountSummary.label === organ
    );
  };

  getOrganId = (organ) => {
    const idStem = stringFormatter
      .convertSentenceCaseToTitleCase(organ)
      .replace(/\s/g, "");

    return `organ${idStem}`;
  };

  getOrganIdStem = (organId) => {
    return organId.split("organ")[1]; // Reverts organ id to organ id stem
  };

  isOrganSummarized = (organ) => {
    return this.getOrganFilter(organ).length > 0; // Returns true when the specified organ is listed in the summary
  };

  removeOrganInteractions = () => {
    const organEls = this.getOrganEls();

    // Remove event listener for mouse over and mouse out and click event of organ elements
    organEls.forEach((organEl) => {
      organEl.removeEventListener("mouseenter", this.setOrganActive(organEl));
      organEl.removeEventListener("mouseleave", this.clearOrganActive());
    });
  };

  setOrganActive = (organEl) => {
    return () => {
      const organId = this.getOrganIdStem(organEl.getAttribute("id"));
      const organLabel = stringFormatter
        .convertCamelCasetoTitleCase(organId)
        .toLowerCase()
        .trim();

      this.setState({ activeOrgan: organLabel });
      this.props.onActiveOrgan(organId);
    };
  };

  setOrganInteractions = () => {
    const organEls = this.getOrganEls();

    // Add event listener for mouse over and mouse out and click event of organ elements
    organEls.forEach((organEl) => {
      organEl.addEventListener("mouseenter", this.setOrganActive(organEl));
      organEl.addEventListener("mouseleave", this.clearOrganActive());
    });
  };

  stringifyOrganFilter = (term) => {
    return JSON.stringify([{ facetName: "specimenOrgan", terms: [term] }]);
  };

  translateOrganNameToDisplayLabel = (organName) => {
    switch (organName) {
      case "bone tissue":
        return "bone";
      case "female reproductive":
        return "Reproductive (Female)";
      case "male reproductive":
        return "Reproductive (Male)";
      case "skin of body":
        return "skin";
      default:
        return organName;
    }
  };

  visitExploreLink = (organ) => {
    if (!this.isOrganSummarized(organ)) {
      return; // Corresponding organ is not summarised by cell count summary
    }

    const organFilter = this.getOrganFilter(organ)[0];
    const stringifyOrganFilter = this.stringifyOrganFilter(organFilter.label);

    const params = new URLSearchParams();
    params.set("filter", stringifyOrganFilter);
    window.open(
      `${process.env.GATSBY_EXPLORE_URL}projects?${params.toString()}`,
      Target.BLANK
    );
  };

  render() {
    const { cellCountSummaries } = this.props;
    return (
      <div className={compStyles.controls}>
        <div
          className={classNames({ [compStyles.loading]: !cellCountSummaries })}
        >
          <span className={compStyles.count}>{this.getCellCount()} Cells</span>
          <span className={compStyles.label}>
            {this.getCellCountLabel()} Cells
          </span>
        </div>
        <div className={compStyles.organs}>
          {organTermList
            ? organTermList.map((organ, i) => (
                <ClickHandler
                  className={classNames(compStyles.organ, {
                    [compStyles.unspecified]: !this.isOrganSummarized(organ),
                  })}
                  clickAction={() => this.visitExploreLink(organ)}
                  id={this.getOrganId(organ)}
                  key={i}
                  tag={"div"}
                >
                  <span>{this.getOrganDisplayLabel(organ)}</span>
                  <img src={arrow} alt="Select" />
                </ClickHandler>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default ExploreControls;
