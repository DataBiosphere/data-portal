/**
 * Formats count sizes.
 * @param value - Count size.
 * @returns formatted count size as display string.
 */
export function formatCountSize(value: number): string {
  const countSizes = ["k", "M", "G", "T", "P", "E"];

  // Determine count size display value and unit
  let val = value || 0;
  let sigFig = 0;
  while (val >= 1000) {
    val = val / 1000;
    sigFig += 1;
  }

  // No format of count size - tens, hundreds
  if (sigFig === 0) {
    return `${val}`;
  }

  // Format of count size to "n.0k"
  // Round value to precision
  const precision = 1;
  const roundedValue = val.toFixed(precision);
  return `${roundedValue}${countSizes[sigFig - 1]}`;
}
