/**
 * DOM Cookie
 */

Object.assign(DOM.prototype, {

    /**
     * Get a cookie value.
     * @param {string} name The cookie name.
     * @returns {*} The cookie value.
     */
    getCookie(name) {
        const cookie = this._context.cookie
            .split(';')
            .find(cookie =>
                cookie
                    .trimStart()
                    .substring(0, name.length) === name
            )
            .trimStart();

        if (!cookie) {
            return null;
        }

        return decodeURIComponent(
            cookie.substring(name.length + 1)
        );
    },

    /**
     * Remove a cookie.
     * @param {string} name The cookie name.
     * @param {object} [options] The options to use for the cookie.
     * @param {string} [options.path] The cookie path.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    removeCookie(name, options) {
        if (!name) {
            return;
        }

        let cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;

        if (options) {
            if (options.path) {
                cookie += `;path=${options.path}`;
            }

            if (options.secure) {
                cookie += ';secure';
            }
        }

        this._context.cookie = cookie;
    },

    /**
     * Set a cookie value.
     * @param {string} name The cookie name.
     * @param {*} value The cookie value.
     * @param {object} [options] The options to use for the cookie.
     * @param {number} [options.expires] The number of seconds until the cookie will expire.
     * @param {string} [options.path] The path to use for the cookie.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    setCookie(name, value, options) {
        if (!name) {
            return;
        }

        let cookie = `${name}=${value}`;

        if (options) {
            if (options.expires) {
                const date = new Date;
                date.setTime(
                    date.getTime()
                    + options.expires * 1000
                );
                cookie += `;expires=${date.toUTCString()}`;
            }

            if (options.path) {
                cookie += `;path=${options.path}`;
            }

            if (options.secure) {
                cookie += ';secure';
            }
        }

        this._context.cookie = cookie;
    }

});
