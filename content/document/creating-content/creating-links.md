---
path: "/document/creating-content/creating-links"
date: "2018-05-30"
title: "Creating Links"
---

# Creating Links in Markdown

Markdown syntax for a hyperlink is square brackets followed by parentheses. The square brackets hold the text, the  parentheses hold the link.

```
[Link text Here] (https://link-url-here.org)

```


## Internal Lniks

For internal links (links to other data portal pages) we need to follow a few rules:

1. Use the "relative path" to the page omitting the protocol and domain name. For example use `/document/creating-content/creating-links` instead of `https://dev.data.humancellatlas.org`.
1. For the link address use the `path` of the page in the site regardless of the location of the file in the repository.
1. Do not use the `.md` suffix. 
1. Don't forget to start the path with a forward slash: `/`.


Putting this all together an internal link looks like:

```
[An Internal Link](/document/creating-content/editing-an-existing-page)

```

This renders as: [An Internal Link](/document/creating-content/editing-an-existing-page)

>####Tip:
> Don't forget the leading slash "/" in the internal link paths.


### Links to a Page Heading

It is possible to link directly to any heading on an internal page as the page headings each have an anchor. 


You can find out the link to a page heading by clicking on link icon that appears when you hover over a heading. After you click on the link symbol, the url to that heading will be in your browsers address bar. Copy the link and stip off the method and domain to make a relative url. 

![Link Icon](./_images/internal-link.png)

Then use the path to create a link like so:

```
[An Internal Link to a Section Heading](/document/creating-content/editing-an-existing-page#editpreview-the-markdown)

```

This renders like:

[An Internal Link to a Section Heading](/document/creating-content/editing-an-existing-page#editpreview-the-markdown)

## External Links

The markdown for external links is the same for internal links except we use the full url.
 
```
[This is an external Lnik] (https://www.humancellatlas.org/)

```

This displays as:

[This is an external Lnik] (https://www.humancellatlas.org/)



 

