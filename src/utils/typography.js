/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core Typography.js file, as per https://www.gatsbyjs.org/tutorial/part-two/#typographyjs. Typography.js docs
 * can be found at https://kyleamathews.github.io/typography.js/.
 */

// Core dependencies
import Typography from 'typography';

const typography = new Typography({
    baseFontSize: '16px',
    bodyFontFamily: ['Montserrat', 'sans-serif'],
    googleFonts: [
        {
            name: 'Montserrat',
            styles: ['400', '500', '700'],
        }
    ],
    headerFontFamily: ['din-2014', 'sans-setif'],
    includeNormalize: false // normalize.css is included separately
});

export default typography;
