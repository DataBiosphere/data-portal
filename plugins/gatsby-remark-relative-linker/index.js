const visit = require('unist-util-visit');
module.exports = ({ markdownAST }) => {

    visit(markdownAST, 'link', node => {

        if (
            node.url &&
            !node.url.startsWith('//') &&
            !node.url.startsWith('http')
        ) {
            // strip off the .md of inernal markdown file links.
            // this lets us link to fiiles in the same directory with standard markdown links.
            node.url = node.url.replace(".md","");
        }
    });

    return markdownAST;
};

//thanks be to joel
//https://stackoverflow.com/questions/48553146/how-to-change-markdown-link-relative-path-as-preprocessing-of-gatsby-transformer?rq=1

