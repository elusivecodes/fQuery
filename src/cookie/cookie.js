import { getContext } from './../config.js';

/**
 * Gets a cookie value.
 * @param {string} name The cookie name.
 * @returns {string|null} The cookie value, or `null` if it does not exist.
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
 * Removes a cookie.
 * @param {string} name The cookie name.
 * @param {{path?: string, secure?: boolean}} [options] The cookie options.
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
 * Sets a cookie value.
 * @param {string} name The cookie name.
 * @param {*} value The cookie value.
 * @param {{expires?: number, path?: string, secure?: boolean}} [options] The cookie options.
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
