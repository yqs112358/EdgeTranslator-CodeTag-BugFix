// ==UserScript==
// @name         Fix <code> bug of Edge translator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace <code> tags with styled <span> to fix the bug of Edge's translator.
// @author       yqs112358
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Edge <code> bug fixer loaded.");

    // custom style to simulate <code>
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .replace-code-tag_to-fix-edge-translator {
            background-color: #f6f8fa;
            border-radius: 6px;
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            padding: 0.2em 0.4em;
            font-size: 85%;
            color: #24292e;
        }
        /* Dark mode */
        @media (prefers-color-scheme: dark) {
            .replace-code-tag_to-fix-edge-translator {
                background-color: #2d333b;
                color: #adbac7;
            }
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('code').forEach(function(code) {
        const span = document.createElement('span');
        span.className = 'replace-code-tag_to-fix-edge-translator';
        span.textContent = code.textContent;

        // replace
        code.parentNode.replaceChild(span, code);
    });
})();