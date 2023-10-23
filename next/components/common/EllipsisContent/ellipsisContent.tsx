import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useResizeObserver } from "../../../hooks/useResizeObserver";
import { Button, Content } from "./ellipsisContent.styles";

enum EllipsisMode {
  "NONE" = "NONE",
  "OFF" = "OFF",
  "ON" = "ON",
}

export interface OverviewDescriptionProps {
  children: ReactNode | ReactNode[];
  maxLineCount: number;
}

export const EllipsisContent = ({
  children,
  maxLineCount,
}: OverviewDescriptionProps): JSX.Element => {
  const ellipsisRef = useRef<HTMLDivElement>(null);
  const { height } = useResizeObserver(ellipsisRef) || {};
  const [ellipsisMode, setEllipsisMode] = useState<EllipsisMode | undefined>();
  const isEllipsis = ellipsisMode === EllipsisMode.ON;

  /**
   * Updates the state of ellipsis mode by toggling between "ON" and "OFF" values.
   */
  const onToggleMode = (): void => {
    setEllipsisMode((currentMode) => {
      if (currentMode === EllipsisMode.ON) {
        return EllipsisMode.OFF;
      }
      return EllipsisMode.ON;
    });
  };

  /**
   * Ellipsis mode state is initialized to "NONE" only when the component mounts,
   * so we guarantee that `ellipsisRef` gets the element handle for resize observer hook.
   */
  useEffect(() => {
    setEllipsisMode(EllipsisMode.NONE);
  }, []);

  /**
   * Ellipsis mode state updates with changes to the rendered content height.
   */
  useEffect(() => {
    setEllipsisMode((currentMode) => {
      return getEllipsisMode(ellipsisRef.current, maxLineCount, currentMode);
    });
  }, [height, maxLineCount]);

  return (
    <>
      <Content
        ref={ellipsisRef}
        isEllipsis={isEllipsis}
        maxLineCount={maxLineCount}
      >
        {children}
      </Content>
      {isModeActivated(ellipsisMode) && (
        <Button onClick={onToggleMode}>{getModeText(ellipsisMode)}</Button>
      )}
    </>
  );
};

/**
 * Returns the calculated line count of text rendered within the given element.
 * @param element - Element observed by resize observer (ellipsis container).
 * @returns line count of text rendered.
 */
function calculateRenderedLineCount(
  element: HTMLDivElement | null
): number | undefined {
  if (!element) {
    return;
  }
  // Grab the DOMRects for the text nodes within the element.
  const DOMRects = getTextNodeDOMRects(element).sort(sortDOMRects);
  if (DOMRects.length === 0) {
    return;
  }
  // Set the first bounding rect as the initial y1 and y2 values.
  let lineCount = 1;
  let y1 = DOMRects[0].top;
  let y2 = DOMRects[0].bottom;
  // Keeping a track of the upper and lower positional threshold of each line, we are going to test each bounding rect
  // to see if it falls within the threshold of the current line. If it does, we skip it. If it doesn't, we increment
  // the line count and update the threshold values.
  for (const rect of DOMRects) {
    const { bottom, top } = rect;
    if (top >= y1 && bottom <= y2) {
      continue;
    }
    y1 = top;
    y2 = bottom;
    lineCount++;
  }
  return lineCount;
}

/**
 * Returns one of the following ellipsis mode for the content:
 * - "ON" - paragraph is ellipsis view with the option to toggle view, or
 * - "OFF" - paragraph is in full view with the option to toggle view, or
 * - "NONE" - paragraph is in full view with no option to toggle view as it does not require ellipsis.
 * @param element - Element observed by resize observer (ellipsis container).
 * @param maxLineCount - Maximum lines to display.
 * @param currentMode - Current ellipsis mode.
 * @returns ellipsis mode.
 */
function getEllipsisMode(
  element: HTMLDivElement | null,
  maxLineCount: number,
  currentMode: EllipsisMode = EllipsisMode.NONE
): EllipsisMode {
  // Calculate line count.
  const lineCount = calculateRenderedLineCount(element);

  if (!lineCount) {
    return currentMode;
  }

  if (lineCount <= maxLineCount) {
    // Element does not have hidden content and line count is within allowable limit.
    // Mode is "NONE" - ellipsis mode not required.
    return EllipsisMode.NONE;
  }

  if (currentMode === EllipsisMode.NONE) {
    // Line count exceeds allowable limit, and ellipsis mode is "NONE".
    // Change mode to "ON" - ellipsis mode required.
    return EllipsisMode.ON;
  }

  return currentMode;
}

/**
 * Returns applicable button text for display corresponding with current mode.
 * When the current mode is "ON" the return value will be "Show More", otherwise the return value is "Show Less".
 * @param currentMode - current ellipsis mode.
 * @returns string for display as button text.
 */
function getModeText(currentMode?: EllipsisMode): string {
  if (currentMode === EllipsisMode.ON) {
    return "Read More";
  }
  return "Read Less";
}

/**
 * Returns a list of DOMRects for text nodes within the given node.
 * @param node - Node.
 * @param DOMRects - List of DOMRects.
 * @returns a list of text node DOMRects.
 */
function getTextNodeDOMRects(node: Node, DOMRects: DOMRect[] = []): DOMRect[] {
  if (node.hasChildNodes()) {
    for (const child of node.childNodes) {
      // Traverse the DOM tree to find text nodes.
      getTextNodeDOMRects(child, DOMRects);
    }
  } else {
    // Create a range object for the text node.
    const range = document.createRange();
    range.selectNodeContents(node);
    // Grab the DOMRectList for the range; this is a list of the bounding rectangles for the content.
    const DOMRectList = range.getClientRects();
    for (const rect of [...DOMRectList]) {
      if (rect.height && rect.width) {
        DOMRects.push(rect);
      }
    }
  }
  return DOMRects;
}

/**
 * Ellipsis mode is "activated" when content is long enough to be truncated.
 * i.e. the current mode will not equal "NONE".
 * @param currentMode - current ellipsis mode.
 * @returns true when mode is not "NONE".
 */
function isModeActivated(currentMode?: EllipsisMode): boolean {
  return !!currentMode && currentMode !== EllipsisMode.NONE;
}

/**
 * Sorts the given DOMRects by their y value.
 * @param DOMRect0 - First DOMRect to compare.
 * @param DOMRect1 - Second DOMRect to compare.
 * @returns number indicating the relative order of the given DOMRects.
 */
function sortDOMRects(DOMRect0: DOMRect, DOMRect1: DOMRect): number {
  return DOMRect0.y - DOMRect1.y;
}
