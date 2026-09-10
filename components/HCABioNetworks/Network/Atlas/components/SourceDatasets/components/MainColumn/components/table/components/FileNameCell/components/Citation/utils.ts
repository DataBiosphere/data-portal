/**
 * Splits text into its leading portion and its final word, so the final word
 * can be held on one line with the external-link icon that follows it. A
 * browser may break before an atomic inline box, which would otherwise leave
 * the icon alone on the last line of a wrapped citation.
 * @param text - Text to split.
 * @returns leading text (including its trailing space) and the final word.
 */
export function splitTrailingWord(text: string): {
  head: string;
  tail: string;
} {
  // Slice the trimmed value, not the original: computing the index from
  // `trimEnd()` and then slicing `text` leaves any trailing whitespace on the
  // tail, which renders as a gap between the final word and the icon after it.
  const trimmed = text.trimEnd();
  const index = trimmed.lastIndexOf(" ");
  if (index === -1) return { head: "", tail: trimmed };
  return { head: trimmed.slice(0, index + 1), tail: trimmed.slice(index + 1) };
}
