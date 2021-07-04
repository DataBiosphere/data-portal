/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Utility class for formatting number values.
 */

/**
 * Execute request for counts and summaries. Based off https://stackoverflow.com/a/9462382.
 */
export function format(num, digits) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

/**
 * Format data counts to sized value (eg k, M, G etc).
 * Returns "00" if count is 0.
 *
 * @param {number} count
 * @returns {*}
 */
export function formatCount(count) {
  return count ? format(count, 1) : "00";
}
