# Fix \<code\> bug for Edge translator

[English](README.md) | 中文

- 油猴脚本，修复Microsoft Edge长期存在的内置翻译器的bug：在翻译时会把所有`<code>`标签都移动到段落的最后，导致文本段完全不可读
- 具体详见：[The translator always move the code tag content to the end - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/discussions/the-translator-always-move-the-code-tag-content-to-the-end/m-p/1906043)

![before](assets/large.png)

![after](assets/large-1706264991457-3.png)

- 原理：将所有页面中的`<code>`替换成同样式的`<span>`，再使用内置翻译即可正常工作

> Fuck you, Microsoft！这么恶性的BUG为什么几年了还不修？