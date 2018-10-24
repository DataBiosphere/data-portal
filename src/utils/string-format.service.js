/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Utility class for formatting string values.
 */

/**
 * Execute request for counts and summaries. Based off https://stackoverflow.com/a/196991.
 */
export function toTitleCase(title) {

    return title.replace(
        /\w\S*/g,
        (text) => {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        }
    );
}
