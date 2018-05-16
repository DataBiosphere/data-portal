---
path: "/blog/example-page"
date: "2018-05-03"
title: "Example Blog Post"
---

Lets see now. We want to be able to:

1. Use basic markdown.
1. Import images from the same directory.
1. Do equations
1. Have different templates for different page styles.  NEED EXAMPLE
1. Github style autolink headers is nice.
1. Follow local links (need example!)
1. Download files
1. Tables
1. Ability to support a "draft mode"


## Now Is the Time for a New Bundle Structure

![New Bundle Structure](newBundle.png)

Hey, Hey, Hey, Hey! It was the DNA, that made me this way!

[ICA Bundle Correction.pdf](ICABundleCorrection.pdf)



## Code

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```


## Math

$a^2 + b^2 = c^2$

The sum of the squares of the sides of a right triangle is equal to the square of the hypotenuse.

```
$$
a^2 + b^2 = c^2
$$
```


$$
a^2 + b^2 = c^2
$$

## Tables

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
