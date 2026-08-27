import type { IntegratedAtlas } from "../../../../../../../../@types/network";

/**
 * Returns true when the "Explore" column should be displayed. Non-tracker
 * atlases always display the column; tracker atlases display it only when at
 * least one integrated object has an analysis portal (CAP) to link to.
 * @param integratedAtlases - Integrated atlases.
 * @param isTracker - True when the atlas is tracker-sourced.
 * @returns true when the "Explore" column should be displayed.
 */
export function shouldShowExplore(
  integratedAtlases: IntegratedAtlas[],
  isTracker: boolean
): boolean {
  if (!isTracker) return true;
  return integratedAtlases.some(
    ({ analysisPortals }) => analysisPortals.length > 0
  );
}
