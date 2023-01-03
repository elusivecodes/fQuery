
import { merge } from '@fr0st/core';
import { createRange } from './../manipulation/create.js';

/**
 * DOM Parser
 */

const parser = new DOMParser();

/**
 * Create a Document object from a string.
 * @param {string} input The input string.
 * @param {object} [options] The options for parsing the string.
 * @param {string} [options.contentType=text/html] The content type.
 * @return {Document} A new Document object.
 */
export function parseDocument(input, { contentType = 'text/html' } = {}) {
    return parser.parseFromString(input, contentType);
};

/**
 * Create an Array containing nodes parsed from a HTML string.
 * @param {string} html The HTML input string.
 * @return {array} An array of nodes.
 */
export function parseHTML(html) {
    const childNodes = createRange()
        .createContextualFragment(html)
        .children;

    return merge([], childNodes);
};
