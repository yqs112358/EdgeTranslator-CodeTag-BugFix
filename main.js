// ==UserScript==
// @name         Fix <code> bug for Edge translator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace <code> tags with styled <span> to fix the bug of Edge's translator.
// @author       yqs112358
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

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

    // create and return a styled <span> element
    function createStyledSpan(textContent) {
        const span = document.createElement('span');
        span.className = 'replace-code-tag_to-fix-edge-translator';
        span.textContent = textContent;
        return span;
    }

    // replace a single <code> tag with a styled <span>
    function replaceCodeTag(node) {
        if (node.tagName === 'CODE') {
            const span = createStyledSpan(node.textContent);
            node.parentNode.replaceChild(span, node);
        }
    }

    // process a node and its child for <code> tags
    function processNodeAndChild(node) {
        if (node.nodeType === 1) {      // Element node
            replaceCodeTag(node);
            node.querySelectorAll('code').forEach(replaceCodeTag);
        }
    }

    ////////////////////////////////////////////////////////

    // replace <code> at startup
    document.querySelectorAll('code').forEach(replaceCodeTag);

    // observe DOM changes and replace generated <code> if needed
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(processNodeAndChild);
        });
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();