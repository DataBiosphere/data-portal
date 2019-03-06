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
		{value: 1, symbol: ''},
		{value: 1E3, symbol: 'k'},
		{value: 1E6, symbol: 'M'},
		{value: 1E9, symbol: 'G'},
		{value: 1E12, symbol: 'T'},
		{value: 1E15, symbol: 'P'},
		{value: 1E18, symbol: 'E'}
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	let i;
	for (i = si.length - 1; i > 0; i--) {
		if (num >= si[i].value) {
			break;
		}
	}
	return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
}
