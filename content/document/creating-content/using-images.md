---
path: "/document/creating-content/using-images"
date: "2018-05-30"
title: "Using Images"
---

# Using Images

To include an image in your page:

## Upload the Image to an "_images" Folder

Using the github web interface navigate to the parent folder of your page and add the image an `_images` folder. 

In the github editor you can not create an empty folder so if the folder does not exist it will be crated during the upload step.

## Reference the Image in the Markdown

To reference the image we use markdown like:

```
![Cell Image](../_images/jumbotron-cell-mobile.png "That Cell!")
```

Note the `../_images/` preceding the image name. This is required to tell the CMS where the image is.

This renders like:

![Cell Image](../_images/jumbotron-cell-mobile.png "That Cell!")

>####TIP
>You can check if the image link is correct by using the preview link in the markdown editor.

## Controlling Image Size

Currently images all expand to the same size in the page.






