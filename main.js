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

    // Copy styles from one element to another
    function copyStyles(source, target) {
        const computedStyle = window.getComputedStyle(source);
        for (let key of computedStyle) {
            target.style[key] = computedStyle[key];
        }
    }

    // Replace a single <code> tag with a styled <span>
    function replaceCodeToSpan(node) {
        if (node.tagName === 'CODE') {
            const span = document.createElement('span');
            span.textContent = node.textContent;
            // Copy all computed styles from <code> to <span>
            copyStyles(node, span);
            node.parentNode.replaceChild(span, node);
        }
    }

    // Process a node and its child for <code> tags
    function processNodeAndChild(node) {
        if (node.nodeType === 1) {      // Element node
            replaceCodeToSpan(node);
            node.querySelectorAll('code').forEach(replaceCodeToSpan);
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