import { Fragment } from "react";
import { AnalysisPortal } from "../../../../../../../../../../@types/network";
import { IconLink } from "../../../../../../../../../common/IconLink/iconLink";

interface AnalysisPortalCellProps {
  analysisPortals: AnalysisPortal[];
}

export const AnalysisPortalCell = ({
  analysisPortals,
}: AnalysisPortalCellProps): JSX.Element => {
  return (
    <Fragment>
      {analysisPortals.map((analysisPortal, i) => (
        <IconLink key={i} height={20} {...analysisPortal} />
      ))}
    </Fragment>
  );
};
