/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Utility class for formatting string values.
 */

/**
 * Convert camel case to title case. Based off https://stackoverflow.com/a/7225450.
 */
export function convertCamelCasetoTitleCase(title) {
  const sentenceCase = title.replace(/([A-Z])/g, ' $1')
  return convertSentenceCaseToTitleCase(sentenceCase)
}

/**
 * Convert sentence case to title case. Based off https://stackoverflow.com/a/196991.
 */
export function convertSentenceCaseToTitleCase(title) {
  return title.replace(/\w\S*/g, text => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  })
}
