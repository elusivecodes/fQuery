import { parseNode, parseNodes } from './../filters.js';
import { parseData } from './../helpers.js';
import { data } from './../vars.js';

/**
 * DOM Data
 */

/**
 * Clone custom data from each node to each other node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} otherSelector The other node(s), or a query selector string.
 */
export function cloneData(selector, otherSelector) {
    const nodes = parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    });

    const others = parseNodes(otherSelector, {
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    });

    for (const node of nodes) {
        if (!data.has(node)) {
            continue;
        }

        const nodeData = data.get(node);
        setData(others, { ...nodeData });
    }
};

/**
 * Get custom data for the first node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [key] The data key.
 * @return {*} The data value.
 */
export function getData(selector, key) {
    const node = parseNode(selector, {
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    });

    if (!node || !data.has(node)) {
        return;
    }

    const nodeData = data.get(node);

    return key ?
        nodeData[key] :
        nodeData;
};

/**
 * Remove custom data from each node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string} [key] The data key.
 */
export function removeData(selector, key) {
    const nodes = parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    });

    for (const node of nodes) {
        if (!data.has(node)) {
            continue;
        }

        const nodeData = data.get(node);

        if (key) {
            delete nodeData[key];
        }

        if (!key || !Object.keys(nodeData).length) {
            data.delete(node);
        }
    }
};

/**
 * Set custom data for each node.
 * @param {string|array|HTMLElement|DocumentFragment|ShadowRoot|Document|Window|NodeList|HTMLCollection|QuerySet} selector The input node(s), or a query selector string.
 * @param {string|object} key The data key, or an object containing data.
 * @param {*} [value] The data value.
 */
export function setData(selector, key, value) {
    const nodes = parseNodes(selector, {
        fragment: true,
        shadow: true,
        document: true,
        window: true,
    });

    const newData = parseData(key, value);

    for (const node of nodes) {
        if (!data.has(node)) {
            data.set(node, {});
        }

        const nodeData = data.get(node);

        Object.assign(nodeData, newData);
    }
};
