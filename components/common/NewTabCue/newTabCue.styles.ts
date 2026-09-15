import type { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import { visuallyHidden } from "@mui/utils";

/**
 * Carries the new-tab cue into the accessible name without showing it. Spreads
 * MUI's `visuallyHidden` so the text stays in the accessibility tree rather
 * than being removed by `display: none`. Cast because `visuallyHidden` is typed
 * `CSSProperties`, which emotion will not take as an interpolation directly.
 */
export const StyledSpan = styled.span(visuallyHidden as CSSObject);
