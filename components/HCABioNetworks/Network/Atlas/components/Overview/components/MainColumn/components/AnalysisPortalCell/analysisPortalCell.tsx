import { IconLink } from "@/components/common/IconLink/iconLink";
import { AnalysisPortal } from "@/types/network";
import { Fragment, JSX } from "react";

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
