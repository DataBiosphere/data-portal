import slugify from "slugify";

/**
 * Returns node ID, ensuring uniqueness.
 * @param setOfIds - Set of IDs.
 * @param slug - Slug.
 * @returns node ID.
 */
export function generateUniqueId(setOfIds: Set<string>, slug: string): string {
  let id = slug;
  let i = 1;
  while (setOfIds.has(id)) {
    id = `${slug}-${i}`;
    i++;
  }
  setOfIds.add(id);
  return id;
}

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
