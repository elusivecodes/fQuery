import { merge } from '@fr0st/core';
import { getContext } from './../config.js';
import { allowedTags as _allowedTags } from './../vars.js';

/**
 * DOM Utility
 */

/**
 * Sanitize a HTML string.
 * @param {string} html The input HTML string.
 * @param {object} [allowedTags] An object containing allowed tags and attributes.
 * @return {string} The sanitized HTML string.
 */
export function sanitize(html, allowedTags = _allowedTags) {
    const template = getContext().createElement('template');
    template.innerHTML = html;
    const fragment = template.content;
    const childNodes = merge([], fragment.children);

    for (const child of childNodes) {
        sanitizeNode(child, allowedTags);
    }

    return template.innerHTML;
};

/**
 * Sanitize a single node.
 * @param {HTMLElement} node The input node.
 * @param {object} [allowedTags] An object containing allowed tags and attributes.
 */
function sanitizeNode(node, allowedTags = _allowedTags) {
    // check node
    const name = node.tagName.toLowerCase();

    if (!(name in allowedTags)) {
        node.remove();
        return;
    }

    // check node attributes
    const allowedAttributes = [];

    if ('*' in allowedTags) {
        allowedAttributes.push(...allowedTags['*']);
    }

    allowedAttributes.push(...allowedTags[name]);

    const attributes = merge([], node.attributes);

    for (const attribute of attributes) {
        if (!allowedAttributes.find((test) => attribute.nodeName.match(test))) {
            node.removeAttribute(attribute.nodeName);
        }
    }

    // check children
    const childNodes = merge([], node.children);
    for (const child of childNodes) {
        sanitizeNode(child, allowedTags);
    }
};
