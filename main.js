// ==UserScript==
// @name         Fix <code> bug for Edge translator
// @name:zh-CN   Fix <code> bug for Edge translator
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Fix Edge built-in translator <code> tag misalignment bug
// @description:zh-CN  修复Edge内置翻译器<code>标签错位bug
// @author       yqs112358
// @license      MIT
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/yqs112358/EdgeTranslator-CodeTag-BugFix/master/main.js
// @downloadURL  https://raw.githubusercontent.com/yqs112358/EdgeTranslator-CodeTag-BugFix/master/main.js
// ==/UserScript==

(function() {
    'use strict';

    // Replace a single <code> tag with a same-styled <span>
    function replaceCodeToSpan(codeNode) {
        // only process <code> without any child element
        console.log(new Date().toUTCString() + " - replacing <code>");
        if (codeNode.tagName === 'CODE' && codeNode.children.length === 0) {
            const spanNode = document.createElement('span');
            spanNode.setAttribute("translate", "no");
            codeNode.parentNode.insertBefore(spanNode, codeNode);
            spanNode.appendChild(codeNode);
        }
    }

    // Walkthrough a node and its child to replace <code> tags
    function processNodeAndChild(node) {
        if (node.nodeType === 1) {      // Element node
            node.querySelectorAll('code').forEach(replaceCodeToSpan);
            replaceCodeToSpan(node);
        }
    }

    ////////////////////////////////////////////////////////

    // Replace <code> at startup
    document.querySelectorAll('code').forEach(replaceCodeToSpan);

    // Observe DOM changes and replace new-generated <code> if needed
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