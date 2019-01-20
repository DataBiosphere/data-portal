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
    baseFontSize: '15px',
    baseLineHeight: '18px',
    bodyColor: '#000000',
    bodyFontFamily: ['Montserrat', 'sans-serif'],
    bodyWeight: '300',
    headerColor: '#000000',
    headerFontFamily: ['din-2014', 'sans-serif'],
    headerWeight: '500',
    googleFonts: [
        {
            name: 'Montserrat',
            styles: ['300', '400', '500', '600', '700'],
        }
    ],
    includeNormalize: true,
    overrideStyles: ({adjustFontSizeTo, scale}, options, styles) => {
        let primary = '#1c7cc7';
        let background = '#f4f7f9';
        let darkGray= '#666666';
        return {
            'body, html': {},
            '*, *:before, *:after': {
                mozBoxSizing: 'border-box',
                webkitBoxSizing: 'border-box',
                boxSizing: 'border-box',
            },
            p: {
                ...adjustFontSizeTo('15px'),
                lineHeight: '25px',
                margin: '0 0 18px',
            },
            'h1, h2, h3, h4, h5, h6': {
                textTransform: 'capitalize',
            },
            h1: {
                ...adjustFontSizeTo('34px'),
                lineHeight: '38px',
                margin: '28px 0 6px',
            },
            h2: {
                ...adjustFontSizeTo('24px'),
                lineHeight: '30px',
                margin: '24px 0 8px',
            },
            h3: {
                ...adjustFontSizeTo('18px'),
                lineHeight: '24px',
                margin: '16px 0 10px',
            },
            h4: {
                ...adjustFontSizeTo('16px'),
                lineHeight: '22px',
                margin: '14px 0 16px',
            },
            h5: {
                ...adjustFontSizeTo('16px'),
                lineHeight: '28px',
                margin: '0 0 18px',
            },
            h6: {
                ...adjustFontSizeTo('14px'),
                lineHeight: '24px',
                margin: '0 0 12px',
            },
            'a': {
                color: primary,
                cursor: 'pointer',
                font: 'inherit',
                textDecoration: 'none',
            },
            'a:hover': {
                color: 'none',
            },
            'a:focus,a:active,a:hover': {
                outline: 0,
            },
            blockquote: {
                backgroundColor: background,
                borderRadius: '3px',
                margin: '0 0 18px',
                padding: '16px',
            },
            'blockquote h1, blockquote h2, blockquote h3, blockquote h4, blockquote h5, blockquote h6': {
                margin: '0 0 8px',
            },
            'blockquote p': {
                color: darkGray,
            },
            'dd,dl,ol,ul': {
                margin: 0,
                padding: 0,
            },
            img: {
                border: 0,
                marginBottom: 0,
            },
            strong: {
                fontWeight: '400',
            },
        }
    }
});

export default typography;
