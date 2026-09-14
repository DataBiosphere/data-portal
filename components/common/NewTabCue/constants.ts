// The single home for the "opens in a new tab" wording. Two variants of one
// string, so a revision to the wording lands in both places at once.

// Bare text, for consumers that supply their own separator or place it in an
// attribute - e.g. an icon's `titleAccess`.
export const NEW_TAB_TEXT = "(opens in a new tab)";

// Appended to a link's accessible name when it opens in a new tab. Leading
// space so it reads as a continuation of the label it follows.
export const NEW_TAB_LABEL = ` ${NEW_TAB_TEXT}`;
