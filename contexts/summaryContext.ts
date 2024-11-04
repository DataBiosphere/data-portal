import { createContext, useContext } from "react";

const DEFAULT_SUMMARY: Summary = {
  cellCount: 0,
  donorCount: 0,
  labCount: 0,
  projectCount: 0,
};

export interface Summary {
  cellCount: number;
  donorCount: number;
  labCount: number;
  projectCount: number;
}

export const SummaryContext = createContext<Summary>({
  ...DEFAULT_SUMMARY,
});

export const SummaryProvider = SummaryContext.Provider;

export const useSummary = (): Summary => {
  return useContext(SummaryContext);
};
