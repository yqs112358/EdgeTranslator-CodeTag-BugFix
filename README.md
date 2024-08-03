# Fix \<code\> bug for Edge translator

English | [中文](README_zh.md)

## Introduction

- A simple TamperMonkey script
- To fix a long-standing bug in Microsoft Edge's built-in translator: it moves all `<code>` tags to the end of the paragraph when translating, resulting in a completely unreadable text paragraph.
- More detailed discussion: [The translator always move the code tag content to the end - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/discussions/the-translator-always-move-the-code-tag-content-to-the-end/m-p/1906043)

<img src="assets/large.png" alt="before" style="zoom: 67%;" />

<center>👇</center>

<img src="assets/large-1706264991457-3.png" alt="after" style="zoom:67%;" />

## Installation

- Greasy Fork: https://greasyfork.org/scripts/485715-fix-code-bug-for-edge-translator

## Tips

- Principle: replace `<code>` with the same-styled `<span>` on all pages
- Due to the principle of implementation, this script may lead to performance issue when there are a lot of changes in the DOM
- This solution is by no means perfect, may cause problems on some sites, and javascript code relying on xpath to modify elements will also be affected
- **Feel free to report problems and bugs in Issue**

> Why hasn't such a ridiculous bug been fixed in many years?
> Fuck you, Microsoft! 