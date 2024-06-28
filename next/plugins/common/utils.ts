import slugify from "slugify";

/**
 * Slugify the heading text to generate an ID.
 * @param headingText - Heading text.
 * @returns heading ID.
 */
export function slugifyHeading(headingText: string): string {
  return slugify(headingText, {
    lower: true,
    strict: true,
  });
}
