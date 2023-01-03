import { getContext } from './../config.js';

/**
 * DOM Cookie
 */

/**
 * Get a cookie value.
 * @param {string} name The cookie name.
 * @return {*} The cookie value.
 */
export function getCookie(name) {
    const cookie = getContext().cookie
        .split(';')
        .find((cookie) =>
            cookie
                .trimStart()
                .substring(0, name.length) === name,
        )
        .trimStart();

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(
        cookie.substring(name.length + 1),
    );
};

/**
 * Remove a cookie.
 * @param {string} name The cookie name.
 * @param {object} [options] The options to use for the cookie.
 * @param {string} [options.path] The cookie path.
 * @param {Boolean} [options.secure] Whether the cookie is secure.
 */
export function removeCookie(name, { path = null, secure = false } = {}) {
    if (!name) {
        return;
    }

    let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;

    if (path) {
        cookie += `;path=${path}`;
    }

    if (secure) {
        cookie += ';secure';
    }

    getContext().cookie = cookie;
};

/**
 * Set a cookie value.
 * @param {string} name The cookie name.
 * @param {*} value The cookie value.
 * @param {object} [options] The options to use for the cookie.
 * @param {number} [options.expires] The number of seconds until the cookie will expire.
 * @param {string} [options.path] The path to use for the cookie.
 * @param {Boolean} [options.secure] Whether the cookie is secure.
 */
export function setCookie(name, value, { expires = null, path = null, secure = false } = {}) {
    if (!name) {
        return;
    }

    let cookie = `${name}=${value}`;

    if (expires) {
        const date = new Date;
        date.setTime(
            date.getTime() +
            expires * 1000,
        );
        cookie += `;expires=${date.toUTCString()}`;
    }

    if (path) {
        cookie += `;path=${path}`;
    }

    if (secure) {
        cookie += ';secure';
    }

    getContext().cookie = cookie;
};
