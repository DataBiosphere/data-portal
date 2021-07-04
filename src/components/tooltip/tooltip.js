/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tooltip component.
 */

// Core dependencies
import React from "react";
import ReactDOM from "react-dom";

// App dependencies
import * as TooltipService from "../../utils/tooltip.service";

// Styles
import compStyles from "./tooltip.module.css";

let classNames = require("classnames");

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, mounted: false, tooltipPos: {} };
    this.portalRoot = null;
    this.tooltipRef = React.createRef();
  }

  hideTooltip = () => {
    return () => {
      this.setState({ show: false });
    };
  };

  componentDidMount() {
    this.portalRoot = document.getElementById("portal");

    this.isPortalMounted();
  }

  isPortalMounted = () => {
    if (this.portalRoot) {
      this.setState({ mounted: true });
    }
  };

  showTooltip = () => {
    return e => {
      const tooltipPos = TooltipService.positionTooltip(
        e.currentTarget,
        this.tooltipRef
      );

      this.setState({ tooltipPos: tooltipPos });
      this.setState({ show: true });
    };
  };

  render() {
    const { children, label, multiline } = this.props,
      { show, mounted, tooltipPos } = this.state,
      { x, y } = tooltipPos;
    const classNamesTooltip = classNames(
      { [compStyles.show]: show },
      compStyles.tooltip
    );

    const tooltip = (
      <div
        ref={this.tooltipRef}
        style={{ left: x, top: y }}
        className={classNamesTooltip}
      >
        {label}
      </div>
    );

    return (
      <>
        {mounted ? ReactDOM.createPortal(tooltip, this.portalRoot) : null}
        <span
          className={classNames({ [compStyles.multiline]: multiline })}
          id={"tooltip"}
          onBlur={this.hideTooltip()}
          onFocus={this.showTooltip()}
          onMouseOut={this.hideTooltip()}
          onMouseOver={this.showTooltip()}
          role="presentation"
        >
          {children}
        </span>
      </>
    );
  }
}

export default Tooltip;
