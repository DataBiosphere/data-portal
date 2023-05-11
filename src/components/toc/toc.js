/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal TOC component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextMetadataDisplaying from "../metadata/contextMetadataDisplaying/contextMetadataDisplaying";
import TOCItem from "../tocItem/tocItem";
import * as TOCService from "../../utils/toc.service";

// Styles
import * as compStyles from "./toc.module.css";

class TOC extends React.Component {
  componentDidMount() {
    /* Handle show/hide TOC. */
    this.onHandleUseTOC();
  }

  onHandleUseTOC = () => {
    const { useTOC } = this.props;

    this.props.onHandleUseTOC(useTOC);
  };

  render() {
    const { activeLocation, tocs } = this.props;
    return (
      <div className={compStyles.tocs}>
        <ul data-testid="page-outline">
          {tocs
            ? tocs.map((toc, t) => (
                <TOCItem key={t} activeLocation={activeLocation} toc={toc} />
              ))
            : null}
        </ul>
      </div>
    );
  }
}

export default (props) => {
  const { docPath } = props;
  const { showAllMetadata } = useContext(ContextMetadataDisplaying);
  const tocs = TOCService.getTOCs(docPath, showAllMetadata);
  const useTOC = tocs.length > 0;

  return <TOC tocs={tocs} useTOC={useTOC} {...props} />;
};
