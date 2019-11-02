/**
 * DOM Cookie
 */

Object.assign(DOM.prototype, {

    /**
     * Get a cookie value.
     * @param {string} name The cookie name.
     * @param {Boolean} [json=false] Whether the cookie value is in JSON.
     * @returns {*} The cookie value.
     */
    getCookie(name, json = false) {
        const cookie = decodeURIComponent(this._context.cookie)
            .split(';')
            .find(cookie =>
                cookie
                    .trimStart()
                    .substring(0, name.length) === name
            );

        if (!cookie) {
            return null;
        }

        const value = cookie.trimStart().
            substring(name.length + 1);

        return json ?
            JSON.parse(value) :
            value;
    },

    /**
     * Remove a cookie.
     * @param {string} name The cookie name.
     * @param {object} [options] The options to use for the cookie.
     * @param {number} [options.expires=-1] The number of seconds until the cookie will expire.
     * @param {string} [options.path] The cookie path.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     */
    removeCookie(name, options) {
        this.setCookie(
            name,
            '',
            {
                expires: -1,
                ...options
            }
        );
    },

    /**
     * Set a cookie value.
     * @param {string} name The cookie name.
     * @param {*} value The cookie value.
     * @param {object} [options] The options to use for the cookie.
     * @param {number} [options.expires] The number of seconds until the cookie will expire.
     * @param {string} [options.path] The path to use for the cookie.
     * @param {Boolean} [options.secure] Whether the cookie is secure.
     * @param {Boolean} [json=false] Whether to JSON encode the cookie value.
     */
    setCookie(name, value, options, json = false) {
        if (!name) {
            return;
        }

        if (json) {
            value = JSON.stringify(value);
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
