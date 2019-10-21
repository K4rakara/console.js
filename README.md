# Console.js

Console.js is a Bookmarklet that allows for use of a similar to the Inspect Element JavaScript console. This is mostly useful for users of managed devices (such as Chromebooks) that have restrictions placed on Inspect Element by an administrator.

### How do I use console.js?

Click and drag [this]() link into your Bookmarks bar. Then simply click on the link on the page you wish to debug.

### Other usecases
Console.js could also be used to always have a log visible on the page. The program is licensed under the MIT license, so you can freely modify it to fit your site.
Here's an example of how to implement Console.js:
```html
<body onload = "let cjs=document.createElement('SCRIPT');cjs.src='[Relative path to your copy of Console.js]';document.head.appendChild(cjs)">
...
</body>
```

### Notes

Console.js will **not** function properly on some websites. GitHub itself is an example. 

This is because some websites choose to block JavaScript execution from unknown sources. Usually this would just cause the script to not load at all, as most Bookmarklets load in their source code from an external source. This is not the case for Console.js, its entire source code is found (albeit very compressed) within the URL of the bookmark. However, I assume GitHub has **all** JavaScript execution disabled, as running Console.js *works* but with major bugs.

### Screenshots

![Screenshot](https://i.imgur.com/6BAzfbk.png)
