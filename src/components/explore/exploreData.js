/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal explore data component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ExploreControls from "./exploreControls";
import ExploreDiagram from "./exploreDiagram";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./exploreData.module.css";
import { introContent, zero } from "../../pages/index.module.css";

class ExploreData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { organ: "" };
  }

  onActiveOrgan = (event) => {
    this.setState({ organ: event });
  };

  render() {
    const { cellCountSummaries, totalCellCount } = this.props,
      { organ } = this.state;
    return (
      <div className={classNames(introContent, zero, compStyles.exploring)}>
        <ExploreControls
          onActiveOrgan={this.onActiveOrgan.bind(this)}
          cellCountSummaries={cellCountSummaries}
          totalCellCount={totalCellCount}
        />
        <ExploreDiagram activeOrgan={organ} />
      </div>
    );
  }
}

export default ExploreData;
