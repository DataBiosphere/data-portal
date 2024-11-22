import { css, SerializedStyles } from "@emotion/react";
import { TYPOGRAPHY_VARIANT } from "../../theme/typography/types";

/**
 * Returns typography style for the specified typography variant.
 * @param TYPOGRAPHY_VARIANT - Typography variant name.
 * @returns typography styles for the variant.
 */
function typographyToCSS(TYPOGRAPHY_VARIANT: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO revisit any.
  return (props: any): SerializedStyles => {
    return css`
      ${props.theme.typography[TYPOGRAPHY_VARIANT]}
    `;
  };
}

export const textHeadingXSmall = typographyToCSS(
  TYPOGRAPHY_VARIANT.TEXT_HEADING_XSMALL
);
