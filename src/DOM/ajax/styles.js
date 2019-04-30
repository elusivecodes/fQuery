/**
 * DOM AJAX Styles
 */

Object.assign(DOM.prototype, {

    /**
     * Import a CSS Stylesheet file.
     * @param {string} stylesheet The URL of the stylesheet.
     * @param {Boolean} [cache=true] Whether to cache the request.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyle(stylesheet, cache = true) {
        return this.ajax(stylesheet, { cache })
            .then(response =>
                DOM._append(
                    this._context.head,
                    this.create(
                        'style',
                        {
                            text: response.response
                        }
                    )
                )
            );
    },

    /**
     * Import multiple CSS Stylesheet files.
     * @param {string[]} stylesheets An array of stylesheet URLs.
     * @param {Boolean} [cache=true] Whether to cache the requests.
     * @returns {Promise} A new Promise that resolves when the request is completed, or rejects on failure.
     */
    loadStyles(stylesheets, cache = true) {
        return Promise.all
            (
                stylesheets.map(stylesheet =>
                    this.ajax(stylesheet, { cache })
                )
            )
            .then(responses =>
                DOM._append(
                    this._context.head,
                    this.create(
                        'style',
                        {
                            text: responses
                                .map(response => response.response)
                                .join("\r\n")
                        }
                    )
                )
            );
    }

});
